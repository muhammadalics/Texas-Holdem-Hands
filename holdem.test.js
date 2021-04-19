const { expect, test } = require('@jest/globals')

const { isPairPresent, isThreeOfAKind, isThreeOfAKindPresent, isFourOfAKindPresent, twoPairsPresent, 
    isRoyalFlush, isStraightFlush, isFullHouse,  isFlush, isStraight, isPair,
    identifiedHand, comboMaker, getHand} = require('./identify_hand');
const {tieBreak234OfAKind, tieBreakMultiple, tieBreakTwoPair, tieChecker} = require('./tiebreak');
const {describeHand} = require('./describe_hand');
const {returnNum, findKeysbyValue, splitSuitAndFace, checkAllEqual, 
    areNumbersInSequence, faceTranslator, areArraysEqual, bubbleSortRankings,
    outputResults, bubbleSort, isCountPresent, countOccurrence, isAceByKing,
    replaceAceByNum, areSameSets } = require('./helper_functions')



test('Check all suits are same', () => {
    expect(checkAllEqual(['S', 'S', 'S', 'S', 'S'])).toBe(true)
})

test('Check if all faces are same', () => {
    expect(checkAllEqual([8, 8, 8, 8, 8])).toBe(true)
})

test('Check if suits are different', () => {
    expect(checkAllEqual(['S', 'S', 'C', 'S', 'D'])).toBe(false)
})

test('Check if all faces are different', () => {
    expect(checkAllEqual([8, 8, 7, 8, 8])).toBe(false)
})

test('Count occurrence set 1', () => {
    expect(countOccurrence([2, 3, 4, 5, 8])).toStrictEqual({ '2': 1, '3': 1, '4': 1, '5': 1, '8': 1 })
})

test('Count occurrence set 2', () => {
    expect(countOccurrence([5, 5, 5])).toStrictEqual({ '5': 3 })
})

test('Count occurrence set 3', () => {
    expect(countOccurrence([2, 2, 3, 6, 7])).toStrictEqual({ '2': 2, '3': 1, '6': 1, '7': 1 })
})

test('Is pair present ?', () => {
    expect(isPairPresent([2, 2, 6, 7, 7])).toBe(true)
})

test('Is pair present ?', () => {
    expect(isPairPresent([2, 4, 3, 6, 8])).toBe(false)
})

test('Is three of a kind present', () => {
    expect(isThreeOfAKindPresent([2, 3, 6, 7, 7])).toBe(false)
})

test('Is three of a kind present', () => {
    expect(isThreeOfAKindPresent([2, 2, 2, 6, 7])).toBe(true)
})

test('Is four of a kind present ?', () => {
    expect(isFourOfAKindPresent([6, 6, 6, 6, 7])).toBe(true)
})

test('Is four of a kind present ?', () => {
    expect(isFourOfAKindPresent([6, 7, 2, 6, 7])).toBe(false)
})

test('Are two pairs present ?', () => {
    expect(twoPairsPresent(['A', 'J', 'A', 6, 'J'])).toBe(true)
})

test('Are two pairs present ?', () => {
    expect(twoPairsPresent([5, 'J', 5, 6, 'J'])).toBe(true)
})

test('Are two pairs present ?', () => {
    expect(twoPairsPresent([6, 7, 2, 6, 7])).toBe(true)
})

test('Are two pairs present ?', () => {
    expect(twoPairsPresent([6, 7, 7, 6, 7])).toBe(false)
})

test('Are two pairs present ?', () => {
    expect(twoPairsPresent([7, 7, 7, 7, 7])).toBe(false)
})

test('Are two pairs present ?', () => {
    expect(twoPairsPresent([9, 9, 2, 2, 2])).toBe(false)
})

test('Are numbers in sequence ?', () => {
    expect(areNumbersInSequence([4, 6, 8, 7, 5])).toBe(true)
})

test('Are numbers in sequence ?', () => {
    expect(areNumbersInSequence([2, 3, 3, 4, 5])).toBe(false)
})

test('Are numbers in sequence ?', () => {
    expect(areNumbersInSequence([2, 3, 7, 4, 5])).toBe(false)
})

test('Are numbers in sequence ?', () => {
    expect(areNumbersInSequence([1, 3, 7, 4, 5])).toBe(false)
})

var kvPairs = {
    'T': 10,
    'J': 11,
    'Q': 12,
    'K': 13,
    'A': 14
}

var numberToFace = {
    10: 'T',
    11: 'J',
    12: 'Q',
    13: 'K',
    14: 'A'
}


test('Are faces translated to numbers properly?', () => {
    expect(faceTranslator(kvPairs, [1, 3, 'K', 4, 5])).toStrictEqual([1, 3, 13, 4, 5])
})

test('Is Queen translated to 12?', () => {
    expect(faceTranslator(kvPairs, [1, 'Q', 5, 4, 5])).toStrictEqual([1, 12, 5, 4, 5])
})

test('Is Ace translated to 14?', () => {
    expect(faceTranslator(kvPairs, [1, 3, 'A', 4, 5])).toStrictEqual([1, 3, 14, 4, 5])
})

test('Is T translated to 10?', () => {
    expect(faceTranslator(kvPairs, ['T', 3, 2, 4, 5])).toStrictEqual([10, 3, 2, 4, 5])
})

test('Is joker translated to 11?', () => {
    expect(faceTranslator(kvPairs, [1, 3, 1, 4, 'J'])).toStrictEqual([1, 3, 1, 4, 11])
})

test('Are faces translated to numbers properly?', () => {
    expect(faceTranslator(kvPairs, ['Q', 'J', 'K', 'A', 'T'])).toStrictEqual([12, 11, 13, 14, 10])
})

test('Are faces translated to numbers properly?', () => {
    expect(faceTranslator(numberToFace, [12, 11, 13, 14, 10])).toStrictEqual(['Q', 'J', 'K', 'A', 'T'])
})


test('Are Arrays Equal?', () => {
    expect(areArraysEqual([1, 1, 1, 1, 1], [1, 1, 1, 1, 1])).toBe(true)
})

test('Are Arrays Equal?', () => {
    expect(areArraysEqual([8, 8, 8, 8, 8], [8, 8, 8, 8, 8])).toBe(true)
})

test('Are Arrays Equal?', () => {
    expect(areArraysEqual([1, 3, 1, 5, 1], [1, 1, 1, 1, 1])).toBe(false)
})

test('Are Arrays Equal?', () => {
    expect(areArraysEqual([5, 5, 5, 5, 5], [1, 1, 1, 1, 1])).toBe(false)
})

test('Is this Royal Flush?', () => {
    expect(isRoyalFlush(['H', 'S', 'D', 'C', 'H'], ['Q', 'J', 'K', 'A', 'T'])).toBe(false)
})

test('Is this Royal Flush?', () => {
    expect(isRoyalFlush(['H', 'H', 'H', 'H', 'H'], ['Q', 'J', 'K', 'A', 'T'])).toBe(true)
})

test('Is this Royal Flush?', () => {
    expect(isRoyalFlush(['S', 'S', 'S', 'S', 'S'], ['Q', 'J', 'K', 'A', 'T'])).toBe(true)
})

test('Is this Royal Flush?', () => {
    expect(isRoyalFlush(['D', 'D', 'D', 'D', 'D'], ['Q', 'J', 'K', 'A', 'T'])).toBe(true)
})

test('Is this Straight Flush?', () => {
    expect(isStraightFlush(['D', 'D', 'D', 'D', 'D'], ['Q', 'J', 'K', 'A', 'T'])).toBe(false) //this is royal flush
})

test('Is this Straight Flush?', () => {
    expect(isStraightFlush(['D', 'D', 'D', 'D', 'D'], ['Q', 'J', 'K', 9, 'T'])).toBe(true) //straight flush
})

test('Is this Straight Flush?', () => {
    expect(isStraightFlush(['C', 'D', 'D', 'D', 'S'], [2, 2, 'K', 9, 'T'])).toBe(false) //pair
})

test('Is this Straight Flush?', () => {
    expect(isStraightFlush(['C', 'D', 'D', 'D', 'H'], [2, 2, 9, 9, 'T'])).toBe(false) //two pair
})

test('Is this Straight Flush?', () => {
    expect(isStraightFlush(['C', 'D', 'D', 'S', 'H'], [2, 2, 9, 9, 9])).toBe(false) //three of a kind
})

test('Is this Straight Flush?', () => {
    expect(isStraightFlush(['C', 'D', 'D', 'S', 'H'], ['A', 3, 4, 2, 5])).toBe(false) //straight
})

test('Is this Straight Flush?', () => {
    expect(isStraightFlush(['C', 'D', 'D', 'S', 'H'], ['A', 'J', 'Q', 'K', 'T'])).toBe(false) //straight
})

test('Is this Straight Flush?', () => {
    expect(isStraightFlush(['D', 'D', 'D', 'D', 'D'], ['A', 5, 2, 'K', 'T'])).toBe(false) //flush
})

test('Is this Straight Flush?', () => {
    expect(isStraightFlush(['D', 'D', 'D', 'D', 'D'], [7, 5, 2, 'A', 'Q'])).toBe(false) //flush
})

test('Is this Straight Flush?', () => {
    expect(isStraightFlush(['S', 'D', 'C', 'H', 'D'], [7, 7, 7, 2, 2])).toBe(false) //full house
})

test('Is this Straight Flush?', () => {
    expect(isStraightFlush(['S', 'D', 'C', 'H', 'D'], [7, 7, 7, 7, 2])).toBe(false) //four of a kind
})




test('Is this four of a kind?', () => {
    expect(isFourOfAKindPresent(['Q', 'J', 'K', 'A', 'T'])).toBe(false)
})

test('Is this four of a kind?', () => {
    expect(isFourOfAKindPresent(['Q', 'J', 'K', 9, 'T'])).toBe(false)
})

test('Is this four of a kind?', () => {
    expect(isFourOfAKindPresent([2, 2, 'K', 9, 'T'])).toBe(false)
})

test('Is this four of a kind?', () => {
    expect(isFourOfAKindPresent([2, 2, 9, 9, 'T'])).toBe(false)
})

test('Is this four of a kind?', () => {
    expect(isFourOfAKindPresent([2, 2, 9, 9, 9])).toBe(false)
})

test('Is this four of a kind?', () => {
    expect(isFourOfAKindPresent(['A', 3, 4, 2, 5])).toBe(false)
})

test('Is this four of a kind?', () => {
    expect(isFourOfAKindPresent(['A', 'J', 'Q', 'K', 'T'])).toBe(false)
})

test('Is this four of a kind?', () => {
    expect(isFourOfAKindPresent(['A', 5, 2, 'K', 'T'])).toBe(false)
})

test('Is this four of a kind?', () => {
    expect(isFourOfAKindPresent([7, 5, 2, 'A', 'Q'])).toBe(false)
})

test('Is this four of a kind?', () => {
    expect(isFourOfAKindPresent([7, 7, 7, 2, 2])).toBe(false)
})

test('Is this four of a kind?', () => {
    expect(isFourOfAKindPresent([7, 7, 7, 7, 2])).toBe(true)
})





test('Is this full house?', () => {
    expect(isFullHouse(['Q', 'J', 'K', 'A', 'T'])).toBe(false)
})

test('Is this full house?', () => {
    expect(isFullHouse(['Q', 'J', 'K', 9, 'T'])).toBe(false)
})

test('Is this full house?', () => {
    expect(isFullHouse([2, 2, 'K', 9, 'T'])).toBe(false)
})

test('Is this full house?', () => {
    expect(isFullHouse([2, 2, 9, 9, 'T'])).toBe(false)
})

test('Is this full house?', () => {
    expect(isFullHouse([2, 2, 9, 9, 9])).toBe(true) //full house
})

test('Is this full house?', () => {
    expect(isFullHouse(['A', 3, 4, 2, 5])).toBe(false)
})

test('Is this full house?', () => {
    expect(isFullHouse(['A', 'J', 'Q', 'K', 'T'])).toBe(false)
})

test('Is this full house?', () => {
    expect(isFullHouse(['A', 5, 2, 'K', 'T'])).toBe(false)
})

test('Is this full house?', () => {
    expect(isFullHouse([7, 5, 2, 'A', 'Q'])).toBe(false)
})

test('Is this full house?', () => {
    expect(isFullHouse([7, 7, 7, 2, 2])).toBe(true) //full house 
})

test('Is this full house?', () => {
    expect(isFullHouse([7, 7, 7, 7, 2])).toBe(false)
})

test('Is this full house?', () => {
    expect(isFullHouse([7, 7, 7, 'Q', 'Q'])).toBe(true) //full house
})

test('Is this full house?', () => {
    expect(isFullHouse(['Q', 'Q', 'Q', 2, 2])).toBe(true) //full house
})

test('Is this full house?', () => {
    expect(isFullHouse(['Q', 'Q', 'Q', 'A', 'A'])).toBe(true) //full house
})

test('Is this full house?', () => {
    expect(isFullHouse(['A', 'A', 'A', 'Q', 'Q'])).toBe(true) //full house
})

test('Is this full house?', () => {
    expect(isFullHouse(['A', 'A', 'A', 5, 5])).toBe(true) //full house
})

test('Is this full house?', () => {
    expect(isFullHouse([8, 8, 8, 'A', 'A'])).toBe(true) //full house
})



test('Is this Flush?', () => {
    expect(isFlush(['H', 'S', 'D', 'C', 'H'], ['Q', 'J', 'K', 'A', 'T'])).toBe(false)
})

test('Is this Flush?', () => {
    expect(isFlush(['H', 'H', 'H', 'H', 'H'], ['Q', 'J', 'K', 'A', 'T'])).toBe(false) //royal flush
})

test('Is this Flush?', () => {
    expect(isFlush(['S', 'S', 'S', 'S', 'S'], ['Q', 'J', 'K', 'A', 'T'])).toBe(false) //royal flush
})

test('Is this Flush?', () => {
    expect(isFlush(['D', 'D', 'D', 'D', 'D'], ['Q', 'J', 'K', 'A', 'T'])).toBe(false) //royal flush
})

test('Is this Flush?', () => {
    expect(isFlush(['D', 'D', 'D', 'D', 'D'], ['Q', 'J', 'K', 'A', 'T'])).toBe(false) //this is royal flush
})

test('Is this Flush?', () => {
    expect(isFlush(['D', 'D', 'D', 'D', 'D'], ['Q', 'J', 'K', 9, 'T'])).toBe(false) //straight flush
})

test('Is this Flush?', () => {
    expect(isFlush(['C', 'D', 'D', 'D', 'S'], [2, 2, 'K', 9, 'T'])).toBe(false) //pair
})

test('Is this Flush?', () => {
    expect(isFlush(['C', 'D', 'D', 'D', 'H'], [2, 2, 9, 9, 'T'])).toBe(false) //two pair
})

test('Is this Flush?', () => {
    expect(isFlush(['C', 'D', 'D', 'S', 'H'], [2, 2, 9, 9, 9])).toBe(false) //three of a kind
})

test('Is this Flush?', () => {
    expect(isFlush(['C', 'D', 'D', 'S', 'H'], ['A', 3, 4, 2, 5])).toBe(false) //straight
})

test('Is this Flush?', () => {
    expect(isFlush(['C', 'D', 'D', 'S', 'H'], ['A', 'J', 'Q', 'K', 'T'])).toBe(false) //straight
})

test('Is this Flush?', () => {
    expect(isFlush(['D', 'D', 'D', 'D', 'D'], ['A', 5, 2, 'K', 'T'])).toBe(true) //flush
})

test('Is this Flush?', () => {
    expect(isFlush(['D', 'D', 'D', 'D', 'D'], [7, 5, 2, 'A', 'Q'])).toBe(true) //flush
})

test('Is this Flush?', () => {
    expect(isFlush(['S', 'D', 'C', 'H', 'D'], [7, 7, 7, 2, 2])).toBe(false) //full house
})

test('Is this Flush?', () => {
    expect(isFlush(['S', 'D', 'C', 'H', 'D'], [7, 7, 7, 7, 2])).toBe(false) //four of a kind
})








test('Is this Straight?', () => {
    expect(isStraight(['H', 'S', 'D', 'C', 'H'], ['Q', 'J', 'K', 'A', 'T'])).toBe(true)
})

test('Is this Straight?', () => {
    expect(isStraight(['H', 'H', 'H', 'H', 'H'], ['Q', 'J', 'K', 'A', 'T'])).toBe(false) //royal flush
})

test('Is this Straight?', () => {
    expect(isStraight(['S', 'S', 'S', 'S', 'S'], ['Q', 'J', 'K', 'A', 'T'])).toBe(false) //royal flush
})

test('Is this Straight?', () => {
    expect(isStraight(['D', 'D', 'D', 'D', 'D'], ['Q', 'J', 'K', 'A', 'T'])).toBe(false) //royal flush
})

test('Is this Straight?', () => {
    expect(isStraight(['D', 'D', 'D', 'D', 'D'], ['Q', 'J', 'K', 'A', 'T'])).toBe(false) //this is royal flush
})

test('Is this Straight?', () => {
    expect(isStraight(['D', 'D', 'D', 'D', 'D'], ['Q', 'J', 'K', 9, 'T'])).toBe(false) //straight flush
})

test('Is this Straight?', () => {
    expect(isStraight(['C', 'D', 'D', 'D', 'S'], [2, 2, 'K', 9, 'T'])).toBe(false) //pair
})

test('Is this Straight?', () => {
    expect(isStraight(['C', 'D', 'D', 'D', 'H'], [2, 2, 9, 9, 'T'])).toBe(false) //two pair
})

test('Is this Straight?', () => {
    expect(isStraight(['C', 'D', 'D', 'S', 'H'], [2, 2, 9, 9, 9])).toBe(false) //three of a kind
})

test('Is this Straight?', () => {
    expect(isStraight(['C', 'D', 'D', 'S', 'H'], ['A', 3, 4, 2, 5])).toBe(true) //straight
})

test('Is this Straight?', () => {
    expect(isStraight(['C', 'D', 'D', 'S', 'H'], ['A', 'J', 'Q', 'K', 'T'])).toBe(true) //straight
})

test('Is this Straight?', () => {
    expect(isStraight(['D', 'D', 'D', 'D', 'D'], ['A', 5, 2, 'K', 'T'])).toBe(false) //flush
})

test('Is this Straight?', () => {
    expect(isStraight(['D', 'D', 'D', 'D', 'D'], [7, 5, 2, 'A', 'Q'])).toBe(false) //flush
})

test('Is this Straight?', () => {
    expect(isStraight(['S', 'D', 'C', 'H', 'D'], [7, 7, 7, 2, 2])).toBe(false) //full house
})

test('Is this Straight?', () => {
    expect(isStraight(['S', 'D', 'C', 'H', 'D'], [7, 7, 7, 7, 2])).toBe(false) //four of a kind
})

test('Is this Straight?', () => {
    expect(isStraight(['S', 'S', 'D', 'D', 'H'], [8, 7, 6, 5, 4])).toBe(true) //four of a kind
})






test('Is this three of a kind?', () => {
    expect(isThreeOfAKind(['Q', 'J', 'K', 'A', 'T'])).toBe(false)
})

test('Is this three of a kind?', () => {
    expect(isThreeOfAKind(['Q', 'J', 'K', 'A', 'T'])).toBe(false)
})

test('Is this three of a kind?', () => {
    expect(isThreeOfAKind(['Q', 'J', 'K', 'A', 'T'])).toBe(false)
})

test('Is this three of a kind?', () => {
    expect(isThreeOfAKind(['Q', 'J', 'K', 'A', 'T'])).toBe(false)
})

test('Is this three of a kind?', () => {
    expect(isThreeOfAKind(['Q', 'J', 'K', 'A', 'T'])).toBe(false)
})

test('Is this three of a kind?', () => {
    expect(isThreeOfAKind(['Q', 'J', 'K', 9, 'T'])).toBe(false)
})

test('Is this three of a kind?', () => {
    expect(isThreeOfAKind([2, 2, 'K', 9, 'T'])).toBe(false)
})

test('Is this three of a kind?', () => {
    expect(isThreeOfAKind([2, 2, 9, 9, 'T'])).toBe(false)
})

test('Is this three of a kind?', () => {
    expect(isThreeOfAKind([2, 2, 9, 9, 9])).toBe(false)
})

test('Is this three of a kind?', () => {
    expect(isThreeOfAKind(['A', 3, 4, 2, 5])).toBe(false)
})

test('Is this three of a kind?', () => {
    expect(isThreeOfAKind(['A', 'J', 'Q', 'K', 'T'])).toBe(false)
})

test('Is this three of a kind?', () => {
    expect(isThreeOfAKind(['A', 5, 2, 'K', 'T'])).toBe(false)
})

test('Is this three of a kind?', () => {
    expect(isThreeOfAKind([7, 5, 2, 'A', 'Q'])).toBe(false)
})

test('Is this three of a kind?', () => {
    expect(isThreeOfAKind([7, 7, 7, 2, 2])).toBe(false)
})

test('Is this three of a kind?', () => {
    expect(isThreeOfAKind([7, 7, 7, 7, 2])).toBe(false)
})

test('Is this three of a kind?', () => {
    expect(isThreeOfAKind([7, 7, 7, 1, 2])).toBe(true) //three of a kind
})

test('Is this three of a kind?', () => {
    expect(isThreeOfAKind(['A', 'A', 'A', 7, 2])).toBe(true) //three of a kind
})

test('Is this three of a kind?', () => {
    expect(isThreeOfAKind(['Q', 'Q', 'Q', 1, 2])).toBe(true) //three of a kind
})

test('Is this three of a kind?', () => {
    expect(isThreeOfAKind(['A', 'A', 2, 2, 2])).toBe(false) //full house
})

test('Is this three of a kind?', () => {
    expect(isThreeOfAKind(['A', 'A', 'A', 2, 2])).toBe(false) //full house
})




test('Is it a pair?', () => {
    expect(isPair(['A', 'J', 'A', 6, 'J'])).toBe(false)
})

test('Is it a pair?', () => {
    expect(isPair([5, 'J', 5, 6, 'J'])).toBe(false)
})

test('Is it a pair?', () => {
    expect(isPair([6, 7, 2, 6, 7])).toBe(false)
})

test('Is it a pair?', () => {
    expect(isPair([6, 7, 7, 6, 7])).toBe(false)
})

test('Is it a pair?', () => {
    expect(isPair([7, 7, 7, 7, 7])).toBe(false)
})

test('Is it a pair?', () => {
    expect(isPair([9, 9, 2, 2, 2])).toBe(false)
})

test('Is it a pair?', () => {
    expect(isPair(['A', 'A', 1, 2, 2])).toBe(false)
})

test('Is it a pair?', () => {
    expect(isPair(['A', 'A', 1, 4, 2])).toBe(true)
})






test('What hand is it?', () => {
    expect(identifiedHand(['H', 'S', 'D', 'C', 'H'], ['Q', 'J', 'K', 'A', 'T'])[0]).toBe('Straight')
})

test('What hand is it?', () => {
    expect(identifiedHand(['H', 'H', 'H', 'H', 'H'], ['Q', 'J', 'K', 'A', 'T'])[0]).toBe('Royal flush') //royal flush
})

test('What hand is it?', () => {
    expect(identifiedHand(['S', 'S', 'S', 'S', 'S'], ['Q', 'J', 'K', 'A', 'T'])[0]).toBe('Royal flush') //royal flush
})

test('What hand is it?', () => {
    expect(identifiedHand(['D', 'D', 'D', 'D', 'D'], ['Q', 'J', 'K', 'A', 'T'])[0]).toBe('Royal flush') //royal flush
})

test('What hand is it?', () => {
    expect(identifiedHand(['D', 'D', 'D', 'D', 'D'], ['Q', 'J', 'K', 'A', 'T'])[0]).toBe('Royal flush') //this is royal flush
})

test('What hand is it?', () => {
    expect(identifiedHand(['D', 'D', 'D', 'D', 'D'], ['Q', 'J', 'K', 9, 'T'])[0]).toBe('Straight flush') //straight flush
})

test('What hand is it?', () => {
    expect(identifiedHand(['C', 'D', 'D', 'D', 'S'], [2, 2, 'K', 9, 'T'])[0]).toBe('Pair') //pair
})

test('What hand is it?', () => {
    expect(identifiedHand(['C', 'D', 'D', 'D', 'H'], [2, 2, 9, 9, 'T'])[0]).toBe('Two Pairs') //two pair
})

test('What hand is it?', () => {
    expect(identifiedHand(['C', 'D', 'D', 'S', 'H'], [2, 2, 9, 9, 9])[0]).toBe('Full house') 
})

test('What hand is it?', () => {
    expect(identifiedHand(['C', 'D', 'D', 'S', 'H'], ['A', 3, 4, 2, 5])[0]).toBe('Straight') //straight
})

test('What hand is it?', () => {
    expect(identifiedHand(['C', 'D', 'D', 'S', 'H'], ['A', 'J', 'Q', 'K', 'T'])[0]).toBe('Straight') //straight
})

test('What hand is it?', () => {
    expect(identifiedHand(['D', 'D', 'D', 'D', 'D'], ['A', 5, 2, 'K', 'T'])[0]).toBe('Flush') //flush
})

test('What hand is it?', () => {
    expect(identifiedHand(['D', 'D', 'D', 'D', 'D'], [7, 5, 2, 'A', 'Q'])[0]).toBe('Flush') //flush
})

test('What hand is it?', () => {
    expect(identifiedHand(['S', 'D', 'C', 'H', 'D'], [7, 7, 7, 2, 2])[0]).toBe('Full house') //full house
})

test('What hand is it?', () => {
    expect(identifiedHand(['S', 'D', 'C', 'H', 'D'], [7, 7, 7, 7, 2])[0]).toBe('Four of a kind') //four of a kind
})

test('What hand is it?', () => {
    expect(identifiedHand(['C', 'H', 'D', 'C', 'S'], [10, 4, 7, 'K', 2])[0]).toBe('High card') //High card
})

test("Given community and a player's cards,  what hand is it?", () => {
    expect(getHand(
        ['C', 4],
        ['S', 'D'],
        [4, 'K', 4, 8, 7],
        ['C', 'S', 'H', 'S', 'S']
    )[0]).toBe(4) //Three of a kind
})

test("Given community and a player's cards,  what hand is it?", () => {
    expect(getHand(
        ['A', 9],
        ['S', 'S'],
        [4, 'K', 4, 8, 7],
        ['C', 'S', 'H', 'S', 'S']
    )[0]).toBe(6) //Flush
})

test("Given community and a player's cards,  what hand is it?", () => {
    expect(getHand(
        ['K', 'K'],
        ['H', 'D'],
        [4, 'K', 4, 8, 7],
        ['C', 'S', 'H', 'S', 'S']
    )[0]).toBe(7) //Full house
})

test("Given community and a player's cards,  what hand is it?", () => {
    expect(getHand(
        [5, 6],
        ['D', 'D'],
        [4, 'K', 4, 8, 7],
        ['C', 'S', 'H', 'S', 'S']
    )[0]).toBe(5) //Straight
})

test("Given community and a player's cards,  what hand is it?", () => {
    expect(getHand(
        [9, 7],
        ['H', 'S'],
        ['K', 'A', 3, 7, 'T'],
        ['S', 'D', 'H', 'C', 'D']
    )[0]).toBe(2) //Pair
})

test("Given community and a player's cards,  what hand is it?", () => {
    expect(getHand(
        ['A', 'K'],
        ['C', 'H'],
        ['K', 'A', 3, 7, 'T'],
        ['S', 'D', 'H', 'C', 'D']
    )[0]).toBe(3) // Two Pair
})

test("Given community and a player's cards,  what hand is it?", () => {
    expect(getHand(
        ['J', 'Q'],
        ['D', 'C'],
        ['K', 'A', 3, 7, 'T'],
        ['S', 'D', 'H', 'C', 'D']
    )[0]).toBe(5) // Straight
})


test('All keys found by value ?', () => {
    expect(findKeysbyValue({'a': 2, 'b':2, 'c': 1}, 2)).toStrictEqual(['a', 'b']) 
})

test('Pair hand description', () => {
    expect(describeHand(2, ['C', 'D', 'D', 'D', 'S'], [2, 2, 'K', 9, 'T'])).toBe('Pair Two') //pair
})

test('Two Pairs - hand description?', () => {
    expect(describeHand(3, ['C', 'D', 'D', 'D', 'H'], [2, 2, 9, 9, 'T'])).toBe('Two Pair Twos Nines') //two pair
})

test('Three of a kind - hand description?', () => {
    expect(describeHand(4, ['C', 'D', 'D', 'S', 'H'], [2, 7, 9, 9, 9])).toBe('Three Nines, with Two, Seven kickers') //three of a kind
})

test('Straight - hand description?', () => {
    expect(describeHand(5, ['C', 'D', 'D', 'S', 'H'], ['A', 3, 4, 2, 5])).toBe('5-high straight') //straight
})

test('Straight - hand description?', () => {
    expect(describeHand(5, ['C', 'D', 'D', 'S', 'H'], ['A', 'Q', 'K', 'J', 'T'])).toBe('Ace-high straight') //straight
})

test('Straight - hand description?', () => {
    expect(describeHand(5, ['C', 'D', 'D', 'S', 'H'], ['T', 9, 8, 7, 6])).toBe('10-high straight') //straight
})

test('Flush - hand description', () => {
    expect(describeHand(6, ['D', 'D', 'D', 'D', 'D'], [7, 5, 2, 'A', 'Q'])).toBe('Ace-high flush') //flush
})

test('Flush - hand description', () => {
    expect(describeHand(6, ['D', 'D', 'D', 'D', 'D'], [7, 5, 2, 'K', 'Q'])).toBe('King-high flush') //flush
})

test('Full house - hand description', () => {
    expect(describeHand(7, ['S', 'D', 'C', 'H', 'D'], [7, 7, 7, 2, 2])).toBe('Full house - Three Sevens and Two Twos') //full house
})

test('Full house - hand description', () => {
    expect(describeHand(7, ['S', 'D', 'C', 'H', 'D'], ['A', 'A', 'A', 'K', 'K'])).toBe('Full house - Three Aces and Two Kings') //full house
})

test('Four of a kind - hand description', () => {
    expect(describeHand(8, ['S', 'D', 'C', 'H', 'D'], [7, 7, 7, 7, 2])).toBe('Four Sevens, with Two') //full house
})

test('Four of a kind - hand description', () => {
    expect(describeHand(8, ['S', 'D', 'C', 'H', 'D'], ['A', 'A', 'A', 'A', 'T'])).toBe('Four Aces, with Ten') //full house
})

test('Four of a kind - hand description', () => {
    expect(describeHand(8, ['S', 'D', 'C', 'H', 'S'], ['K', 'K', 'K', 3, 'K'])).toBe('Four Kings, with Three') //full house
})

test('Straight Flush - hand description?', () => {
    expect(describeHand(9, ['H', 'H', 'H', 'H', 'H'], ['A', 3, 4, 2, 5])).toBe('5-high straight flush') //straight flush
})

test('Straight Flush - hand description?', () => {
    expect(describeHand(9, ['C', 'C', 'C', 'C', 'C'], ['A', 'Q', 'K', 'J', 'T'])).toBe('Ace-high straight flush') //straight flush
})

test('Straight Flush - hand description?', () => {
    expect(describeHand(9, ['D', 'D', 'D', 'D', 'D'], ['T', 9, 8, 7, 6])).toBe('10-high straight flush') //straight flush
})

test('High card - hand description?', () => {
    expect(describeHand(1, ['C', 'H', 'D', 'C', 'S'], ['T', 4, 7, 'K', 2] )).toBe('High card - Ten, Four, Seven, King, Two') //High card
})


test('tieBreak Two Pair', () => {
    expect(tieBreakTwoPair(['Q', 'Q', 7, 7, 3], ['Q', 'Q', 7, 7, 1])).toStrictEqual([1, 0]) 
})

test('tieBreak Two Pair', () => {
    expect(tieBreakTwoPair(['K', 'K', 7, 7, 3], ['Q', 'Q', 7, 7, 1])).toStrictEqual([1, 0]) 
})

test('tieBreak Two Pair', () => {
    expect(tieBreakTwoPair(['K', 'K', 'Q', 'Q', 3], ['A', 'A', 2, 2, 1])).toStrictEqual([0, 1]) 
})


test('tieBreaker Pair', () => {
    expect(tieBreak234OfAKind(['T', 'T', 7, 'K', 2], ['T', 'T', 7, 'Q', 2], 2 )).toStrictEqual([1, 0]) 
})

test('tieBreaker Pair', () => {
    expect(tieBreak234OfAKind(['K', 'K', 7, 'K', 2], ['K', 'K', 7, 'A', 2], 2 )).toStrictEqual([0, 1]) 
})

test('tieBreaker Pair', () => {
    expect(tieBreak234OfAKind(['A', 'A', 7, 'K', 2], ['T', 'T', 7, 'Q', 2], 2 )).toStrictEqual([1, 0]) 
})

test('tieBreaker Pair', () => {
    expect(tieBreak234OfAKind(['Q', 'Q', 7, 'K', 2], ['T', 'T', 7, 'Q', 2], 2 )).toStrictEqual([1, 0]) 
})

test('tieBreaker Pair', () => {
    expect(tieBreak234OfAKind(['Q', 'Q', 7, 'K', 2], ['J', 'J', 7, 'Q', 2], 2 )).toStrictEqual([1, 0]) 
})


test('tieBreaker - Three of a kind', () => {
    expect(tieBreak234OfAKind(['T', 'T', 'T', 'K', 2], ['T', 'T', 'T', 'Q', 2], 3 )).toStrictEqual([1, 0]) 
})

test('tieBreaker - Three of a kind', () => {
    expect(tieBreak234OfAKind(['K', 'K', 7, 'K', 2], ['K', 'K', 7, 'K', 4], 3 )).toStrictEqual([0, 1]) 
})

test('tieBreaker - Three of a kind', () => {
    expect(tieBreak234OfAKind(['A', 'A', 7, 'A', 2], ['T', 'T', 7, 'T', 2], 3 )).toStrictEqual([1, 0]) 
})

test('tieBreaker - Three of a kind', () => {
    expect(tieBreak234OfAKind(['Q', 'Q', 7, 'Q', 2], ['Q', 'Q', 'A', 'Q', 2], 3 )).toStrictEqual([0, 1]) 
})

test('tieBreaker - Three of a kind', () => {
    expect(tieBreak234OfAKind(['A', 'A', 'Q', 'A', 'K'], ['A', 'A', 'T', 'A', 'Q'], 3 )).toStrictEqual([1, 0]) 
})


test('tieBreaker - Four of a kind', () => {
    expect(tieBreak234OfAKind(['T', 'T', 'T', 'T', 2], ['T', 'T', 'T', 'T', 5], 4 )).toStrictEqual([0, 1]) 
})

test('tieBreaker - Four of a kind', () => {
    expect(tieBreak234OfAKind(['K', 'K', 'K', 'K', 2], ['Q', 'Q', 'Q', 'Q', 4], 4 )).toStrictEqual([1, 0]) 
})

test('tieBreaker - Four of a kind', () => {
    expect(tieBreak234OfAKind(['A', 'A', 7, 'A', 'A'], ['T', 'T', 7, 'T', 'T'], 4 )).toStrictEqual([1, 0]) 
})

test('tieBreaker - Four of a kind', () => {
    expect(tieBreak234OfAKind(['Q', 'Q', 'K', 'Q', 'Q'], ['Q', 'Q', 'A', 'Q', 'Q'], 4 )).toStrictEqual([0, 1]) 
})

test('Bubble Sort - Three of a kind', () => {
    expect(bubbleSort([[2, 7, 9, 9, 9], [2, 7, 'T', 'T', 'T'],[2, 7, 'A', 'A', 'A'], ['K', 'Q', 'K', 'K', 'A']], tieBreak234OfAKind, 3 ))
    .toStrictEqual([[2, 7, 'A', 'A', 'A'],['K', 'Q', 'K', 'K', 'A'],[2, 7, 'T', 'T', 'T'], [2, 7, 9, 9, 9]]) 
})

test('Bubble Sort - Three of a kind', () => {
    expect(bubbleSort([[2, 7, 'A', 'A', 'A'], ['K', 'Q', 'K', 'K', 'A']], tieBreak234OfAKind, 3 ))
    .toStrictEqual([[2, 7, 'A', 'A', 'A'],['K', 'Q', 'K', 'K', 'A']]) 
})

test('Bubble Sort - Three of a kind', () => {
    expect(bubbleSort([[2, 7, 'T', 'T', 'T'],['K', 'Q', 'K', 'K', 'A']], tieBreak234OfAKind, 3 ))
    .toStrictEqual([['K', 'Q', 'K', 'K', 'A'],[2, 7, 'T', 'T', 'T']]) 
})

test('Bubble Sort - Three of a kind', () => {
    expect(bubbleSort([[2, 7, 9, 9, 9], [2, 7, 'T', 'T', 'T'],[2, 7, 'A', 'A', 'A']], tieBreak234OfAKind, 3 ))
    .toStrictEqual([[2, 7, 'A', 'A', 'A'],[2, 7, 'T', 'T', 'T'], [2, 7, 9, 9, 9]]) 
})

test('Bubble Sort - Pair', () => {
    expect(bubbleSort([[2, 7, 4, 9, 9], [2, 7, 5, 'T', 'T'],[2, 7, 9, 'A', 'A']], tieBreak234OfAKind, 3 ))
    .toStrictEqual([[2, 7, 9, 'A', 'A'], [2, 7, 5, 'T', 'T'], [2, 7, 4, 9, 9]]) 
})


test('Helper function return number', () => {
    expect(returnNum('1')).toBe(1)
})

test('Helper function return number', () => {
    expect(returnNum('a')).toBe('a')
})




