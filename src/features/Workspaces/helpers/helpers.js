export function getPriorityColor(priority) {
  switch (priority) {
    case "Low":
      return "bg-green-500"
    case "Critical":
      return "bg-orange-400"
    case "High":
      return "bg-red-500"
    default:
      return "bg-gray-400"
  }
}
