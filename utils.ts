import { format } from 'date-fns'

export const getDateObect = (val) => {
  let date

  if (!val) {
    return null
  }

  if (Object.prototype.toString.call(val) === '[object Date]') {
    if (isNaN(val)) {
      return null
    }
  }

  if (typeof val.toDate === 'function') {
    date = val.toDate()
  } else {
    date = new Date(val)
  }

  return date
}

export const formatDate = (val, formatStr, locale) => {
  if (!val) { return '' }

  const date = getDateObect(val)

  if (!date) { return '' }

  const options = {}

  // if (dateLocales[locale]) {
  //   options = { locale: dateLocales[locale] }
  // }

  return format(date, formatStr, options)
}

export const getYmd = (val, locale) => {
  return formatDate(val, 'yyyy-MM-dd', locale)
}

export const getDay = (val, locale) => {
  return formatDate(val, 'iiii', locale)
}

export const getDate = (val, locale) => {
  return formatDate(val, 'd MMM', locale)
}
