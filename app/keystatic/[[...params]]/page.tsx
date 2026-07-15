import { makePage } from "@keystatic/next/ui/app";
import keystaticConfig from "../../../keystatic.config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default makePage(keystaticConfig);
