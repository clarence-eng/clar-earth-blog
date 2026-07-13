"use client";

import { useEffect } from "react";

// Module-level counter tracks the "generation" of the current lang owner.
// Each LangSync mount increments it; cleanup only resets if it's still the current owner.
let langGeneration = 0;

/**
 * After hydration, sets document.documentElement.lang to the correct BCP-47
 * code for the current page. This corrects the default lang="en" emitted by
 * layout.tsx for poem pages that declare a different language.
 */
export default function LangSync({ lang }: { lang: string }) {
  useEffect(() => {
    const myGen = ++langGeneration;
    if (lang && document.documentElement.lang !== lang) {
      document.documentElement.lang = lang;
    }
    return () => {
      // Defer so the incoming page's useEffect can claim ownership first.
      // Only reset to "en" if we're still the current generation owner.
      setTimeout(() => {
        if (langGeneration === myGen) {
          document.documentElement.lang = "en";
        }
      }, 0);
    };
  }, [lang]);

  return null;
}
