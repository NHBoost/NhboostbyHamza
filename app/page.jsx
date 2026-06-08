"use client";

import dynamic from "next/dynamic";

// The original prototype rendered entirely on the client (React via CDN).
// We keep that exact behaviour by disabling SSR so nothing about the runtime
// rendering, animations, or hooks (window access, IntersectionObserver) changes.
const App = dynamic(() => import("../components/App"), { ssr: false });

export default function Page() {
  return (
    <div id="root">
      <App />
    </div>
  );
}
