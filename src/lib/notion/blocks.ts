import { notion } from "./client"

/* ----------------------------------
   Recursive Block Fetch
-----------------------------------*/

export async function getBlocksRecursive(
  blockId: string
): Promise<any[]> {

  const blocks: any[] = []

  const response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 100,
  })

  for (const block of response.results) {
    const enriched: any = { ...block }

    if ("has_children" in block && block.has_children) {
      enriched.children = await getBlocksRecursive(block.id)
    }

    blocks.push(enriched)
  }

  return blocks
}
