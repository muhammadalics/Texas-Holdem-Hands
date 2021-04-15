const { arrayExpression } = require("@babel/types");

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

var isFourOfAKindPresent = (arr) => isCountPresent(arr, 4)

var twoPairsPresent = (arr) => {
    var count = countOccurrence(arr);
    var pairCount = 0;
    Object.values(count).forEach(number => {
        if (number == 2){
            pairCount++;
        }
    })
    return pairCount == 2;
}

var deleteOneIfPresent = (arr) => {
    indexOfOne = arr.indexOf(1); //Check if Ace is present
    if ( indexOfOne != -1 ){
        arr.splice(indexOfOne, 1)
    }
    return arr;
}

var areNumbersInSequence = (arr) => {
    arr = deleteOneIfPresent(arr);
    sortedArray = arr.sort();
    subtractionArray = [];
    for(let index=1; index < sortedArray.length; index++ ){
        subtractionArray.push(sortedArray[index] - sortedArray[index -1]) // if numbers are in sequence then this array will be all 1.       
    }
    return checkAllEqual(subtractionArray) && subtractionArray[0] == 1;
}



var isFlush = (suits) => {
    return checkAllEqual(suits)
}

var isHandPair = (arr) => {
    return isPairPresent(arr) && twoPairsPresent(arr) == false ;
}



console.log(areNumbersInSequence([2,3,4,5,6, 1]))


module.exports = {
    checkAllEqual: checkAllEqual,
    countOccurrence: countOccurrence,
    isCountPresent: isCountPresent,
    isPairPresent: isPairPresent,
    isThreeOfAKindPresent: isThreeOfAKindPresent,
    isFourOfAKindPresent: isFourOfAKindPresent,
    twoPairsPresent: twoPairsPresent,
    areNumbersInSequence: areNumbersInSequence
    // a1: a1
}




