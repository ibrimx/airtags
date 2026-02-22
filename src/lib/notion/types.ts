
// S I T E - C O N F I G 
export interface SiteConfig {
  siteName: string
  tagline?: string
  primaryColor?: string
  accentColor?: string
  defaultTheme?: "light" | "dark"
  seoTitle?: string
  seoDescription?: string
  ogImage?: string | null
  logo?: string | null
  favicon?: string | null
  footerText?: string
  twitter?: string
  instagram?: string
  github?: string
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

// P O S T S
export type PostStatus =
  | "idea"
  | "draft"
  | "scheduled"
  | "published"

export type ContentType =
  | "essay"
  | "travel"
  | "project"
  | "experiment"
  | "journal"

export interface Post {
  id: string
  title: string
  slug: string
  excerpt?: string
  cover?: string | null
  status: PostStatus
  publishDate?: string
  updatedDate?: string
  contentType: ContentType
  category?: string
  tags?: string[]
  featured: boolean
  pinned: boolean
  showTOC: boolean
  enableComments: boolean
}
