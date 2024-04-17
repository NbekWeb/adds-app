import dayjs from 'dayjs'

export const formatTime = (long, type) => {
  const day = Math.floor(long / 1000 / 60 / 60 / 24)
  const hour = Math.floor((long - day * 24 * 60 * 60 * 1000) / 1000 / 60 / 60)
  const minute = Math.floor(
    (long - day * 24 * 60 * 60 * 1000 - hour * 60 * 60 * 1000) / 1000 / 60
  )
  if (type === 'day') {
    return day
  } else if (type === 'hour') {
    return hour
  } else if (type === 'minute') {
    return minute
  } else {
    return 'Type is required'
  }
}

export const formatHourAndMinute = (time) => {
  return `${dayjs(time).get('hour')}:${dayjs(time).get('minute')}`
}
