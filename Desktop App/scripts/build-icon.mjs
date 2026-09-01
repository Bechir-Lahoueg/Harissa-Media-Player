import fs from 'node:fs'
import path from 'node:path'
import zlib from 'node:zlib'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SOURCE = path.join(ROOT, 'public', 'icon.png')
const OUTPUT = path.join(ROOT, 'build', 'icon.ico')
const SIZES = [16, 24, 32, 48, 64, 128, 256]

/* ------------------------------------------------------------------ PNG in */

function decodePng(file) {
  const buf = fs.readFileSync(file)
  let offset = 8
  let width = 0
  let height = 0
  const idat = []

  while (offset < buf.length) {
    const length = buf.readUInt32BE(offset)
    const type = buf.toString('ascii', offset + 4, offset + 8)
    const data = buf.subarray(offset + 8, offset + 8 + length)

    if (type === 'IHDR') {
      width = data.readUInt32BE(0)
      height = data.readUInt32BE(4)
      if (data[8] !== 8 || data[9] !== 6) {
        throw new Error(`${file}: expected 8-bit RGBA, got bitDepth=${data[8]} colorType=${data[9]}`)
      }
    } else if (type === 'IDAT') {
      idat.push(data)
    } else if (type === 'IEND') {
      break
    }
    offset += 12 + length
  }

  const raw = zlib.inflateSync(Buffer.concat(idat))
  const bpp = 4
  const stride = width * bpp + 1
  const pixels = Buffer.alloc(width * height * bpp)

  // Undo the per-scanline filters (PNG spec 9.2). Exporters mix these freely,
  // so all five cases have to be handled to read the image correctly.
  const paeth = (a, b, c) => {
    const p = a + b - c
    const pa = Math.abs(p - a)
    const pb = Math.abs(p - b)
    const pc = Math.abs(p - c)
    if (pa <= pb && pa <= pc) return a
    return pb <= pc ? b : c
  }

  for (let y = 0; y < height; y++) {
    const filter = raw[y * stride]
    const rowIn = y * stride + 1
    const rowOut = y * width * bpp

    for (let i = 0; i < width * bpp; i++) {
      const current = raw[rowIn + i]
      const left = i >= bpp ? pixels[rowOut + i - bpp] : 0
      const up = y > 0 ? pixels[rowOut - width * bpp + i] : 0
      const upLeft = y > 0 && i >= bpp ? pixels[rowOut - width * bpp + i - bpp] : 0

      let value
      switch (filter) {
        case 0: value = current; break
        case 1: value = current + left; break
        case 2: value = current + up; break
        case 3: value = current + Math.floor((left + up) / 2); break
        case 4: value = current + paeth(left, up, upLeft); break
        default: throw new Error(`unknown PNG filter ${filter} on row ${y}`)
      }
      pixels[rowOut + i] = value & 0xff
    }
  }

  return { width, height, pixels }
}

/* ----------------------------------------------------------------- PNG out */

const CRC_TABLE = (() => {
  const table = new Uint32Array(256)
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    table[n] = c >>> 0
  }
  return table
})()

function crc32(buf) {
  let crc = 0xffffffff
  for (let i = 0; i < buf.length; i++) crc = CRC_TABLE[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8)
  return (crc ^ 0xffffffff) >>> 0
}

function pngChunk(type, data) {
  const length = Buffer.alloc(4)
  length.writeUInt32BE(data.length, 0)
  const typeBuf = Buffer.from(type, 'ascii')
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0)
  return Buffer.concat([length, typeBuf, data, crc])
}

function encodePng(width, height, pixels) {
  const bpp = 4
  const stride = width * bpp + 1
  const raw = Buffer.alloc(stride * height)

  for (let y = 0; y < height; y++) {
    raw[y * stride] = 0 // filter: None
    pixels.copy(raw, y * stride + 1, y * width * bpp, (y + 1) * width * bpp)
  }

  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(width, 0)
  ihdr.writeUInt32BE(height, 4)
  ihdr[8] = 8 // bit depth
  ihdr[9] = 6 // colour type: RGBA

  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    pngChunk('IHDR', ihdr),
    pngChunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
    pngChunk('IEND', Buffer.alloc(0)),
  ])
}

/* --------------------------------------------------------------- Downscale */

/**
 * Box-filter downscale, averaging colour weighted by alpha.
 *
 * Weighting by alpha matters: averaging raw RGBA across the logo's soft
 * transparent edge would blend in the colour of fully transparent pixels and
 * leave a dark fringe around the mark at 16 and 24px.
 */
function resize(src, srcSize, destSize) {
  const out = Buffer.alloc(destSize * destSize * 4)
  const scale = srcSize / destSize

  for (let y = 0; y < destSize; y++) {
    const y0 = Math.floor(y * scale)
    const y1 = Math.min(Math.ceil((y + 1) * scale), srcSize)

    for (let x = 0; x < destSize; x++) {
      const x0 = Math.floor(x * scale)
      const x1 = Math.min(Math.ceil((x + 1) * scale), srcSize)

      let r = 0
      let g = 0
      let b = 0
      let alphaSum = 0
      let samples = 0

      for (let sy = y0; sy < y1; sy++) {
        for (let sx = x0; sx < x1; sx++) {
          const i = (sy * srcSize + sx) * 4
          const alpha = src[i + 3]
          r += src[i] * alpha
          g += src[i + 1] * alpha
          b += src[i + 2] * alpha
          alphaSum += alpha
          samples++
        }
      }

      const o = (y * destSize + x) * 4
      if (alphaSum > 0) {
        out[o] = Math.round(r / alphaSum)
        out[o + 1] = Math.round(g / alphaSum)
        out[o + 2] = Math.round(b / alphaSum)
        out[o + 3] = Math.round(alphaSum / samples)
      }
    }
  }

  return out
}

/* --------------------------------------------------------------------- ICO */

/**
 * Packs PNG payloads into an ICO container.
 *
 * Each directory entry stores its size in a single byte, so 256 is written as
 * 0 by convention. PNG-compressed entries (rather than raw BMP + AND mask) are
 * read by every Windows version this app targets and keep the file small.
 */
function buildIco(images) {
  const HEADER = 6
  const ENTRY = 16
  const header = Buffer.alloc(HEADER)
  header.writeUInt16LE(0, 0) // reserved
  header.writeUInt16LE(1, 2) // type: 1 = icon
  header.writeUInt16LE(images.length, 4)

  const entries = Buffer.alloc(ENTRY * images.length)
  let offset = HEADER + ENTRY * images.length

  images.forEach((image, index) => {
    const at = index * ENTRY
    entries[at] = image.size >= 256 ? 0 : image.size
    entries[at + 1] = image.size >= 256 ? 0 : image.size
    entries[at + 2] = 0 // palette colours
    entries[at + 3] = 0 // reserved
    entries.writeUInt16LE(1, at + 4) // colour planes
    entries.writeUInt16LE(32, at + 6) // bits per pixel
    entries.writeUInt32LE(image.data.length, at + 8)
    entries.writeUInt32LE(offset, at + 12)
    offset += image.data.length
  })

  return Buffer.concat([header, entries, ...images.map((image) => image.data)])
}

/* -------------------------------------------------------------------- main */

const source = decodePng(SOURCE)
if (source.width !== source.height) {
  throw new Error(`${SOURCE} must be square, got ${source.width}x${source.height}`)
}

const images = SIZES.map((size) => {
  const pixels = size === source.width ? source.pixels : resize(source.pixels, source.width, size)
  return { size, data: encodePng(size, size, pixels) }
})

fs.mkdirSync(path.dirname(OUTPUT), { recursive: true })
fs.writeFileSync(OUTPUT, buildIco(images))

const total = fs.statSync(OUTPUT).size
console.log(`${path.relative(ROOT, SOURCE)} (${source.width}px) -> ${path.relative(ROOT, OUTPUT)}`)
console.log(`  sizes: ${SIZES.join(', ')}`)
console.log(`  ${(total / 1024).toFixed(1)} kB`)
