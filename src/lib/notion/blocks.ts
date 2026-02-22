import { notion } from "./client"

export async function getPostBlocks(blockId: string) {
  const blocks: any[] = []
  let cursor: string | undefined = undefined

  do {
    const res = await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
    })

    for (const block of res.results) {
      if (block.has_children) {
        block.children = await getPostBlocks(block.id)
      }
      blocks.push(block)
    }

    cursor = res.has_more ? res.next_cursor ?? undefined : undefined
  } while (cursor)

  return blocks
}
