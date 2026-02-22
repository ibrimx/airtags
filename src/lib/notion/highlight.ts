import Prism from "prismjs"
import loadLanguages from "prismjs/components/index.js"

loadLanguages(["javascript","typescript","bash","json","css","markup","python"])

export function highlight(code: string, lang: string) {
  const grammar = Prism.languages[lang] || Prism.languages.markup
  return Prism.highlight(code, grammar, lang)
}
