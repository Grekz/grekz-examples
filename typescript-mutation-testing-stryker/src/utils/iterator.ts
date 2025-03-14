export const removeEntriesByKey = <T>(entries: IterableIterator<[string, T]>, keys: string[]) => {
  const result: { [x: string]: T } = {}
  for (const [key, value] of entries) {
    if (!keys.includes(key)) {
      result[key] = value
    }
  }
  return result
}
type RangeFn = (begin: number, end: number, step?: number) => number[]
export const range: RangeFn = (begin, end, step = 1) => {
  if (begin > end) {
    const absStep = Math.abs(step)
    return range(end, begin, Math.abs(absStep)).reverse()
  }
  end = Math.floor(end / step)
  const len = end - begin + 1
  return Array(len)
    .fill(0)
    .map((_, i) => i * step + begin)
}

export const isWithinRange = (candidate: number, reference: number, offset: number) =>
  reference - offset <= candidate && candidate <= reference + offset

export const getCroppedRange = (rangeStart: number, rangeEnd: number, current: number, offset: number) =>
  range(rangeStart, rangeEnd).filter((it) => it === rangeStart || it === rangeEnd || isWithinRange(it, current, offset))

export const paginate = (current: number, last: number, delta = 2) => {
  if (last === 1) {
    return [1]
  }

  const left = current - delta
  const right = current + delta + 1
  const range: (number | null)[] = []

  for (let i = 1; i <= last; i++) {
    if (i === 1 || i === last || (i >= left && i < right)) {
      if (i === left && i > 2) {
        range.push(null)
      }
      range.push(i)
      if (i === right - 1 && i < last - 1) {
        range.push(null)
      }
    }
  }

  return range
}

export const normalize = <T, K extends keyof T>(items: T[], key: K): Record<string, T> =>
  items.reduce<Record<string, T>>((acc, item) => {
    const keyValue = item[key]
    if (keyValue != null) {
      acc[String(keyValue)] = item
    }
    return acc
  }, {})

export const addPropertyIfExists = <T, K extends keyof T>(obj: T, key: K, value: T[K] | undefined) => {
  if (value !== undefined) {
    return { ...obj, [key]: value }
  }
  return obj
}
