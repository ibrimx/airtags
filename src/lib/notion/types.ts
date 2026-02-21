export interface SiteConfig {
  title: string
  description: string
  logo?: string
}

export interface Post {
  id: string
  slug: string
  title: string
  excerpt?: string
  cover?: string
  published: boolean
  date: string
}

export interface StoryItem {
  id: string
  type: "image" | "video" | "text"
  media?: string
  caption?: string
  duration: number
}

export interface StorySlide {
  id: string
  title: string
  slug: string
  cover: string
  order: number
  stories: StoryItem[]
}
