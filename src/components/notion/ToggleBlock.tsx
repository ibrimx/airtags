import { useState, useEffect } from "react"
import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import { RichText } from "./RichText"
import { BlockRenderer } from "./BlockRenderer"

interface Props {
  block: BlockObjectResponse
}

export default function ToggleBlock({ block }: Props) {
  if (block.type !== "toggle") return null

  const [open, setOpen] = useState(false)
  const [children, setChildren] = useState<any[]>([])

  useEffect(() => {
    async function loadChildren() {
      if (!block.has_children) return
      const res = await fetch(`/api/notion-children?id=${block.id}`)
      const data = await res.json()
      setChildren(data)
    }
    loadChildren()
  }, [])

  return (
    <div style={{ margin: "1.5rem 0" }}>
      <div
        onClick={() => setOpen(!open)}
        style={{ cursor: "pointer", fontWeight: 600 }}
      >
        <RichText text={block.toggle.rich_text} />
      </div>

      {open && children.length > 0 && (
        <div style={{ marginTop: "1rem", paddingLeft: "1rem" }}>
          <BlockRenderer blocks={children} />
        </div>
      )}
    </div>
  )
}
