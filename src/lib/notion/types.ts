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
