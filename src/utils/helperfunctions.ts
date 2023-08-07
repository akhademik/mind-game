export const getURL = (url: string) => {
  const path = new URL('@/assets/img/', import.meta.url)
  return `${path}/${url}.png`
}
