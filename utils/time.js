import dayjs from "dayjs"

export const getDateTimeString = (date) => {
  return dayjs(date).format("DD/MMM/YYYY HH:mm [GMT]Z")
}
