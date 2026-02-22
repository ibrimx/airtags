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

export interface StoryItem {
  id: string
  type: "image" | "video" | "text"
  media?: string
  caption?: string
  duration: number
  background: string
  cta?: {
    text: string
    link?: string
  }
}

export interface StorySlide {
  id: string
  title: string
  slug: string
  cover?: string
  order: number
  stories: StoryItem[]
}

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

  span: number // 1–12
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
