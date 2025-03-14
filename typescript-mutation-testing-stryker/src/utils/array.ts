export const hasSameValue = <T>(arr1: T[] = [], arr2: T[] = []): boolean => arr1.some((item) => arr2.includes(item))

export const toArray = <T>(candidate: T | T[] | undefined | null) => {
  if (typeof candidate === 'undefined' || candidate === null) {
    return []
  }
  if (Array.isArray(candidate)) {
    return candidate
  }
  return [candidate]
}
