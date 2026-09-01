import { useTranslation } from '../hooks/useTranslation'
import { NowPlayingIcon, OpenIcon, QueueIcon, SidebarIcon } from './Icons'

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
  queueOpen: boolean
  onShowNowPlaying: () => void
  onShowQueue: () => void
  queueCount: number
  onOpenFiles: () => void
}

export function Sidebar({
  collapsed,
  onToggle,
  queueOpen,
  onShowNowPlaying,
  onShowQueue,
  queueCount,
  onOpenFiles,
}: SidebarProps) {
  const { t } = useTranslation()

  return (
    <aside
      className={`relative z-20 flex h-full flex-shrink-0 flex-col overflow-hidden border-r border-line-soft bg-shell transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        collapsed ? 'w-[72px]' : 'w-[236px]'
      }`}
    >
      <nav className="mt-4 flex flex-1 flex-col gap-1 px-3">
        {!collapsed && (
          <div className="tnum mb-1.5 px-2 text-[9px] uppercase tracking-[0.22em] text-ash-dim">
            {t.playback}
          </div>
        )}

        <NavItem
          collapsed={collapsed}
          active={!queueOpen}
          label={t.nowPlaying}
          icon={<NowPlayingIcon />}
          onClick={onShowNowPlaying}
        />
        <NavItem
          collapsed={collapsed}
          active={queueOpen}
          label={t.queue}
          icon={<QueueIcon />}
          badge={queueCount > 0 ? String(queueCount) : undefined}
          onClick={onShowQueue}
        />
      </nav>

      <div className="flex flex-col gap-1.5 p-3">
        <button
          type="button"
          onClick={onOpenFiles}
          title={`${t.openFiles}   Ctrl+O`}
          aria-label={t.openFiles}
          className={`ember flex items-center justify-center gap-2 rounded-[10px] py-2.5 text-[13px] font-semibold text-white shadow-[0_6px_20px_-10px_rgba(224,27,39,0.9)] transition hover:brightness-110 active:scale-[0.98] ${
            collapsed ? 'px-0' : 'px-4'
          }`}
        >
          <OpenIcon className="h-[17px] w-[17px]" />
          {!collapsed && <span>{t.openFiles}</span>}
        </button>

        <button
          type="button"
          onClick={onToggle}
          title={`${collapsed ? t.expandSidebar : t.collapseSidebar}   Ctrl+B`}
          aria-label={collapsed ? t.expandSidebar : t.collapseSidebar}
          className={`flex items-center gap-2.5 rounded-[10px] px-3 py-2 text-[12px] text-ash-dim transition hover:bg-raise hover:text-ash ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          <SidebarIcon className={`h-[17px] w-[17px] ${collapsed ? '-scale-x-100' : ''}`} />
          {!collapsed && <span>{t.collapse}</span>}
        </button>
      </div>
    </aside>
  )
}

function NavItem({
  collapsed,
  active,
  label,
  icon,
  badge,
  onClick,
}: {
  collapsed: boolean
  active: boolean
  label: string
  icon: React.ReactNode
  badge?: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={collapsed ? label : undefined}
      aria-current={active ? 'page' : undefined}
      className={`relative flex h-[38px] items-center rounded-[10px] text-[13px] transition-colors ${
        collapsed ? 'justify-center px-0' : 'gap-3 px-3'
      } ${active ? 'bg-raise font-medium text-cream' : 'text-ash hover:bg-raise/60 hover:text-cream'}`}
    >
      {active && (
        <span className="ember absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-r-full" />
      )}
      <span className={active ? 'text-chili-hi' : ''}>{icon}</span>
      {!collapsed && <span className="flex-1 truncate text-left">{label}</span>}
      {!collapsed && badge && (
        <span className="tnum rounded-full bg-raise-hi px-1.5 py-0.5 text-[10px] text-ash">
          {badge}
        </span>
      )}
    </button>
  )
}
