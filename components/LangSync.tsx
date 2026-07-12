"use client";

import { useEffect } from "react";

/**
 * After hydration, sets document.documentElement.lang to the correct BCP-47
 * code for the current page. This corrects the default lang="en" emitted by
 * layout.tsx for poem pages that declare a different language.
 */
export default function LangSync({ lang }: { lang: string }) {
  useEffect(() => {
    if (lang && document.documentElement.lang !== lang) {
      document.documentElement.lang = lang;
    }
    return () => {
      // Only restore to "en" if leaving a non-English context;
      // if the next page is also non-English, its own effect will update lang
      if (document.documentElement.lang !== "en") {
        document.documentElement.lang = "en";
      }
    };
  }, [lang]);

  return null;
}
