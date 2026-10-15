import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import Edition from "@/components/Edition";
export function run(variant: "clients" | "peers") {
  const html = renderToString(<Edition variant={variant} />);
  const el = document.getElementById("root")!;
  el.innerHTML = html;
  return new Promise<string>((resolve, reject) => {
    const errs: string[] = [];
    const origErr = console.error;
    console.error = (...a: any[]) => { errs.push(a.join(" ")); };
    hydrateRoot(el, <Edition variant={variant} />, { onRecoverableError: (e: any) => errs.push("recoverable: " + e.message) });
    setTimeout(() => { console.error = origErr; resolve(JSON.stringify(errs)); }, 1500);
  });
}
