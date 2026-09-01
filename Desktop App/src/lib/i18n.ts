/**
 * UI strings, keyed by language.
 *
 * The active language follows the Windows display language, reported by
 * `app.getLocale()` in the main process. Matching is done on the base subtag,
 * so "fr-CA" and "fr-FR" both resolve to French; anything with no dictionary
 * falls back to English rather than showing raw keys.
 *
 * Adding a language means adding one entry to DICTIONARIES — the key list is
 * typed, so a missing or misspelled string is a compile error.
 */

export type Strings = {
  appTagline: string
  playback: string
  nowPlaying: string
  queue: string
  noMediaOpen: string
  nothingPlaying: string
  nothingPlayingYet: string
  emptyStateBody: string
  openFiles: string
  orDropFiles: string
  collapse: string
  expandSidebar: string
  collapseSidebar: string
  showQueue: string
  hideQueue: string
  nothingQueued: string
  localFile: string
  file: string
  playing: string
  paused: string
  play: string
  pause: string
  previousTrack: string
  nextTrack: string
  seekBackward: string
  seekForward: string
  shuffle: string
  repeatOff: string
  repeatAll: string
  repeatOne: string
  mute: string
  unmute: string
  volume: string
  seek: string
  fullscreen: string
  exitFullscreen: string
  exit: string
  filterQueue: string
  queueEmpty: string
  noTrackMatches: string
  clearQueue: string
  removeFromQueue: string
  jumpToTime: string
  jumpToTimeHint: string
  trackCountOne: string
  trackCountOther: string
  positionOfTotal: string
  dropToAdd: string
  audioAndVideoFiles: string
  playbackErrorHint: string
  shortcutPlayPause: string
  shortcutSeek: string
  shortcutOpen: string
  shortcutSidebar: string
  shortcutMute: string
  shortcutFullscreen: string
}

const en: Strings = {
  appTagline: 'Local player',
  playback: 'Playback',
  nowPlaying: 'Now playing',
  queue: 'Queue',
  noMediaOpen: 'No media open',
  nothingPlaying: 'Nothing playing',
  nothingPlayingYet: 'Nothing playing yet',
  emptyStateBody:
    'Open audio or video from this computer. Harissa reads your files where they already live — nothing is copied, uploaded, or indexed.',
  openFiles: 'Open files',
  orDropFiles: 'or drop them anywhere in this window',
  collapse: 'Collapse',
  expandSidebar: 'Expand sidebar',
  collapseSidebar: 'Collapse sidebar',
  showQueue: 'Show queue',
  hideQueue: 'Hide queue',
  nothingQueued: 'Nothing queued',
  localFile: 'Local file',
  file: 'file',
  playing: 'Playing',
  paused: 'Paused',
  play: 'Play',
  pause: 'Pause',
  previousTrack: 'Previous track',
  nextTrack: 'Next track',
  seekBackward: 'Back 10 seconds — hold to rewind',
  seekForward: 'Forward 10 seconds — hold to fast-forward',
  shuffle: 'Shuffle',
  repeatOff: 'Repeat off',
  repeatAll: 'Repeat queue',
  repeatOne: 'Repeat track',
  mute: 'Mute',
  unmute: 'Unmute',
  volume: 'Volume',
  seek: 'Seek',
  fullscreen: 'Fullscreen',
  exitFullscreen: 'Exit fullscreen',
  exit: 'Exit',
  filterQueue: 'Filter queue',
  queueEmpty: 'The queue is empty. Open a few files and they will line up here.',
  noTrackMatches: 'No track matches “{query}”.',
  clearQueue: 'Clear queue',
  removeFromQueue: 'Remove from queue',
  jumpToTime: 'Jump to time',
  jumpToTimeHint: 'Jump to a timecode — click and type, e.g. 2:00',
  trackCountOne: 'track',
  trackCountOther: 'tracks',
  positionOfTotal: '{position} of {total}',
  dropToAdd: 'Drop to add to the queue',
  audioAndVideoFiles: 'Audio and video files',
  playbackErrorHint: 'Try another file, or check that it still exists at that path.',
  shortcutPlayPause: 'Play or pause',
  shortcutSeek: 'Back or forward 10s',
  shortcutOpen: 'Open files',
  shortcutSidebar: 'Toggle sidebar',
  shortcutMute: 'Mute',
  shortcutFullscreen: 'Fullscreen',
}

const fr: Strings = {
  appTagline: 'Lecteur local',
  playback: 'Lecture',
  nowPlaying: 'En cours de lecture',
  queue: "File d'attente",
  noMediaOpen: 'Aucun média ouvert',
  nothingPlaying: 'Aucune lecture',
  nothingPlayingYet: 'Aucune lecture en cours',
  emptyStateBody:
    'Ouvrez un fichier audio ou vidéo depuis cet ordinateur. Harissa lit vos fichiers là où ils se trouvent — rien n’est copié, envoyé ni indexé.',
  openFiles: 'Ouvrir des fichiers',
  orDropFiles: 'ou déposez-les n’importe où dans cette fenêtre',
  collapse: 'Réduire',
  expandSidebar: 'Déployer le panneau latéral',
  collapseSidebar: 'Réduire le panneau latéral',
  showQueue: "Afficher la file d'attente",
  hideQueue: "Masquer la file d'attente",
  nothingQueued: 'Aucun élément en attente',
  localFile: 'Fichier local',
  file: 'fichier',
  playing: 'Lecture',
  paused: 'En pause',
  play: 'Lire',
  pause: 'Pause',
  previousTrack: 'Piste précédente',
  nextTrack: 'Piste suivante',
  seekBackward: 'Reculer de 10 secondes — maintenir pour rembobiner',
  seekForward: 'Avancer de 10 secondes — maintenir pour avancer rapidement',
  shuffle: 'Lecture aléatoire',
  repeatOff: 'Répétition désactivée',
  repeatAll: "Répéter la file d'attente",
  repeatOne: 'Répéter la piste',
  mute: 'Couper le son',
  unmute: 'Rétablir le son',
  volume: 'Volume',
  seek: 'Position',
  fullscreen: 'Plein écran',
  exitFullscreen: 'Quitter le plein écran',
  exit: 'Quitter',
  filterQueue: "Filtrer la file d'attente",
  queueEmpty: "La file d'attente est vide. Ouvrez des fichiers, ils s’afficheront ici.",
  noTrackMatches: 'Aucune piste ne correspond à « {query} ».',
  clearQueue: "Vider la file d'attente",
  removeFromQueue: "Retirer de la file d'attente",
  jumpToTime: 'Aller à un instant',
  jumpToTimeHint: 'Aller à un instant — cliquez et saisissez, par ex. 2:00',
  trackCountOne: 'piste',
  trackCountOther: 'pistes',
  positionOfTotal: '{position} sur {total}',
  dropToAdd: "Déposez pour ajouter à la file d'attente",
  audioAndVideoFiles: 'Fichiers audio et vidéo',
  playbackErrorHint: 'Essayez un autre fichier ou vérifiez qu’il existe toujours à cet emplacement.',
  shortcutPlayPause: 'Lire ou mettre en pause',
  shortcutSeek: 'Reculer ou avancer de 10 s',
  shortcutOpen: 'Ouvrir des fichiers',
  shortcutSidebar: 'Afficher/masquer le panneau',
  shortcutMute: 'Couper le son',
  shortcutFullscreen: 'Plein écran',
}

const ar: Strings = {
  appTagline: 'مشغّل محلي',
  playback: 'التشغيل',
  nowPlaying: 'قيد التشغيل',
  queue: 'قائمة التشغيل',
  noMediaOpen: 'لا توجد وسائط مفتوحة',
  nothingPlaying: 'لا شيء قيد التشغيل',
  nothingPlayingYet: 'لا شيء قيد التشغيل بعد',
  emptyStateBody:
    'افتح ملفات صوت أو فيديو من هذا الجهاز. يقرأ Harissa ملفاتك من مكانها — دون نسخ أو رفع أو فهرسة.',
  openFiles: 'فتح الملفات',
  orDropFiles: 'أو أفلتها في أي مكان داخل هذه النافذة',
  collapse: 'طيّ',
  expandSidebar: 'توسيع الشريط الجانبي',
  collapseSidebar: 'طيّ الشريط الجانبي',
  showQueue: 'إظهار قائمة التشغيل',
  hideQueue: 'إخفاء قائمة التشغيل',
  nothingQueued: 'لا شيء في القائمة',
  localFile: 'ملف محلي',
  file: 'ملف',
  playing: 'قيد التشغيل',
  paused: 'متوقف مؤقتاً',
  play: 'تشغيل',
  pause: 'إيقاف مؤقت',
  previousTrack: 'المقطع السابق',
  nextTrack: 'المقطع التالي',
  seekBackward: 'رجوع 10 ثوانٍ — اضغط مطوّلاً للإرجاع',
  seekForward: 'تقدّم 10 ثوانٍ — اضغط مطوّلاً للتقديم',
  shuffle: 'تشغيل عشوائي',
  repeatOff: 'التكرار متوقف',
  repeatAll: 'تكرار القائمة',
  repeatOne: 'تكرار المقطع',
  mute: 'كتم الصوت',
  unmute: 'إلغاء كتم الصوت',
  volume: 'مستوى الصوت',
  seek: 'الموضع',
  fullscreen: 'ملء الشاشة',
  exitFullscreen: 'إنهاء ملء الشاشة',
  exit: 'خروج',
  filterQueue: 'تصفية القائمة',
  queueEmpty: 'القائمة فارغة. افتح بعض الملفات وستظهر هنا.',
  noTrackMatches: 'لا يوجد مقطع يطابق «{query}».',
  clearQueue: 'مسح القائمة',
  removeFromQueue: 'إزالة من القائمة',
  jumpToTime: 'الانتقال إلى وقت',
  jumpToTimeHint: 'الانتقال إلى وقت — انقر واكتب، مثال 2:00',
  trackCountOne: 'مقطع',
  trackCountOther: 'مقاطع',
  positionOfTotal: '{position} من {total}',
  dropToAdd: 'أفلت للإضافة إلى القائمة',
  audioAndVideoFiles: 'ملفات صوت وفيديو',
  playbackErrorHint: 'جرّب ملفاً آخر، أو تأكد من أنه ما زال موجوداً في مساره.',
  shortcutPlayPause: 'تشغيل أو إيقاف مؤقت',
  shortcutSeek: 'رجوع أو تقدّم 10 ثوانٍ',
  shortcutOpen: 'فتح الملفات',
  shortcutSidebar: 'إظهار/إخفاء الشريط الجانبي',
  shortcutMute: 'كتم الصوت',
  shortcutFullscreen: 'ملء الشاشة',
}

const es: Strings = {
  appTagline: 'Reproductor local',
  playback: 'Reproducción',
  nowPlaying: 'Reproduciendo',
  queue: 'Cola',
  noMediaOpen: 'Ningún archivo abierto',
  nothingPlaying: 'Nada en reproducción',
  nothingPlayingYet: 'Todavía no hay nada en reproducción',
  emptyStateBody:
    'Abre audio o vídeo desde este equipo. Harissa lee tus archivos donde ya están: no se copia, sube ni indexa nada.',
  openFiles: 'Abrir archivos',
  orDropFiles: 'o suéltalos en cualquier parte de esta ventana',
  collapse: 'Contraer',
  expandSidebar: 'Expandir barra lateral',
  collapseSidebar: 'Contraer barra lateral',
  showQueue: 'Mostrar cola',
  hideQueue: 'Ocultar cola',
  nothingQueued: 'Nada en la cola',
  localFile: 'Archivo local',
  file: 'archivo',
  playing: 'Reproduciendo',
  paused: 'En pausa',
  play: 'Reproducir',
  pause: 'Pausar',
  previousTrack: 'Pista anterior',
  nextTrack: 'Pista siguiente',
  seekBackward: 'Retroceder 10 segundos — mantén para rebobinar',
  seekForward: 'Avanzar 10 segundos — mantén para avanzar rápido',
  shuffle: 'Aleatorio',
  repeatOff: 'Repetición desactivada',
  repeatAll: 'Repetir cola',
  repeatOne: 'Repetir pista',
  mute: 'Silenciar',
  unmute: 'Activar sonido',
  volume: 'Volumen',
  seek: 'Posición',
  fullscreen: 'Pantalla completa',
  exitFullscreen: 'Salir de pantalla completa',
  exit: 'Salir',
  filterQueue: 'Filtrar cola',
  queueEmpty: 'La cola está vacía. Abre algunos archivos y aparecerán aquí.',
  noTrackMatches: 'Ninguna pista coincide con «{query}».',
  clearQueue: 'Vaciar cola',
  removeFromQueue: 'Quitar de la cola',
  jumpToTime: 'Ir a un momento',
  jumpToTimeHint: 'Ir a un momento: haz clic y escribe, p. ej. 2:00',
  trackCountOne: 'pista',
  trackCountOther: 'pistas',
  positionOfTotal: '{position} de {total}',
  dropToAdd: 'Suelta para añadir a la cola',
  audioAndVideoFiles: 'Archivos de audio y vídeo',
  playbackErrorHint: 'Prueba con otro archivo o comprueba que siga existiendo en esa ruta.',
  shortcutPlayPause: 'Reproducir o pausar',
  shortcutSeek: 'Retroceder o avanzar 10 s',
  shortcutOpen: 'Abrir archivos',
  shortcutSidebar: 'Alternar barra lateral',
  shortcutMute: 'Silenciar',
  shortcutFullscreen: 'Pantalla completa',
}

const de: Strings = {
  appTagline: 'Lokaler Player',
  playback: 'Wiedergabe',
  nowPlaying: 'Wird wiedergegeben',
  queue: 'Warteschlange',
  noMediaOpen: 'Keine Medien geöffnet',
  nothingPlaying: 'Keine Wiedergabe',
  nothingPlayingYet: 'Noch keine Wiedergabe',
  emptyStateBody:
    'Öffne Audio- oder Videodateien von diesem Computer. Harissa liest deine Dateien dort, wo sie liegen — nichts wird kopiert, hochgeladen oder indiziert.',
  openFiles: 'Dateien öffnen',
  orDropFiles: 'oder ziehe sie irgendwo in dieses Fenster',
  collapse: 'Einklappen',
  expandSidebar: 'Seitenleiste ausklappen',
  collapseSidebar: 'Seitenleiste einklappen',
  showQueue: 'Warteschlange anzeigen',
  hideQueue: 'Warteschlange ausblenden',
  nothingQueued: 'Nichts in der Warteschlange',
  localFile: 'Lokale Datei',
  file: 'Datei',
  playing: 'Wiedergabe',
  paused: 'Pausiert',
  play: 'Abspielen',
  pause: 'Pause',
  previousTrack: 'Vorheriger Titel',
  nextTrack: 'Nächster Titel',
  seekBackward: '10 Sekunden zurück — halten zum Zurückspulen',
  seekForward: '10 Sekunden vor — halten zum Vorspulen',
  shuffle: 'Zufallswiedergabe',
  repeatOff: 'Wiederholung aus',
  repeatAll: 'Warteschlange wiederholen',
  repeatOne: 'Titel wiederholen',
  mute: 'Stummschalten',
  unmute: 'Stummschaltung aufheben',
  volume: 'Lautstärke',
  seek: 'Position',
  fullscreen: 'Vollbild',
  exitFullscreen: 'Vollbild beenden',
  exit: 'Beenden',
  filterQueue: 'Warteschlange filtern',
  queueEmpty: 'Die Warteschlange ist leer. Öffne ein paar Dateien, dann erscheinen sie hier.',
  noTrackMatches: 'Kein Titel passt zu „{query}“.',
  clearQueue: 'Warteschlange leeren',
  removeFromQueue: 'Aus der Warteschlange entfernen',
  jumpToTime: 'Zu Zeitpunkt springen',
  jumpToTimeHint: 'Zu einem Zeitpunkt springen — klicken und tippen, z. B. 2:00',
  trackCountOne: 'Titel',
  trackCountOther: 'Titel',
  positionOfTotal: '{position} von {total}',
  dropToAdd: 'Ablegen, um zur Warteschlange hinzuzufügen',
  audioAndVideoFiles: 'Audio- und Videodateien',
  playbackErrorHint: 'Probiere eine andere Datei oder prüfe, ob sie noch unter diesem Pfad liegt.',
  shortcutPlayPause: 'Abspielen oder pausieren',
  shortcutSeek: '10 s zurück oder vor',
  shortcutOpen: 'Dateien öffnen',
  shortcutSidebar: 'Seitenleiste umschalten',
  shortcutMute: 'Stummschalten',
  shortcutFullscreen: 'Vollbild',
}

const DICTIONARIES: Record<string, Strings> = { en, fr, ar, es, de }

/** Languages written right-to-left, which flip the whole layout. */
const RTL_LANGUAGES = new Set(['ar', 'he', 'fa', 'ur'])

export function resolveLanguage(locale: string): string {
  const base = locale.toLowerCase().split(/[-_]/)[0]
  return base in DICTIONARIES ? base : 'en'
}

export function isRightToLeft(language: string): boolean {
  return RTL_LANGUAGES.has(language)
}

export function stringsFor(language: string): Strings {
  return DICTIONARIES[language] ?? en
}

/** Substitutes {name} placeholders; missing values are left untouched. */
export function format(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  )
}

/**
 * Picks the singular or plural form for a count.
 *
 * Intl.PluralRules is used rather than `count === 1` because languages disagree
 * about where the boundary sits — French treats 0 as singular, and Arabic has
 * several categories beyond one/other.
 */
export function plural(language: string, count: number, one: string, other: string): string {
  try {
    return new Intl.PluralRules(language).select(count) === 'one' ? one : other
  } catch {
    return count === 1 ? one : other
  }
}
