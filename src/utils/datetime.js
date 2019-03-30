/**
 * Format date by giving pattern.
 * @param formatPattern 'yyyy-MM-dd HH:mm:ss'
 * @param date Date object
 * @return {string} Formatted date string
 */
export function formatDate (date, formatPattern) {
  const object = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    // 24-hour
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    // Quarter
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  }
  if (/(y+)/.test(formatPattern)) {
    formatPattern = formatPattern.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (const k in object) {
    if (new RegExp('(' + k + ')').test(formatPattern)) {
      formatPattern = formatPattern.replace(RegExp.$1, (RegExp.$1.length === 1) ? (object[k]) : (('00' + object[k]).substr(('' + object[k]).length)))
    }
  }
  return formatPattern
}
