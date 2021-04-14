const { expect } = require('@jest/globals')
const holdem = require('./holdem')

test('Check all suits are same', () => {
    expect(holdem.checkAllEqual(['S', 'S', 'S', 'S', 'S'])).toBe(true)
})

test('Check if all faces are same', () => {
    expect(holdem.checkAllEqual([8, 8, 8, 8, 8])).toBe(true)
})

test('Check if suits are different', () => {
    expect(holdem.checkAllEqual(['S', 'S', 'C', 'S', 'D'])).toBe(false)
})

test('Check if all faces are different', () => {
    expect(holdem.checkAllEqual([8, 8, 7, 8, 8])).toBe(false)
})

test('Count Occurrence set 1', () => {
    expect(holdem.countOccurrence([2, 3, 4, 5, 8])).toStrictEqual({ '2': 1, '3': 1, '4': 1, '5': 1, '8': 1 })
})

test('Count Occurrence set 2', () => {
    expect(holdem.countOccurrence([5, 5, 5])).toStrictEqual({ '5': 3 })
})

test('Count Occurrence set 3', () => {
    expect(holdem.countOccurrence([2, 2, 3, 6, 7, 7])).toStrictEqual({ '2': 2, '3': 1, '6': 1, '7': 2 })
})

test('Is Pair Present', () => {
    expect(holdem.isPairPresent([2, 2, 3, 6, 7, 7])).toBe(true)
})

test('Is Three of a Kind Present', () => {
    expect(holdem.isThreeOfAKindPresent([2, 2, 3, 6, 7, 7])).toBe(false)
})

