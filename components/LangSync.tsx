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
      // Use a microtask so the incoming page's effect can set a new lang first.
      // Only reset to "en" if no other LangSync has set a different value.
      const outgoing = lang;
      Promise.resolve().then(() => {
        if (document.documentElement.lang === outgoing) {
          document.documentElement.lang = "en";
        }
      });
    };
  }, [lang]);

  return null;
}
