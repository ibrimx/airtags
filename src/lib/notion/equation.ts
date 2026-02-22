import katex from "katex"
import { sanitize } from "@/lib/notion/sanitize"

export function renderEquation(
  expr: string,
  displayMode: boolean = false
) {
  if (!expr) return ""

  try {
    const html = katex.renderToString(expr, {
      throwOnError: false,
      displayMode,
      strict: "warn",
      trust: false, // مهم أمنيًا
      output: "html",
    })

    return sanitize(html)
  } catch {
    return ""
  }
}
