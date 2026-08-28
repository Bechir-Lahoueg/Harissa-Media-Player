function App() {
  return (
    <main className="flex h-screen bg-zinc-950 text-white">
      <aside className="w-60 border-r border-zinc-800 p-6">
        <h1 className="text-2xl font-bold">Harissa</h1>

        <nav className="mt-8">
          <button className="w-full rounded-lg bg-zinc-800 px-4 py-3 text-left">
            Media
          </button>
        </nav>
      </aside>

      <section className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold">Harissa Media Player</h2>

          <p className="mt-3 text-zinc-400">
            Open a media file to start playing.
          </p>

          <button className="mt-6 rounded-lg bg-white px-6 py-3 font-medium text-black">
            Open File
          </button>
        </div>
      </section>
    </main>
  )
}

export default App