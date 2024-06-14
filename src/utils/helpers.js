import TimeAgo from "javascript-time-ago"

export const modalTitleStyles = "!text-xl !font-medium"
export const warningModalTitleStyles = "!text-xl !font-medium text-red-500"
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

export function formatCreationDate(date) {
  const timeAgo = new TimeAgo("en-US")
  return timeAgo.format(new Date(date))
}
