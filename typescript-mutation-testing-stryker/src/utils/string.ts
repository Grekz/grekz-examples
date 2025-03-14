const CHARSET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

export const generateRandomStr = (length = 43, wishlist = CHARSET) =>
  Array.from(crypto.getRandomValues(new Uint32Array(length)))
    .map((x) => wishlist[x % wishlist.length])
    .join('')

export const truncateChars = (input = '', noOfChars = 10) =>
  input.length > noOfChars ? `${input.slice(0, noOfChars)} ...` : input || ''

export const cleanHtmlTags = (str = '') => str?.replace(/(<((?!mention)(?!\/mention)[^>]+)>)/gi, '') || ''

export const cleanTextDoubleQuotes = (str = '') => cleanHtmlTags(str)?.replace(/(")/gi, "'")

export const cleanSpacesAndLineBreaks = (str = '') => str?.replace(/[\r\n|\r|\n|\s\s]+/gi, ' ')

export const cleanTextAll = (str = '') => cleanSpacesAndLineBreaks(cleanTextDoubleQuotes(cleanHtmlTags(str)))

export const simpleNumber = (num = 0) => {
  if (num <= 999) {
    return `${num}`
  }
  return `${(num / 1_000).toFixed(1)}k`.replace('.0', '')
}

export const pluralize = (num: number, singular: string, plural = `${singular}s`) =>
  singular.length > 0 ? ([1, -1].includes(num) && singular) || plural : ''

export const processText = (inputText: string) => {
  const cleanText = cleanComment(inputText)
  return formatReadOnlyMentions(cleanText)
}

export const formatReadOnlyMentions = (text: string) =>
  text.replace(
    /<mention id="[a-z0-9]+" displayname="([^"]+)"><\/mention>/gi,
    (_: string, displayName: string) => `<span style="font-weight:500">${cleanComment(displayName)}</span>`
  )

export const cleanComment = (str = '') =>
  cleanHtmlTags(str)
    .replace(/(\n){2,}/gi, '<br><br>')
    .replace(/\\/gi, '/')
    .replace(/\n/gi, '<br>')

export const generateQueryParams = (params: object = {}, prefix = '?') => {
  const searchParams = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (typeof value !== 'undefined' && value !== null) {
      searchParams.append(key, String(value))
    }
  }
  const queryParams = searchParams.toString()
  return queryParams ? `${prefix}${queryParams}` : ''
}

// https://base64.guru/standards/base64url
export const toBase64url = (url = '') => url.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')

export const arrayBufferToBase64Url = (buffer: ArrayBuffer): string => {
  const uint8Array = new Uint8Array(buffer)
  const base64String = btoa(String.fromCharCode(...uint8Array))
  return toBase64url(base64String)
}

export const truncateWords = (input: string, limit: number): string => {
  const regex = new RegExp(`^.{${limit}}.*?\\b`)
  const [result] = input?.match(regex) || []
  const needsEllipsis = result && result.length < input.length
  return result ? `${result.trim()}${needsEllipsis ? '...' : ''}` : input || ''
}

export const listToString = (list: string[]): string => {
  if (!list) {
    return ''
  }
  const formatter = new Intl.ListFormat('en-GB', { style: 'long', type: 'conjunction' })
  return formatter.format(list.map((item) => item.trim()))
}

export const limitList = (items: string[] = [], limit = 999_999): string[] => {
  if (limit > 0 && limit < items.length) {
    const lastItem = `${items.length - limit + 1} more`
    return [...items.slice(0, limit - 1), lastItem]
  }
  return items
}

export const isString = (value: unknown): value is string => typeof value === 'string'

export const escapeRegEx = (value: string): string => value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&')

export const getUrlFromStr = (str: string) => {
  const urlRegex = /(https?:\/\/[_-\w\d.\/]+)/g
  const matches = str.toLowerCase().match(urlRegex)
  return matches && isValidUrl(matches[0]) ? matches[0] : null
}

export const isValidUrl = (str: string) => {
  try {
    const url = new URL(str)
    return ['http:', 'https:'].includes(url.protocol)
  } catch {
    return false
  }
}
