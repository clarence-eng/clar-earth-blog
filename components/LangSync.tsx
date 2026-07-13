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
      // Reset to "en" when leaving a non-English post via client-side navigation.
      // English posts don't mount LangSync so they would otherwise inherit the
      // previous page's language tag.
      document.documentElement.lang = "en";
    };
  }, [lang]);

  return null;
}
