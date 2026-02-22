import katex from "katex"

export function renderEquation(expr: string) {
  return katex.renderToString(expr, {
    throwOnError: false,
  })
}
