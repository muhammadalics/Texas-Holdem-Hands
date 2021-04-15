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
    console.log(count);
    return Object.values(count).includes(num);
}

var isPairPresent = (arr) => isCountPresent(arr, 2)

var isThreeOfAKindPresent = (arr) => isCountPresent(arr, 3)

//Suits dont matter for four of a kind
var isFourOfAKindPresent = (faces) => isCountPresent(faces, 4)

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
    console.log(arr)
    indexOfOne = arr.indexOf(1); //Check if Ace is present
    if (indexOfOne != -1) {
        arr.splice(indexOfOne, 1)
    }
    return arr;
}

var areNumbersInSequence = (arr) => {
    console.log(arr)
    arr = deleteOneIfPresent(arr);
    sortedArray = arr.sort((a, b) => a - b);
    console.log('sorted array')
    console.log(sortedArray)
    subtractionArray = [];
    for (let index = 1; index < sortedArray.length; index++) {
        subtractionArray.push(sortedArray[index] - sortedArray[index - 1]) // if numbers are in sequence then this array will be all 1.       
    }
    console.log('are numbers in sequence?')
    console.log(checkAllEqual(subtractionArray) && subtractionArray[0] == 1)
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

var isHandPair = (arr) => {
    return isPairPresent(arr) &&
        twoPairsPresent(arr) == false;
}



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
    isFullHouse:isFullHouse,
    isFlush: isFlush
    // a1: a1
}




