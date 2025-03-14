import {
  arrayBufferToBase64Url,
  cleanComment,
  cleanHtmlTags,
  cleanSpacesAndLineBreaks,
  cleanTextAll,
  cleanTextDoubleQuotes,
  escapeRegEx,
  formatReadOnlyMentions,
  generateQueryParams,
  generateRandomStr,
  isString,
  limitList,
  listToString,
  pluralize,
  processText,
  simpleNumber,
  toBase64url,
  truncateChars,
  truncateWords,
} from './string'

describe('String Utils', () => {
  describe('truncateChars', () => {
    test('truncates the string at char 10 by default', () => {
      expect(truncateChars('123456789-12345')).toEqual('123456789- ...')
    })
    test('does not truncate if string shorter', () => {
      expect(truncateChars('12345')).toEqual('12345')
    })
    test('truncates based on new size', () => {
      expect(truncateChars('12345', 1)).toEqual('1 ...')
    })
    test('defaults return empty string', () => {
      expect(truncateChars('')).toMatch('')
    })
    test('undefined return empty string', () => {
      expect(truncateChars()).toMatch('')
    })
  })

  describe('cleanHtmlTags', () => {
    test('cleans all html tags from string', () => {
      expect(cleanHtmlTags('<span>hello<br></span>')).toEqual('hello')
    })
    test('nothing to replace returns same string', () => {
      expect(cleanTextDoubleQuotes('hello')).toEqual('hello')
    })
    test('defaults return empty string', () => {
      expect(cleanHtmlTags('')).toMatch('')
    })
    test('undefined return empty string', () => {
      expect(cleanHtmlTags()).toMatch('')
    })
  })

  describe('cleanTextDoubleQuotes', () => {
    test('cleans all double quotes from string', () => {
      expect(cleanTextDoubleQuotes('"asd""sec""123""321"')).toEqual(`'asd''sec''123''321'`)
    })
    test('nothing to replace returns same string', () => {
      expect(cleanTextDoubleQuotes('no double-quotes here!')).toEqual('no double-quotes here!')
    })
    test('defaults return empty string', () => {
      expect(cleanTextDoubleQuotes('')).toEqual('')
    })
    test('undefined return empty string', () => {
      expect(cleanTextDoubleQuotes()).toEqual('')
    })
  })

  describe('cleanSpacesAndLineBreaks', () => {
    test('cleans all line breaks from string', () => {
      expect(
        cleanSpacesAndLineBreaks(`Hello
      
      multiple breaks
      
      
      
      
                
      yes.`)
      ).toEqual('Hello multiple breaks yes.')
    })
    test('defaults return empty string', () => {
      expect(cleanSpacesAndLineBreaks('')).toEqual('')
    })
    test('undefined return empty string', () => {
      expect(cleanSpacesAndLineBreaks()).toEqual('')
    })
  })

  describe('cleanTextAll', () => {
    test('cleans all line breaks from string', () => {
      expect(
        cleanTextAll(`<h1>"Hello"</h1>
      
      <p>multiple breaks</p>
      <br>
      <br/>
      
      
      
                
      <aside>yes.</aside>`)
      ).toEqual(`'Hello' multiple breaks yes.`)
    })
    test('nothing to replace returns same string', () => {
      expect(cleanTextAll('Nothing to replace')).toEqual('Nothing to replace')
    })
    test('defaults return empty string', () => {
      expect(cleanTextAll('')).toEqual('')
    })
    test('undefined return empty string', () => {
      expect(cleanTextAll()).toEqual('')
    })
  })

  describe('simpleNumber', () => {
    test('transform the number in a simplified form', () => {
      expect(simpleNumber(12_000)).toEqual('12k')
    })
    test('transform the number in a simplified form with decimal point too', () => {
      expect(simpleNumber(12_531)).toEqual('12.5k')
    })
    test('returns same number when smaller than 1000', () => {
      expect(simpleNumber(999)).toEqual('999')
    })
    test('undefined return 0 string', () => {
      expect(simpleNumber()).toEqual('0')
    })
  })

  describe('pluralize', () => {
    test('returns the plural form, adding an "s",  when there is more than 1 or -1 quantity', () => {
      expect(pluralize(2, 'comment')).toEqual('comments')
    })
    test('returns the plural form, based on parameter, when there is more than 1 or -1 quantity', () => {
      expect(pluralize(2, 'cactus', 'cacti')).toEqual('cacti')
    })
    test('returns the singular form, when there is 1 as quantity', () => {
      expect(pluralize(1, 'comment')).toEqual('comment')
    })
    test('returns the singular form, when there is -1 as quantity', () => {
      expect(pluralize(-1, 'comment')).toEqual('comment')
    })

    test('returns the plural form, adding an "s",  when there is 0 as quantity', () => {
      expect(pluralize(0, 'comment')).toEqual('comments')
    })

    test('returns empty string when empty singular', () => {
      expect(pluralize(1, '')).toEqual('')
    })
  })

  describe('cleanComment', () => {
    test('replaces all line breaks with <br> and remove html tags', () => {
      expect(
        cleanComment(`<h1>"Hello"</h1>
      
      <p>multiple breaks</p>
      
      
      
      
                
      <aside>yes.</aside>`)
      ).toEqual(
        '"Hello"<br>      <br>      multiple breaks<br>      <br>      <br>      <br>      <br>                <br>      yes.'
      )
    })
    test('defaults return empty string', () => {
      expect(cleanComment('')).toEqual('')
    })
    test('undefined return empty string', () => {
      expect(cleanComment()).toEqual('')
    })
    test('prevent XSS', () => {
      expect(cleanComment('Bla bla <img onerror="alert(1)" />')).toEqual('Bla bla ')
    })
    test('replaces backslash', () => {
      expect(cleanComment('copy\\paste')).toEqual('copy/paste')
    })
  })

  describe('generateRandomStr', () => {
    test('returns a random string of 43 chars by default', () => {
      expect(generateRandomStr().length).toEqual(43)
    })
    test('returns empty string when length is 0', () => {
      expect(generateRandomStr(0, '')).toEqual('')
    })
    test('returns random string of length specified', () => {
      expect(generateRandomStr(10).length).toEqual(10)
    })
    test('returns string of length specified, and the charset defined', () => {
      expect(generateRandomStr(5, 'a')).toEqual('aaaaa')
    })
  })

  describe('generateQueryParams', () => {
    test('returns a empty string by default', () => {
      expect(generateQueryParams()).toEqual('')
    })
    test('returns empty string with array', () => {
      expect(generateQueryParams([])).toEqual('')
    })
    test('ignores the null or undefined properties', () => {
      expect(generateQueryParams({ hello: null, world: undefined })).toEqual('')
    })
    test('generates the query params after cleaning invalid properties', () => {
      expect(generateQueryParams({ hi: null, wo: undefined, ba: 1 })).toEqual('?ba=1')
    })
    test('generates the query params with specified prefix', () => {
      expect(generateQueryParams({ ba: 1, be: 'hello<>' }, '&')).toEqual('&ba=1&be=hello%3C%3E')
    })
    test('generates the query params with multiple values', () => {
      expect(generateQueryParams({ ba: 1, be: ['hello', 'world'] })).toEqual('?ba=1&be=hello%2Cworld')
    })
    test('generates the query params with multiple values', () => {
      expect(generateQueryParams({ user: 'John Doe', 'email@domain': 'test@test.com' })).toEqual(
        '?user=John+Doe&email%40domain=test%40test.com'
      )
    })
  })

  describe('toBase64url', () => {
    test('returns empty string by default', () => {
      expect(toBase64url()).toEqual('')
    })
    test('returns the base64 url compliant string', () => {
      expect(toBase64url('asda+/dasda==')).toEqual('asda-_dasda')
    })
  })

  describe('truncateWords', () => {
    const text = 'a long text that needs to be sliced'

    it('returns the original string if is shorter than expected', () => {
      expect(truncateWords(text, text.length - 2)).toEqual(text)
    })

    it('returns the slice string if is longer than expected', () => {
      expect(truncateWords(text, 5)).toEqual('a long...')
      expect(truncateWords(text, 8)).toEqual('a long text...')
    })

    it('cleans up leading whitespaces', () => {
      expect(truncateWords(text, 7)).toEqual('a long...')
    })

    it('should always return an empty string if input is undefined', () => {
      const undefinedValue: unknown = undefined
      const nullValue: unknown = null
      expect(truncateWords(undefinedValue as string, 100)).toEqual('')
      expect(truncateWords(nullValue as string, 100)).toEqual('')
    })
  })
})

describe('listToString', () => {
  it('returns an empty string for an empty array', () => {
    expect(listToString([])).toBe('')
  })

  it('returns an empty string for an undefined array', () => {
    expect(listToString(undefined as unknown as [])).toBe('')
  })

  it('returns a single item string for an array with one item', () => {
    expect(listToString(['Item 1'])).toBe('Item 1')
  })

  it('returns two items joined with "and"', () => {
    expect(listToString(['Item 1', 'Item 2'])).toBe('Item 1 and Item 2')
  })

  it('returns multiple items joined with commas and end with "and"', () => {
    expect(listToString(['Item 1', 'Item 2', 'Item 3'])).toBe('Item 1, Item 2 and Item 3')
  })

  it('should handle trailing spaces in department names', () => {
    const result = listToString(['Item 1 ', ' Item 2 ', ' Item 3 '])
    expect(result).toBe('Item 1, Item 2 and Item 3')
  })
})

describe('limitList', () => {
  const items = ['1', '2', '3', '4']
  it('returns the original array if limit is undefined or falsy', () => {
    expect(limitList(items, undefined as unknown as number)).toEqual(items)
    expect(limitList(items, null as unknown as number)).toEqual(items)
    expect(limitList(items, 0)).toEqual(items)
  })

  it('returns the original array if limit is negative', () => {
    expect(limitList(items, -1)).toEqual(items)
  })

  it('returns the original array if limit is greater than or equal to the list length', () => {
    expect(limitList(items, 4)).toEqual(items)
  })

  it('returns and empty array if the list is empty', () => {
    expect(limitList([], 2)).toEqual([])
  })

  it('includes "more" in the result', () => {
    expect(limitList(items, 1)).toEqual(['4 more'])
    expect(limitList(items, 2)).toEqual(['1', '3 more'])
    expect(limitList(items, 3)).toEqual(['1', '2', '2 more'])
  })
  it('returns empty array on default', () => {
    expect(limitList()).toEqual([])
  })
})

describe('isString', () => {
  it('returns true for a string', () => {
    expect(isString('hello')).toBe(true)
    expect(isString('123')).toBe(true)
  })

  it('returns false for any other type', () => {
    expect(isString(123)).toBe(false)
    expect(isString({ key: 'value' })).toBe(false)
    expect(isString(['a', 'b', 'c'])).toBe(false)
    expect(isString(null)).toBe(false)
    expect(isString(undefined)).toBe(false)
  })
})

describe('arrayBufferToBase64Url', () => {
  it('converts an ArrayBuffer to a Base64 URL-safe string', () => {
    const buffer = new Uint8Array([72, 101, 108, 108, 111]).buffer // "Hello" in UTF-8
    const result = arrayBufferToBase64Url(buffer)
    expect(result).toBe('SGVsbG8')
  })

  it('handles an empty ArrayBuffer', () => {
    const buffer = new ArrayBuffer(0)
    const result = arrayBufferToBase64Url(buffer)
    expect(result).toBe('')
  })
})

describe('escapeRegExp', () => {
  it('escapes all special characters used in regular expressions', () => {
    const input = '-[]/{}()*+?.\\^$|'
    const expectedOutput = '\\-\\[\\]\\/\\{\\}\\(\\)\\*\\+\\?\\.\\\\\\^\\$\\|'
    expect(escapeRegEx(input)).toBe(expectedOutput)
  })

  it('does not alter strings without special characters', () => {
    const input = 'HelloWorld'
    const expectedOutput = 'HelloWorld'
    expect(escapeRegEx(input)).toBe(expectedOutput)
  })

  it('escapes mixed content', () => {
    const input = 'Hello. How are you?'
    const expectedOutput = 'Hello\\. How are you\\?'
    expect(escapeRegEx(input)).toBe(expectedOutput)
  })

  it('properly escapes backslashes', () => {
    const input = '\\\\'
    const expectedOutput = '\\\\\\\\' // Escaped backslashes
    expect(escapeRegEx(input)).toBe(expectedOutput)
  })

  it('handles empty strings', () => {
    const input = ''
    const expectedOutput = ''
    expect(escapeRegEx(input)).toBe(expectedOutput)
  })

  it('handles strings with only special characters', () => {
    const input = '^$*+?.()|{}[]'
    const expectedOutput = '\\^\\$\\*\\+\\?\\.\\(\\)\\|\\{\\}\\[\\]'
    expect(escapeRegEx(input)).toBe(expectedOutput)
  })
})

describe('processText', () => {
  it('replaces mention tag with styled span', () => {
    const input = 'test mention <mention id="123" displayname="Test User"></mention>'
    const expectedOutput = 'test mention <span style="font-weight:500">Test User</span>'
    expect(processText(input)).toBe(expectedOutput)
  })

  it('replaces multiple mentions within input string', () => {
    const input =
      'test mention <mention id="123" displayname="Test User"></mention> and <mention id="456" displayname="Another Test User"></mention>'
    const expectedOutput =
      'test mention <span style="font-weight:500">Test User</span> and <span style="font-weight:500">Another Test User</span>'
    expect(processText(input)).toBe(expectedOutput)
  })

  it('returns original string when mention is not present', () => {
    const input = 'test without mention'
    const expectedOutput = 'test without mention'
    expect(processText(input)).toBe(expectedOutput)
  })
})

describe('formatReadOnlyMentions', () => {
  it('replaces a mention with a styled span', () => {
    const input = 'test mention <mention id="123" displayname="Test User"></mention>'
    const expectedOutput = 'test mention <span style="font-weight:500">Test User</span>'
    expect(formatReadOnlyMentions(input)).toBe(expectedOutput)
  })

  it('replaces multiple mentions within input string', () => {
    const input =
      'test mention <mention id="123" displayname="Test User"></mention> and <mention id="123" displayname="Another Test User"></mention>'
    const expectedOutput =
      'test mention <span style="font-weight:500">Test User</span> and <span style="font-weight:500">Another Test User</span>'
    expect(formatReadOnlyMentions(input)).toBe(expectedOutput)
  })

  it('returns original string when mention is not present', () => {
    const input = 'test without mention'
    const expectedOutput = 'test without mention'
    expect(formatReadOnlyMentions(input)).toBe(expectedOutput)
  })
})
