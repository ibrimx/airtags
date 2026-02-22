import Prism from "prismjs"
import loadLanguages from "prismjs/components/index.js"
import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints"

interface Props {
  block: BlockObjectResponse
}

export default function CodeBlock({ block }: Props) {
  if (block.type !== "code") return null

  const language = block.code.language || "javascript"

  try {
    loadLanguages([language])
  } catch {}

  const code = block.code.rich_text
    .map(t => t.plain_text)
    .join("")

  const highlighted = Prism.highlight(
    code,
    Prism.languages[language] || Prism.languages.javascript,
    language
  )

  return (
    <pre className={`language-${language}`}>
      <code
        className={`language-${language}`}
        dangerouslySetInnerHTML={{ __html: highlighted }}
      />
    </pre>
  )
}
