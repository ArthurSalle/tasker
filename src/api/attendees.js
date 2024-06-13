import supabase from "../utils/supabase"

export const getAttendees = async () => {
  const { data } = await supabase.from("attendees").select()
  return data
}

export const postAttendee = async (newAttendee) => {
  const { data } = await supabase.from("attendees").insert({ ...newAttendee })
  return data
}

export const editAttendee = async (attendee) => {
  const { data } = await supabase
    .from("attendees")
    .update({ ...attendee })
    .eq("id", attendee.id)

  return data
}

export const deleteAttendee = async (attendee) => {
  const { data } = await supabase
    .from("attendees")
    .delete()
    .eq("id", attendee.id)

  return data
}
