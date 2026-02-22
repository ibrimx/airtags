import React from "react"

export function RichText({ text }: { text: any[] }) {
  return (
    <>
      {text.map((t, i) => {
        let node: any = t.plain_text

        if (t.annotations.bold) node = <strong>{node}</strong>
        if (t.annotations.italic) node = <em>{node}</em>
        if (t.annotations.code) node = <code>{node}</code>

        if (t.href) {
          node = (
            <a href={t.href} target="_blank" rel="noopener">
              {node}
            </a>
          )
        }

        return <React.Fragment key={i}>{node}</React.Fragment>
      })}
    </>
  )
}
