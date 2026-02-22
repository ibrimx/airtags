import AutoLayout from "./BentoLayout"
import Card from "./Card"
import { getBentoBlocks } from "@/lib/notion/bento"

export default async function BentoSection() {
  const blocks = await getBentoBlocks()

  return (
    <AutoLayout spans={blocks.map(b => b.span)}>
      {blocks.map(block => (
        <Card
          key={block.id}
          layout={block.layout}
          title={block.title}
          description={block.description}
          image={block.image}
          linkText={block.linkText}
          linkHref={block.linkHref}
          styleVariant={block.styleVariant}
        />
      ))}
    </AutoLayout>
  )
}
