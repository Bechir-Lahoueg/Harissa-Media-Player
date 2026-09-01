import { useTranslation } from '../hooks/useTranslation'
import logo from '../assets/logoo.png'
import { QueueIcon, SidebarIcon } from './Icons'

interface TopBarProps {
  sidebarCollapsed: boolean
  onToggleSidebar: () => void
  queueOpen: boolean
  onToggleQueue: () => void
  queueCount: number
  context: string
}

/**
 * Application titlebar. The strip is a drag region; interactive controls opt out
 * via `no-drag`, and the right edge is padded to clear the native window buttons.
 */
export function TopBar({
  sidebarCollapsed,
  onToggleSidebar,
  queueOpen,
  onToggleQueue,
  queueCount,
  context,
}: TopBarProps) {
  const { t } = useTranslation()

  return (
    <header className="drag z-30 flex h-[52px] flex-shrink-0 items-center gap-3 border-b border-line-soft bg-shell pl-4 pr-2">
      <div className="flex items-center gap-3">
        <img
          src={logo}
          alt=""
          className="h-[46px] w-[46px] object-contain drop-shadow-[0_3px_14px_rgba(224,27,39,0.55)]"
        />
        <span className="font-display text-[20px] font-semibold leading-none tracking-[-0.035em] text-cream">
          Harissa
        </span>
      </div>

      <span className="h-5 w-px bg-line-soft" />

      <button
        type="button"
        onClick={onToggleSidebar}
        aria-label={sidebarCollapsed ? t.expandSidebar : t.collapseSidebar}
        title={`${sidebarCollapsed ? t.expandSidebar : t.collapseSidebar}   Ctrl+B`}
        className="no-drag flex h-8 w-8 items-center justify-center rounded-[9px] text-ash-dim transition hover:bg-raise hover:text-cream"
      >
        <SidebarIcon className={`h-[17px] w-[17px] ${sidebarCollapsed ? '-scale-x-100' : ''}`} />
      </button>

      <span className="tnum min-w-0 flex-1 truncate text-[10px] uppercase tracking-[0.2em] text-ash-dim">
        {context}
      </span>

      <button
        type="button"
        onClick={onToggleQueue}
        aria-pressed={queueOpen}
        aria-label={queueOpen ? t.hideQueue : t.showQueue}
        title={`${queueOpen ? t.hideQueue : t.showQueue}   Ctrl+J`}
        className={`no-drag flex h-8 items-center gap-2 rounded-[9px] px-2.5 text-[12px] transition ${
          queueOpen ? 'bg-raise text-cream' : 'text-ash-dim hover:bg-raise hover:text-cream'
        }`}
      >
        <QueueIcon className="h-[17px] w-[17px]" />
        <span className="tnum">{queueCount}</span>
      </button>

      {/* Reserved for the native minimise / maximise / close buttons. */}
      <span className="w-[140px] flex-shrink-0" aria-hidden />
    </header>
  )
}
