// components/layout/BentoGrid.tsx

interface Props {
  children: React.ReactNode
  mobileCols?: 1 | 2
}

export default function BentoGrid({
  children,
  mobileCols = 1,
}: Props) {
  return (
    <div
      className={`
        grid
        ${mobileCols === 1 ? "grid-cols-1" : "grid-cols-2"}
        md:grid-cols-12
        gap-6
      `}
    >
      {children}
    </div>
  )
}
