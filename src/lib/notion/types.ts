export interface Post {
  id: string
  title: string
  slug: string
  excerpt?: string
  cover?: string
  published?: boolean
  date?: string
}

export interface SiteConfig {
  title: string
  description?: string
  logo?: string
}

// S T O R I S E
export interface StoryItem {
  id: string
  title: string
  media?: string | null
  caption?: string
  ctaText?: string
  ctaLink?: string
  type?: "image" | "video" | "text"
  duration?: number
  background?: string
  order: number
  slideId: string | null
}

export interface StorySlide {
  id: string
  title: string
  slug: string
  cover?: string | null
  order: number
  theme?: string
  items: StoryItem[]
}


// B E N T O *
export interface BentoBlock {
  id: string

  // Content
  title: string
  description?: string
  image?: string | null

  // Layout Engine
  layout:
    | "stack"
    | "split"
    | "overlay"
    | "center"
    | "mediaTop"
    | "banner"

  // Grid Engine
  spanCols: number   // 1–12 (العرض)
  spanRows: number   // 1–6  (الارتفاع)

  order: number

  // Link
  linkText?: string
  linkHref?: string

  // Style System
  styleVariant?:
    | "surface"
    | "surface-muted"
    | "surface-inverted"
    | "accent-blue"
    | "accent-green"
    | "accent-red"
    | "accent-yellow"
    | "gradient-soft"
    | "gradient-strong"
    | "glass"
    | "outline"

  published: boolean
}
