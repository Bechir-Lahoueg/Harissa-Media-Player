"use client";

import { useEffect, useState } from "react";
import { getDownloadCount, recordDownload } from "@/lib/download-counter";

export function DownloadButton({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
}) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    void getDownloadCount().then((value) => {
      if (!cancelled) setCount(value);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleClick = () => {
    // Fires alongside the browser's normal navigation to the file; the click
    // itself is never blocked or delayed waiting on this.
    void recordDownload().then((value) => {
      if (value !== null) setCount(value);
    });
  };

  return (
    <div className="flex flex-col items-center gap-2 sm:items-end">
      <a href={href} onClick={handleClick} className={className}>
        {children}
      </a>
      {count !== null && count > 0 && (
        <p className="tnum text-[12px] text-ash-dim">
          Downloaded {count.toLocaleString("en-US")} {count === 1 ? "time" : "times"}
        </p>
      )}
    </div>
  );
}
