import { DocsSidebar } from "@/components/docs/docs-sidebar";
import { PageNav } from "@/components/docs/page-nav";
import { ReadingProgress } from "@/components/docs/reading-progress";

/**
 * The documentation shell: a persistent sidebar, the reading rail, and the
 * previous/next footer. Individual pages provide only their own content.
 */
export default function DocsLayout({ children }: LayoutProps<"/docs">) {
  return (
    <>
      <ReadingProgress />
      <div className="mx-auto w-full max-w-[1180px] px-0 lg:flex lg:gap-10 lg:px-8">
        <DocsSidebar />
        <main
          id="content"
          className="min-w-0 flex-1 px-5 pb-16 pt-10 sm:px-8 lg:px-0 lg:pt-12"
        >
          {children}
          <PageNav />
        </main>
      </div>
    </>
  );
}
