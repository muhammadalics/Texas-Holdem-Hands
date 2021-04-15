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
    expect(holdem.twoPairsPresent(['A', 'J', 'A', 6, 'J'])).toBe(true)
})

test('Are two pairs present ?', () => {
    expect(holdem.twoPairsPresent([5, 'J', 5, 6, 'J'])).toBe(true)
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

test('Are faces translated to numbers properly?', () => {
    expect(holdem.convertFacesToNumeric([1, 3, 'K', 4, 5])).toStrictEqual([1, 3, 13, 4, 5])
})

test('Is Queen translated to 12?', () => {
    expect(holdem.convertFacesToNumeric([1, 'Q', 5, 4, 5])).toStrictEqual([1, 12, 5, 4, 5])
})

test('Is Ace translated to 14?', () => {
    expect(holdem.convertFacesToNumeric([1, 3, 'A', 4, 5])).toStrictEqual([1, 3, 14, 4, 5])
})

test('Is T translated to 10?', () => {
    expect(holdem.convertFacesToNumeric(['T', 3, 2, 4, 5])).toStrictEqual([10, 3, 2, 4, 5])
})

test('Is joker translated to 11?', () => {
    expect(holdem.convertFacesToNumeric([1, 3, 1, 4, 'J'])).toStrictEqual([1, 3, 1, 4, 11])
})

test('Are faces translated to numbers properly?', () => {
    expect(holdem.convertFacesToNumeric(['Q', 'J', 'K', 'A', 'T'])).toStrictEqual([12, 11, 13, 14, 10])
})

test('Are Arrays Equal?', () => {
    expect(holdem.areArraysEqual([1, 1, 1, 1, 1], [1, 1, 1, 1, 1])).toBe(true)
})

test('Are Arrays Equal?', () => {
    expect(holdem.areArraysEqual([8, 8, 8, 8, 8], [8, 8, 8, 8, 8])).toBe(true)
})

test('Are Arrays Equal?', () => {
    expect(holdem.areArraysEqual([1, 3, 1, 5, 1], [1, 1, 1, 1, 1])).toBe(false)
})

test('Are Arrays Equal?', () => {
    expect(holdem.areArraysEqual([5, 5, 5, 5, 5], [1, 1, 1, 1, 1])).toBe(false)
})

test('Is this Royal Flush?', () => {
    expect(holdem.isRoyalFlush(['H', 'S', 'D', 'C', 'H'], ['Q', 'J', 'K', 'A', 'T'])).toBe(false)
})

test('Is this Royal Flush?', () => {
    expect(holdem.isRoyalFlush(['H', 'H', 'H', 'H', 'H'], ['Q', 'J', 'K', 'A', 'T'])).toBe(true)
})

test('Is this Royal Flush?', () => {
    expect(holdem.isRoyalFlush(['S', 'S', 'S', 'S', 'S'], ['Q', 'J', 'K', 'A', 'T'])).toBe(true)
})

test('Is this Royal Flush?', () => {
    expect(holdem.isRoyalFlush(['D', 'D', 'D', 'D', 'D'], ['Q', 'J', 'K', 'A', 'T'])).toBe(true)
})

test('Is this Straight Flush?', () => {
    expect(holdem.isStraightFlush(['D', 'D', 'D', 'D', 'D'], ['Q', 'J', 'K', 'A', 'T'])).toBe(false) //this is royal flush
})

test('Is this Straight Flush?', () => {
    expect(holdem.isStraightFlush(['D', 'D', 'D', 'D', 'D'], ['Q', 'J', 'K', 9, 'T'])).toBe(true) //straight flush
})

test('Is this Straight Flush?', () => {
    expect(holdem.isStraightFlush(['C', 'D', 'D', 'D', 'S'], [2, 2, 'K', 9, 'T'])).toBe(false) //pair
})

test('Is this Straight Flush?', () => {
    expect(holdem.isStraightFlush(['C', 'D', 'D', 'D', 'H'], [2, 2, 9, 9, 'T'])).toBe(false) //two pair
})

test('Is this Straight Flush?', () => {
    expect(holdem.isStraightFlush(['C', 'D', 'D', 'S', 'H'], [2, 2, 9, 9, 9])).toBe(false) //three of a kind
})

test('Is this Straight Flush?', () => {
    expect(holdem.isStraightFlush(['C', 'D', 'D', 'S', 'H'], ['A', 3, 4, 2, 5])).toBe(false) //straight
})

test('Is this Straight Flush?', () => {
    expect(holdem.isStraightFlush(['C', 'D', 'D', 'S', 'H'], ['A', 'J', 'Q', 'K', 'T'])).toBe(false) //straight
})

test('Is this Straight Flush?', () => {
    expect(holdem.isStraightFlush(['D', 'D', 'D', 'D', 'D'], ['A', 5, 2, 'K', 'T'])).toBe(false) //flush
})

test('Is this Straight Flush?', () => {
    expect(holdem.isStraightFlush(['D', 'D', 'D', 'D', 'D'], [7, 5, 2, 'A', 'Q'])).toBe(false) //flush
})

test('Is this Straight Flush?', () => {
    expect(holdem.isStraightFlush(['S', 'D', 'C', 'H', 'D'], [7, 7, 7, 2, 2])).toBe(false) //full house
})

test('Is this Straight Flush?', () => {
    expect(holdem.isStraightFlush(['S', 'D', 'C', 'H', 'D'], [7, 7, 7, 7, 2])).toBe(false) //four of a kind
})




test('Is this four of a kind?', () => {
    expect(holdem.isFourOfAKindPresent(['Q', 'J', 'K', 'A', 'T'])).toBe(false)
})

test('Is this four of a kind?', () => {
    expect(holdem.isFourOfAKindPresent(['Q', 'J', 'K', 9, 'T'])).toBe(false)
})

test('Is this four of a kind?', () => {
    expect(holdem.isFourOfAKindPresent([2, 2, 'K', 9, 'T'])).toBe(false)
})

test('Is this four of a kind?', () => {
    expect(holdem.isFourOfAKindPresent([2, 2, 9, 9, 'T'])).toBe(false)
})

test('Is this four of a kind?', () => {
    expect(holdem.isFourOfAKindPresent([2, 2, 9, 9, 9])).toBe(false)
})

test('Is this four of a kind?', () => {
    expect(holdem.isFourOfAKindPresent(['A', 3, 4, 2, 5])).toBe(false)
})

test('Is this four of a kind?', () => {
    expect(holdem.isFourOfAKindPresent(['A', 'J', 'Q', 'K', 'T'])).toBe(false)
})

test('Is this four of a kind?', () => {
    expect(holdem.isFourOfAKindPresent(['A', 5, 2, 'K', 'T'])).toBe(false)
})

test('Is this four of a kind?', () => {
    expect(holdem.isFourOfAKindPresent([7, 5, 2, 'A', 'Q'])).toBe(false)
})

test('Is this four of a kind?', () => {
    expect(holdem.isFourOfAKindPresent([7, 7, 7, 2, 2])).toBe(false)
})

test('Is this four of a kind?', () => {
    expect(holdem.isFourOfAKindPresent([7, 7, 7, 7, 2])).toBe(true)
})





test('Is this full house?', () => {
    expect(holdem.isFullHouse(['Q', 'J', 'K', 'A', 'T'])).toBe(false)
})

test('Is this full house?', () => {
    expect(holdem.isFullHouse(['Q', 'J', 'K', 9, 'T'])).toBe(false)
})

test('Is this full house?', () => {
    expect(holdem.isFullHouse([2, 2, 'K', 9, 'T'])).toBe(false)
})

test('Is this full house?', () => {
    expect(holdem.isFullHouse([2, 2, 9, 9, 'T'])).toBe(false)
})

test('Is this full house?', () => {
    expect(holdem.isFullHouse([2, 2, 9, 9, 9])).toBe(true) //full house
})

test('Is this full house?', () => {
    expect(holdem.isFullHouse(['A', 3, 4, 2, 5])).toBe(false)
})

test('Is this full house?', () => {
    expect(holdem.isFullHouse(['A', 'J', 'Q', 'K', 'T'])).toBe(false)
})

test('Is this full house?', () => {
    expect(holdem.isFullHouse(['A', 5, 2, 'K', 'T'])).toBe(false)
})

test('Is this full house?', () => {
    expect(holdem.isFullHouse([7, 5, 2, 'A', 'Q'])).toBe(false)
})

test('Is this full house?', () => {
    expect(holdem.isFullHouse([7, 7, 7, 2, 2])).toBe(true) //full house 
})

test('Is this full house?', () => {
    expect(holdem.isFullHouse([7, 7, 7, 7, 2])).toBe(false)
})

test('Is this full house?', () => {
    expect(holdem.isFullHouse([7, 7, 7, 'Q', 'Q'])).toBe(true) //full house
})

test('Is this full house?', () => {
    expect(holdem.isFullHouse(['Q', 'Q', 'Q', 2, 2])).toBe(true) //full house
})

test('Is this full house?', () => {
    expect(holdem.isFullHouse(['Q', 'Q', 'Q', 'A', 'A'])).toBe(true) //full house
})

test('Is this full house?', () => {
    expect(holdem.isFullHouse(['A', 'A', 'A', 'Q', 'Q'])).toBe(true) //full house
})

test('Is this full house?', () => {
    expect(holdem.isFullHouse(['A', 'A', 'A', 5, 5])).toBe(true) //full house
})

test('Is this full house?', () => {
    expect(holdem.isFullHouse([8, 8, 8, 'A', 'A'])).toBe(true) //full house
})



test('Is this Flush?', () => {
    expect(holdem.isFlush(['H', 'S', 'D', 'C', 'H'], ['Q', 'J', 'K', 'A', 'T'])).toBe(false)
})

test('Is this Flush?', () => {
    expect(holdem.isFlush(['H', 'H', 'H', 'H', 'H'], ['Q', 'J', 'K', 'A', 'T'])).toBe(false) //royal flush
})

test('Is this Flush?', () => {
    expect(holdem.isFlush(['S', 'S', 'S', 'S', 'S'], ['Q', 'J', 'K', 'A', 'T'])).toBe(false) //royal flush
})

test('Is this Flush?', () => {
    expect(holdem.isFlush(['D', 'D', 'D', 'D', 'D'], ['Q', 'J', 'K', 'A', 'T'])).toBe(false) //royal flush
})

test('Is this Flush?', () => {
    expect(holdem.isFlush(['D', 'D', 'D', 'D', 'D'], ['Q', 'J', 'K', 'A', 'T'])).toBe(false) //this is royal flush
})

test('Is this Flush?', () => {
    expect(holdem.isFlush(['D', 'D', 'D', 'D', 'D'], ['Q', 'J', 'K', 9, 'T'])).toBe(false) //straight flush
})

test('Is this Flush?', () => {
    expect(holdem.isFlush(['C', 'D', 'D', 'D', 'S'], [2, 2, 'K', 9, 'T'])).toBe(false) //pair
})

test('Is this Flush?', () => {
    expect(holdem.isFlush(['C', 'D', 'D', 'D', 'H'], [2, 2, 9, 9, 'T'])).toBe(false) //two pair
})

test('Is this Flush?', () => {
    expect(holdem.isFlush(['C', 'D', 'D', 'S', 'H'], [2, 2, 9, 9, 9])).toBe(false) //three of a kind
})

test('Is this Flush?', () => {
    expect(holdem.isFlush(['C', 'D', 'D', 'S', 'H'], ['A', 3, 4, 2, 5])).toBe(false) //straight
})

test('Is this Flush?', () => {
    expect(holdem.isFlush(['C', 'D', 'D', 'S', 'H'], ['A', 'J', 'Q', 'K', 'T'])).toBe(false) //straight
})

test('Is this Flush?', () => {
    expect(holdem.isFlush(['D', 'D', 'D', 'D', 'D'], ['A', 5, 2, 'K', 'T'])).toBe(true) //flush
})

test('Is this Flush?', () => {
    expect(holdem.isFlush(['D', 'D', 'D', 'D', 'D'], [7, 5, 2, 'A', 'Q'])).toBe(true) //flush
})

test('Is this Flush?', () => {
    expect(holdem.isFlush(['S', 'D', 'C', 'H', 'D'], [7, 7, 7, 2, 2])).toBe(false) //full house
})

test('Is this Flush?', () => {
    expect(holdem.isFlush(['S', 'D', 'C', 'H', 'D'], [7, 7, 7, 7, 2])).toBe(false) //four of a kind
})








test('Is this Straight?', () => {
    expect(holdem.isStraight(['H', 'S', 'D', 'C', 'H'], ['Q', 'J', 'K', 'A', 'T'])).toBe(true)
})

test('Is this Straight?', () => {
    expect(holdem.isStraight(['H', 'H', 'H', 'H', 'H'], ['Q', 'J', 'K', 'A', 'T'])).toBe(false) //royal flush
})

test('Is this Straight?', () => {
    expect(holdem.isStraight(['S', 'S', 'S', 'S', 'S'], ['Q', 'J', 'K', 'A', 'T'])).toBe(false) //royal flush
})

test('Is this Straight?', () => {
    expect(holdem.isStraight(['D', 'D', 'D', 'D', 'D'], ['Q', 'J', 'K', 'A', 'T'])).toBe(false) //royal flush
})

test('Is this Straight?', () => {
    expect(holdem.isStraight(['D', 'D', 'D', 'D', 'D'], ['Q', 'J', 'K', 'A', 'T'])).toBe(false) //this is royal flush
})

test('Is this Straight?', () => {
    expect(holdem.isStraight(['D', 'D', 'D', 'D', 'D'], ['Q', 'J', 'K', 9, 'T'])).toBe(false) //straight flush
})

test('Is this Straight?', () => {
    expect(holdem.isStraight(['C', 'D', 'D', 'D', 'S'], [2, 2, 'K', 9, 'T'])).toBe(false) //pair
})

test('Is this Straight?', () => {
    expect(holdem.isStraight(['C', 'D', 'D', 'D', 'H'], [2, 2, 9, 9, 'T'])).toBe(false) //two pair
})

test('Is this Straight?', () => {
    expect(holdem.isStraight(['C', 'D', 'D', 'S', 'H'], [2, 2, 9, 9, 9])).toBe(false) //three of a kind
})

test('Is this Straight?', () => {
    expect(holdem.isStraight(['C', 'D', 'D', 'S', 'H'], ['A', 3, 4, 2, 5])).toBe(true) //straight
})

test('Is this Straight?', () => {
    expect(holdem.isStraight(['C', 'D', 'D', 'S', 'H'], ['A', 'J', 'Q', 'K', 'T'])).toBe(true) //straight
})

test('Is this Straight?', () => {
    expect(holdem.isStraight(['D', 'D', 'D', 'D', 'D'], ['A', 5, 2, 'K', 'T'])).toBe(false) //flush
})

test('Is this Straight?', () => {
    expect(holdem.isStraight(['D', 'D', 'D', 'D', 'D'], [7, 5, 2, 'A', 'Q'])).toBe(false) //flush
})

test('Is this Straight?', () => {
    expect(holdem.isStraight(['S', 'D', 'C', 'H', 'D'], [7, 7, 7, 2, 2])).toBe(false) //full house
})

test('Is this Straight?', () => {
    expect(holdem.isStraight(['S', 'D', 'C', 'H', 'D'], [7, 7, 7, 7, 2])).toBe(false) //four of a kind
})







test('Is this three of a kind?', () => {
    expect(holdem.isThreeOfAKind(['Q', 'J', 'K', 'A', 'T'])).toBe(false)
})

test('Is this three of a kind?', () => {
    expect(holdem.isThreeOfAKind(['Q', 'J', 'K', 'A', 'T'])).toBe(false)
})

test('Is this three of a kind?', () => {
    expect(holdem.isThreeOfAKind(['Q', 'J', 'K', 'A', 'T'])).toBe(false)
})

test('Is this three of a kind?', () => {
    expect(holdem.isThreeOfAKind(['Q', 'J', 'K', 'A', 'T'])).toBe(false)
})

test('Is this three of a kind?', () => {
    expect(holdem.isThreeOfAKind(['Q', 'J', 'K', 'A', 'T'])).toBe(false)
})

test('Is this three of a kind?', () => {
    expect(holdem.isThreeOfAKind(['Q', 'J', 'K', 9, 'T'])).toBe(false)
})

test('Is this three of a kind?', () => {
    expect(holdem.isThreeOfAKind([2, 2, 'K', 9, 'T'])).toBe(false)
})

test('Is this three of a kind?', () => {
    expect(holdem.isThreeOfAKind([2, 2, 9, 9, 'T'])).toBe(false)
})

test('Is this three of a kind?', () => {
    expect(holdem.isThreeOfAKind([2, 2, 9, 9, 9])).toBe(false)
})

test('Is this three of a kind?', () => {
    expect(holdem.isThreeOfAKind(['A', 3, 4, 2, 5])).toBe(false)
})

test('Is this three of a kind?', () => {
    expect(holdem.isThreeOfAKind(['A', 'J', 'Q', 'K', 'T'])).toBe(false)
})

test('Is this three of a kind?', () => {
    expect(holdem.isThreeOfAKind(['A', 5, 2, 'K', 'T'])).toBe(false)
})

test('Is this three of a kind?', () => {
    expect(holdem.isThreeOfAKind([7, 5, 2, 'A', 'Q'])).toBe(false)
})

test('Is this three of a kind?', () => {
    expect(holdem.isThreeOfAKind([7, 7, 7, 2, 2])).toBe(false)
})

test('Is this three of a kind?', () => {
    expect(holdem.isThreeOfAKind([7, 7, 7, 7, 2])).toBe(false)
})

test('Is this three of a kind?', () => {
    expect(holdem.isThreeOfAKind([7, 7, 7, 1, 2])).toBe(true) //three of a kind
})

test('Is this three of a kind?', () => {
    expect(holdem.isThreeOfAKind(['A', 'A', 'A', 7, 2])).toBe(true) //three of a kind
})

test('Is this three of a kind?', () => {
    expect(holdem.isThreeOfAKind(['Q', 'Q', 'Q', 1, 2])).toBe(true) //three of a kind
})

test('Is this three of a kind?', () => {
    expect(holdem.isThreeOfAKind(['A', 'A', 2, 2, 2])).toBe(false) //full house
})

test('Is this three of a kind?', () => {
    expect(holdem.isThreeOfAKind(['A', 'A', 'A', 2, 2])).toBe(false) //full house
})




test('Is it a pair?', () => {
    expect(holdem.isPair(['A', 'J', 'A', 6, 'J'])).toBe(false)
})

test('Is it a pair?', () => {
    expect(holdem.isPair([5, 'J', 5, 6, 'J'])).toBe(false)
})

test('Is it a pair?', () => {
    expect(holdem.isPair([6, 7, 2, 6, 7])).toBe(false)
})

test('Is it a pair?', () => {
    expect(holdem.isPair([6, 7, 7, 6, 7])).toBe(false)
})

test('Is it a pair?', () => {
    expect(holdem.isPair([7, 7, 7, 7, 7])).toBe(false)
})

test('Is it a pair?', () => {
    expect(holdem.isPair([9, 9, 2, 2, 2])).toBe(false)
})

test('Is it a pair?', () => {
    expect(holdem.isPair(['A', 'A', 1, 2, 2])).toBe(false)
})

test('Is it a pair?', () => {
    expect(holdem.isPair(['A', 'A', 1, 4, 2])).toBe(true)
})






test('What hand is it?', () => {
    expect(holdem.identifiedHand(['H', 'S', 'D', 'C', 'H'], ['Q', 'J', 'K', 'A', 'T'])).toBe(true)
})

test('What hand is it?', () => {
    expect(holdem.identifiedHand(['H', 'H', 'H', 'H', 'H'], ['Q', 'J', 'K', 'A', 'T'])).toBe('Royal flush') //royal flush
})

test('What hand is it?', () => {
    expect(holdem.identifiedHand(['S', 'S', 'S', 'S', 'S'], ['Q', 'J', 'K', 'A', 'T'])).toBe('Royal flush') //royal flush
})

test('What hand is it?', () => {
    expect(holdem.identifiedHand(['D', 'D', 'D', 'D', 'D'], ['Q', 'J', 'K', 'A', 'T'])).toBe('Royal flush') //royal flush
})

test('What hand is it?', () => {
    expect(holdem.identifiedHand(['D', 'D', 'D', 'D', 'D'], ['Q', 'J', 'K', 'A', 'T'])).toBe('Royal flush') //this is royal flush
})

test('What hand is it?', () => {
    expect(holdem.identifiedHand(['D', 'D', 'D', 'D', 'D'], ['Q', 'J', 'K', 9, 'T'])).toBe('Straight flush') //straight flush
})

test('What hand is it?', () => {
    expect(holdem.identifiedHand(['C', 'D', 'D', 'D', 'S'], [2, 2, 'K', 9, 'T'])).toBe('Pair') //pair
})

test('What hand is it?', () => {
    expect(holdem.identifiedHand(['C', 'D', 'D', 'D', 'H'], [2, 2, 9, 9, 'T'])).toBe('Two Pairs') //two pair
})

test('What hand is it?', () => {
    expect(holdem.identifiedHand(['C', 'D', 'D', 'S', 'H'], [2, 2, 9, 9, 9])).toBe('Three of a kind') //three of a kind
})

test('What hand is it?', () => {
    expect(holdem.identifiedHand(['C', 'D', 'D', 'S', 'H'], ['A', 3, 4, 2, 5])).toBe('Straight') //straight
})

test('What hand is it?', () => {
    expect(holdem.identifiedHand(['C', 'D', 'D', 'S', 'H'], ['A', 'J', 'Q', 'K', 'T'])).toBe('Straight') //straight
})

test('What hand is it?', () => {
    expect(holdem.identifiedHand(['D', 'D', 'D', 'D', 'D'], ['A', 5, 2, 'K', 'T'])).toBe('Flush') //flush
})

test('What hand is it?', () => {
    expect(holdem.identifiedHand(['D', 'D', 'D', 'D', 'D'], [7, 5, 2, 'A', 'Q'])).toBe('Flush') //flush
})

test('What hand is it?', () => {
    expect(holdem.identifiedHand(['S', 'D', 'C', 'H', 'D'], [7, 7, 7, 2, 2])).toBe('Full house') //full house
})

test('What hand is it?', () => {
    expect(holdem.identifiedHand(['S', 'D', 'C', 'H', 'D'], [7, 7, 7, 7, 2])).toBe('Four of a kind') //four of a kind
})
