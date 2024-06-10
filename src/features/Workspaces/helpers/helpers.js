export function getPriorityColor(priority) {
  switch (priority) {
    case "Low":
      return "green"
    case "Critical":
      return "orange"
    case "High":
      return "red"
    default:
      return "gray"
  }
}
