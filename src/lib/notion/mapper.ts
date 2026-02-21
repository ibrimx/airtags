export function mapText(prop: any): string {
  return (
    prop?.title?.[0]?.plain_text ||
    prop?.rich_text?.[0]?.plain_text ||
    ""
  )
}

export function mapCheckbox(prop: any): boolean {
  return prop?.checkbox ?? false
}

export function mapNumber(prop: any): number {
  return prop?.number ?? 0
}

export function mapUrl(prop: any): string {
  return prop?.url ?? ""
}
