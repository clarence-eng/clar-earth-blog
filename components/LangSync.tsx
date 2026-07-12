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
    // No cleanup: the next page's LangSync will update lang, or layout's "en" is already set
  }, [lang]);

  return null;
}
