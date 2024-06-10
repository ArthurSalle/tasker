export const modalTitleStyles = "!text-xl !font-medium"

export const drawerTitleStyles = "!text-2xl !font-semibold"

export function capitalizeFirstLetter(word) {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

export function getFirstLetter(word) {
  return word[0].toUpperCase()
}

export function mockDelay(delay) {
  return new Promise((resolve) => setTimeout(resolve, delay))
}
