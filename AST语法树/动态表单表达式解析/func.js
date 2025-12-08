const valueForKey = (str) => {
    return '2025-12-12'
}
function getNextDay(time) {
  var day
  time = new Date(time)
  time = +time - 1000 * 60 * 60 * 24
  time = new Date(time)
  var oneDay = time.getDate()
  if (oneDay < 10) {
    day = '0' + oneDay
  } else {
    day = oneDay
  }
  return time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + day
}
const s =  getNextDay(valueForKey('day'))
console.log(s)
