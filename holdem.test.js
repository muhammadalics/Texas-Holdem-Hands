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

test('Count occurrence set 1', () => {
    expect(holdem.countOccurrence([2, 3, 4, 5, 8])).toStrictEqual({ '2': 1, '3': 1, '4': 1, '5': 1, '8': 1 })
})

test('Count occurrence set 2', () => {
    expect(holdem.countOccurrence([5, 5, 5])).toStrictEqual({ '5': 3 })
})

test('Count occurrence set 3', () => {
    expect(holdem.countOccurrence([2, 2, 3, 6, 7])).toStrictEqual({ '2': 2, '3': 1, '6': 1, '7': 1 })
})

test('Is pair present ?', () => {
    expect(holdem.isPairPresent([2, 2, 6, 7, 7])).toBe(true)
})

test('Is pair present ?', () => {
    expect(holdem.isPairPresent([2, 4, 3, 6, 8])).toBe(false)
})

test('Is three of a kind present', () => {
    expect(holdem.isThreeOfAKindPresent([2, 3, 6, 7, 7])).toBe(false)
})

test('Is three of a kind present', () => {
    expect(holdem.isThreeOfAKindPresent([2, 2, 2, 6, 7])).toBe(true)
})

test('Is four of a kind present ?', () => {
    expect(holdem.isFourOfAKindPresent([6, 6, 6, 6, 7])).toBe(true)
})

test('Is four of a kind present ?', () => {
    expect(holdem.isFourOfAKindPresent([6, 7, 2, 6, 7])).toBe(false)
})

test('Are two pairs present ?', () => {
    expect(holdem.twoPairsPresent([6, 7, 2, 6, 7])).toBe(true)
})

test('Are two pairs present ?', () => {
    expect(holdem.twoPairsPresent([6, 7, 7, 6, 7])).toBe(false)
})

test('Are two pairs present ?', () => {
    expect(holdem.twoPairsPresent([7, 7, 7, 7, 7])).toBe(false)
})

test('Are two pairs present ?', () => {
    expect(holdem.twoPairsPresent([9, 9, 2, 2, 2])).toBe(false)
})

test('Are numbers in sequence ?', () => {
    expect(holdem.areNumbersInSequence([4, 6, 8, 7, 5])).toBe(true)
})

test('Are numbers in sequence ?', () => {
    expect(holdem.areNumbersInSequence([2, 3, 3, 4, 5])).toBe(false)
})

test('Are numbers in sequence ?', () => {
    expect(holdem.areNumbersInSequence([2, 3, 7, 4, 5])).toBe(false)
})

test('Are numbers in sequence ?', () => {
    expect(holdem.areNumbersInSequence([1, 3, 7, 4, 5])).toBe(false)
})
