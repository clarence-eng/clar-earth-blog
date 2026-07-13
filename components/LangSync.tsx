"use client";

import { useEffect, useRef } from "react";

/**
 * After hydration, sets document.documentElement.lang to the correct BCP-47
 * code for the current page. This corrects the default lang="en" emitted by
 * layout.tsx for poem pages that declare a different language.
 */
export default function LangSync({ lang }: { lang: string }) {
  // Track whether this instance is still mounted so we don't reset lang
  // after a newer LangSync has already claimed it.
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    if (lang && document.documentElement.lang !== lang) {
      document.documentElement.lang = lang;
    }
    return () => {
      mountedRef.current = false;
      // Only reset to "en" if this instance is still the one that set the value
      // (i.e. the incoming page hasn't already updated it via its own LangSync).
      // We defer with setTimeout(0) so the new page's useEffect runs first.
      const outgoing = lang;
      setTimeout(() => {
        // After the new page's effects have run, check whether the lang is still ours
        if (document.documentElement.lang === outgoing) {
          document.documentElement.lang = "en";
        }
      }, 0);
    };
  }, [lang]);

  return null;
}
