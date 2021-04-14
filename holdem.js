
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
    if (Object.values(count).includes(num)){
        return true
    }
    else{
        return false;
    }
    
}

var isPairPresent = (arr) => isCountPresent(arr, 2)

var isThreeOfAKindPresent = (arr) => isCountPresent(arr, 3)

// var isFourOfAKindPresent = (arr) => isCountPresent(arr, 4)



console.log(isCountPresent([1,1,2,2,3,4,5], 3))




module.exports = {
    checkAllEqual: checkAllEqual,
    countOccurrence: countOccurrence,
    isCountPresent: isCountPresent,
    isPairPresent: isPairPresent,
    isThreeOfAKindPresent: isThreeOfAKindPresent
    // a1: a1
}




