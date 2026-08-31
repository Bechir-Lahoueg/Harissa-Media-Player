import Link from "next/link";

export default function NotFound() {
  return (
    <main
      id="content"
      className="mx-auto flex max-w-[1180px] flex-col items-start px-5 py-28 sm:px-8"
    >
      <p className="eyebrow">404</p>
      <h1 className="mt-3 max-w-[18ch] font-display text-[34px] font-semibold leading-[1.1] tracking-[-0.02em] text-cream">
        Nothing at this address
      </h1>
      <p className="mt-4 max-w-[52ch] text-[15.5px] leading-relaxed text-ash">
        The page you asked for does not exist. If you followed a link from
        elsewhere on this site, it is a mistake worth reporting.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/docs"
          className="rounded-[10px] bg-chili px-5 py-2.5 text-[14px] font-semibold text-white transition hover:bg-chili-hi"
        >
          Go to the documentation
        </Link>
        <Link
          href="/"
          className="rounded-[10px] border border-line px-5 py-2.5 text-[14px] text-ash transition hover:border-ash-dim hover:text-cream"
        >
          Back to the home page
        </Link>
      </div>
    </main>
  );
}
