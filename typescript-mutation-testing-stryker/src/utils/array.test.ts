import { hasSameValue, toArray } from './array'

describe('Array Utils', () => {
  describe('hasSameValue', () => {
    it('shoud not have same value if both arrays are empty', () => {
      expect(hasSameValue([], [])).toBe(false)
    })
    it('shoud not have same value if one array is empty', () => {
      expect(hasSameValue([1, 5, 7], [])).toBe(false)
    })
    it('shoud not have same value if number in the array is the same', () => {
      expect(hasSameValue([1, 5, 7], [3, 6, 8])).toBe(false)
    })
    it('shoud have same value if one number in the array is the same', () => {
      expect(hasSameValue([1, 5, 7], [7, 6, 8])).toBe(true)
    })
    it('with defaults', () => {
      expect(hasSameValue()).toBe(false)
    })
  })
  describe('toArray', () => {
    it('returns empty array with undefined', () => {
      expect(toArray(undefined)).toEqual([])
    })
    it('returns empty array with null', () => {
      expect(toArray(null)).toEqual([])
    })
    it('returns the same array when called with an array', () => {
      const arr = [1, 2, 3]
      expect(toArray(arr)).toEqual(arr)
    })
    it('returns an array when called with a single element', () => {
      expect(toArray(1)).toEqual([1])
    })
  })
})
