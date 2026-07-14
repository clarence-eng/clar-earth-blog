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
    if (document.documentElement.lang !== lang) {
      document.documentElement.lang = lang;
    }
    return () => {
      // Use a microtask (Promise.resolve) so this runs after React's own
      // MessageChannel microtask scheduler — guaranteeing the incoming page's
      // useEffect fires first and increments langGeneration before we check it.
      Promise.resolve().then(() => {
        if (langGeneration === myGen) {
          document.documentElement.lang = "en";
        }
      });
    };
  }, [lang]);

  return null;
}
