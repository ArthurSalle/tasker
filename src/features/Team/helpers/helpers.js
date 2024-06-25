import { capitalizeFirstLetter } from "../../../utils/helpers"

export function getFullname(firstname, lastname) {
  return (
    capitalizeFirstLetter(firstname) + " " + capitalizeFirstLetter(lastname)
  )
}

export const getAttendeesKey = "get_attendees"
