import { getCroppedRange, isWithinRange, normalize, paginate, range, removeEntriesByKey } from './iterator'

const baseObject = { a: 'b', c: 'd' }
const iterator = Object.entries(baseObject)

describe('iterators', () => {
  describe('removeEntriesByKey', () => {
    it('should return the same keys/values if no  matching keys are provided', () => {
      expect(removeEntriesByKey(iterator[Symbol.iterator](), ['x', 'd'])).toEqual(baseObject)
    })

    it('should return the same keys/values if no keys are provided', () => {
      expect(removeEntriesByKey(iterator[Symbol.iterator](), [])).toEqual(baseObject)
    })

    it('should filter out the keys provided', () => {
      expect(removeEntriesByKey(iterator[Symbol.iterator](), ['a'])).toEqual({ c: 'd' })
    })
  })

  describe('range', () => {
    it('should generate the array', () => {
      expect(range(1, 4)).toEqual([1, 2, 3, 4])
    })

    it('should generate the array with negatives', () => {
      expect(range(-1, 1)).toEqual([-1, 0, 1])
    })

    it('should generate the array with inverted range', () => {
      expect(range(1, -2)).toEqual([1, 0, -1, -2])
    })

    it('should generate the array with with positive step', () => {
      expect(range(1, 6, 2)).toEqual([1, 3, 5])
    })

    it('should generate the array with inverted range with negative step', () => {
      expect(range(4, 0, -2)).toEqual([4, 2, 0])
    })
  })
  describe('isWithinRange', () => {
    it('returns true when candidate within range', () => {
      expect(isWithinRange(9, 8, 1)).toBe(true)
    })
    it('returns false when candidate not within range', () => {
      expect(isWithinRange(9, 20, 3)).toBe(false)
    })
  })
  describe('getCroppedRange', () => {
    it('returns cropped range', () => {
      expect(getCroppedRange(1, 10, 5, 1)).toEqual([1, 4, 5, 6, 10])
      expect(getCroppedRange(1, 10, 5, 2)).toEqual([1, 3, 4, 5, 6, 7, 10])
    })
  })

  describe('paginate', () => {
    it('returns [1] when there is only one page', () => {
      expect(paginate(1, 1)).toEqual([1])
    })

    it('returns a sequential range when all pages fit within delta', () => {
      expect(paginate(3, 5)).toEqual([1, 2, 3, 4, 5])
    })

    it('includes page 1 and last page in the range', () => {
      expect(paginate(5, 10)).toContain(1)
      expect(paginate(5, 10)).toContain(10)
    })

    it('includes current page in the range', () => {
      expect(paginate(5, 10)).toContain(5)
    })

    it('returns nulls for skipped pages', () => {
      expect(paginate(5, 10)).toContain(null)
    })

    it('does not include negative numbers in the range', () => {
      expect(paginate(-1, 10)).not.toContain(-1)
    })

    it('does not include numbers greater than last page in the range', () => {
      expect(paginate(15, 10)).not.toContain(15)
    })

    it('returns the correct range with gaps depending on delta', () => {
      expect(paginate(1, 10)).toEqual([1, 2, 3, null, 10])
      expect(paginate(2, 10)).toEqual([1, 2, 3, 4, null, 10])
      expect(paginate(3, 10)).toEqual([1, 2, 3, 4, 5, null, 10])
      expect(paginate(4, 10)).toEqual([1, 2, 3, 4, 5, 6, null, 10])
      expect(paginate(5, 10)).toEqual([1, null, 3, 4, 5, 6, 7, null, 10])
      expect(paginate(6, 10)).toEqual([1, null, 4, 5, 6, 7, 8, null, 10])
      expect(paginate(7, 10)).toEqual([1, null, 5, 6, 7, 8, 9, 10])
      expect(paginate(8, 10)).toEqual([1, null, 6, 7, 8, 9, 10])
      expect(paginate(9, 10)).toEqual([1, null, 7, 8, 9, 10])
      expect(paginate(10, 10)).toEqual([1, null, 8, 9, 10])
      expect(paginate(1, 10, 3)).toEqual([1, 2, 3, 4, null, 10])
      expect(paginate(1, 10, 4)).toEqual([1, 2, 3, 4, 5, null, 10])
      expect(paginate(1, 10, 5)).toEqual([1, 2, 3, 4, 5, 6, null, 10])
      expect(paginate(1, 10, 6)).toEqual([1, 2, 3, 4, 5, 6, 7, null, 10])
      expect(paginate(1, 10, 7)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, null, 10])
      expect(paginate(1, 10, 8)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
      expect(paginate(1, 10, 9)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
      expect(paginate(1, 10, 10)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    })
  })

  describe('normalize', () => {
    it('normalizes an array of objects using a given key', () => {
      const users = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' },
      ]

      const result = normalize(users, 'id')
      expect(result).toEqual({
        '1': { id: 1, name: 'Alice' },
        '2': { id: 2, name: 'Bob' },
        '3': { id: 3, name: 'Charlie' },
      })
    })

    it('handles keys with non-string values and convert them to strings', () => {
      const users = [
        { id: 10, name: 'David' },
        { id: 20, name: 'Eve' },
      ]

      const result = normalize(users, 'id')
      expect(result).toEqual({
        '10': { id: 10, name: 'David' },
        '20': { id: 20, name: 'Eve' },
      })
    })

    it('skips objects with null or undefined key values', () => {
      const products = [
        { sku: 'A123', price: 100 },
        { sku: null, price: 200 },
        { sku: 'B456', price: 150 },
      ]

      const result = normalize(products, 'sku')
      expect(result).toEqual({
        A123: { sku: 'A123', price: 100 },
        B456: { sku: 'B456', price: 150 },
      })
    })

    it('overwrites duplicate keys with the last object in the array', () => {
      const users = [
        { id: 1, name: 'Alice' },
        { id: 1, name: 'Alice Duplicate' }, // Duplicate key
        { id: 2, name: 'Bob' },
      ]

      const result = normalize(users, 'id')
      expect(result).toEqual({
        '1': { id: 1, name: 'Alice Duplicate' }, // Last entry for id 1 wins
        '2': { id: 2, name: 'Bob' },
      })
    })

    it('returns an empty object when the input array is empty', () => {
      const result = normalize([], 'id')
      expect(result).toEqual({})
    })
  })
})
