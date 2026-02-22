import { notion } from "./client"

export async function getPostBlocks(blockId: string) {
  const blocks: any[] = []
  let cursor: string | undefined = undefined

  do {
    const res = await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
    })

    blocks.push(...res.results)
    cursor = res.has_more ? res.next_cursor ?? undefined : undefined
  } while (cursor)

  return blocks
}
