// components/bento/BentoSection.tsx

import { getBentoBlocks } from "@/lib/notion/bento"
import BentoLayout from "./BentoLayout"

export default async function BentoSection() {
  const blocks = await getBentoBlocks()

  return <BentoLayout blocks={blocks} />
}
