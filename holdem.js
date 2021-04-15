const { arrayExpression } = require("@babel/types");
// const { Console } = require("node:console");

var checkAllEqual = (arr) => arr.every(card => card == arr[0])

var countOccurrence = (arr) => {
    var count = {};
    arr.forEach(element => {
        count[element] = (count[element] + 1) || 1;
    });
    return count;
}

var isCountPresent = (arr, num) => {
    var count = countOccurrence(arr);
    // console.log(count);
    return Object.values(count).includes(num);
}

var isPairPresent = (arr) => isCountPresent(arr, 2)

var isThreeOfAKindPresent = (arr) => isCountPresent(arr, 3)

//Suits dont matter for four of a kind
var isFourOfAKindPresent = (faces) => isCountPresent(faces, 4)

//exclusive check
var twoPairsPresent = (arr) => {
    var count = countOccurrence(arr);
    var pairCount = 0;
    Object.values(count).forEach(number => {
        if (number == 2) {
            pairCount++;
        }
    })
    return pairCount == 2;
}

var deleteOneIfPresent = (arr) => {
    // console.log(arr)
    indexOfOne = arr.indexOf(1); //Check if Ace is present
    if (indexOfOne != -1) {
        arr.splice(indexOfOne, 1)
    }
    return arr;
}

var areNumbersInSequence = (arr) => {
    // console.log(arr)
    arr = deleteOneIfPresent(arr);
    sortedArray = arr.sort((a, b) => a - b);
    console.log('sorted array')
    console.log(sortedArray)
    subtractionArray = [];
    for (let index = 1; index < sortedArray.length; index++) {
        subtractionArray.push(sortedArray[index] - sortedArray[index - 1]) // if numbers are in sequence then this array will be all 1.       
    }
    // console.log('are numbers in sequence?')
    // console.log(checkAllEqual(subtractionArray) && subtractionArray[0] == 1)
    return checkAllEqual(subtractionArray) && subtractionArray[0] == 1;
}

var convertFacesToNumeric = (faces) => {
    kvPairs = {
        'T': 10,
        'J': 11,
        'Q': 12,
        'K': 13,
        'A': 14
    }

    Object.keys(kvPairs).forEach(element => {
        var index = faces.indexOf(element);
        if (index != -1) {
            faces.splice(index, 1, kvPairs[element])
            console.log(typeof (kvPairs[element]))
        }
    })
    return faces;
}

var areArraysEqual = (arr1, arr2) => {

    if (arr1.length == arr2.length) {
        for (index = 0; index < arr1.length; index++) {
            if (arr1[index] != arr2[index]) {
                console.log(arr1[index] != arr2[index])
                return false;
            }
        }
        return true;
    }
    return false;
}

var isRoyalFlush = (suits, faces) => {
    return checkAllEqual(suits) &&
        areArraysEqual(convertFacesToNumeric(faces).sort((a, b) => a - b), [10, 11, 12, 13, 14]);
}


var isStraightFlush = (suits, faces) => {
    // console.log('First condition: ', checkAllEqual(suits))
    // console.log('Second condition: ', areNumbersInSequence(faces))
    // console.log('Third condition: ', !isRoyalFlush(suits, faces))

    return checkAllEqual(suits) &&
        areNumbersInSequence(convertFacesToNumeric(faces).sort((a, b) => a - b)) &&
        !isRoyalFlush(suits, faces);
}

var isFullHouse = (faces) => {
    return isThreeOfAKindPresent(faces) &&
        isPairPresent(faces)
}

var isFlush = (suits, faces) => {
    return checkAllEqual(suits) &&
        !isRoyalFlush(suits, faces) &&
        !isStraightFlush(suits, faces);
}

//this check is for isstraight only
var isAceByKing = (faces) => {
    return faces.includes('A') && faces.includes('K');
}
//this check is for isstraight only
var replaceAcebyNum = (faces, num) => {
    var indexOfAce = faces.indexOf('A');
    faces.splice(indexOfAce, num);
    return faces;
}

var isStraight = (suits, faces) => {
    console.log('condition 1', areNumbersInSequence(convertFacesToNumeric(faces).sort((a, b) => a - b)))
    console.log('condition 2', !isStraightFlush(suits, faces))
    console.log('condition 3', !isRoyalFlush(suits, faces))

    if (isAceByKing(faces)) {
        faces = replaceAcebyNum(faces, 14)
    }
    else {
        faces = replaceAcebyNum(faces, 1)
    }

    return areNumbersInSequence(convertFacesToNumeric(faces).sort((a, b) => a - b)) &&
        !isStraightFlush(suits, faces) &&
        !isRoyalFlush(suits, faces);
}

// exclusive check
var isThreeOfAKind = (faces) => {
    return isThreeOfAKindPresent(faces) && !isFullHouse(faces);
}

// exclusive check
var isPair = (faces) => {
    return isPairPresent(faces) &&
        !twoPairsPresent(faces) &&
        !isFullHouse(faces);
}

var identifiedHand =  (suits, faces) => {

    var handChecker = {
        'Pair': isPair(faces),
        'Two Pairs': twoPairsPresent(faces),
        'Three of a kind': isThreeOfAKind(faces),
        'Straight': isStraight(suits, faces),
        'Flush': isFlush(suits, faces),
        'Full house':isFullHouse(faces),
        'Four of a kind':isFourOfAKindPresent(faces),
        'Straight flush':isStraightFlush(suits, faces),
        'Royal flush': isRoyalFlush(suits, faces) 
    }
    
    console.log(handChecker)
    Object.keys(handChecker).forEach(hand =>{
        if (handChecker[hand]){
            return hand
        }
    })
    return 'High card'

}

var returned = identifiedHand(['S', 'D', 'C', 'H', 'D'], [7, 7, 7, 7, 2])

console.log(returned)



module.exports = {
    checkAllEqual: checkAllEqual,
    countOccurrence: countOccurrence,
    isCountPresent: isCountPresent,
    isPairPresent: isPairPresent,
    isThreeOfAKindPresent: isThreeOfAKindPresent,
    isFourOfAKindPresent: isFourOfAKindPresent,
    twoPairsPresent: twoPairsPresent,
    areNumbersInSequence: areNumbersInSequence,
    convertFacesToNumeric: convertFacesToNumeric,
    isRoyalFlush: isRoyalFlush,
    areArraysEqual: areArraysEqual,
    isStraightFlush: isStraightFlush,
    isFullHouse: isFullHouse,
    isFlush: isFlush,
    isStraight: isStraight,
    isThreeOfAKind: isThreeOfAKind,
    isPair: isPair,
    identifiedHand: identifiedHand
    // a1: a1
}




