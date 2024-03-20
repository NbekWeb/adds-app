const formatTime = (long) => {
  const fullMin = long / 1000 / 60
  const h = Math.floor(fullMin / 60)
  let m
  let hh
  let mm
  if (h > 0) {
    m = fullMin - h * 60
  } else {
    m = fullMin
  }
  hh = h < 10 ? `0${h}` : `${h}`
  mm = m < 10 ? `0${m}` : `${m}`
  return `${hh}:${mm}`
}

export default formatTime
