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

// var deleteOneIfPresent = (arr) => {
//     // console.log(arr)
//     indexOfOne = arr.indexOf(1); //Check if Ace is present
//     // console.log('Index of One: ', indexOfOne)
//     if (indexOfOne != -1) {
//         arr.splice(indexOfOne, 1)
//     }
//     return arr;
// }

var areNumbersInSequence = (arr) => {
    // console.log(arr)
    // arr = deleteOneIfPresent(arr);
    // console.log('Before sorting:', arr);
    sortedArray = arr.sort((a, b) => a - b);
    // console.log('sorted array')
    // console.log(sortedArray)
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
            // console.log(typeof (kvPairs[element]))
        }

    })
    // console.log('convert faces to numerics', faces)
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
var replaceAceByNum = (faces, num) => {
    var indexOfAce = faces.indexOf('A');
    // console.log(indexOfAce);
    faces.splice(indexOfAce, 1, num);
    // console.log('replace ace by num: ', faces)
    return faces;
}

// var isStraight = (suits, faces) => {
//     console.log('condition 1', areNumbersInSequence(convertFacesToNumeric(faces).sort((a, b) => a - b)))
//     console.log('condition 2', !isStraightFlush(suits, faces))
//     console.log('condition 3', !isRoyalFlush(suits, faces))

//     if (isAceByKing(faces)) {
//         faces = replaceAcebyNum(faces, 14)
//     }
//     else {
//         faces = replaceAcebyNum(faces, 1)
//     }

//     return areNumbersInSequence(convertFacesToNumeric(faces).sort((a, b) => a - b)) &&
//         !isStraightFlush(suits, faces) &&
//         !isRoyalFlush(suits, faces);
// }

// var isStraight = (suits, faces) => {
//     if (isAceByKing(faces)) {
//         faces = replaceAceByNum(faces, 14)
//     }
//     else {
//         faces = replaceAceByNum(faces, 1)
//     }

//     return areNumbersInSequence(convertFacesToNumeric(faces).sort((a, b) => a - b)) &&
//         !isStraightFlush(suits, faces) &&
//         !isRoyalFlush(suits, faces);
// }


var isStraight = (suits, faces) => {
    let copiedSuits = [...suits];
    let copiedFaces = [...faces];

    // console.log('freshly copied faces: ', copiedFaces)
    // console.log('freshly copied suits: ', copiedSuits)

    if (copiedFaces.includes('A')){
        if (isAceByKing(copiedFaces)) {
            console.log('inside if ', copiedFaces);
            replaceAceByNum(copiedFaces, 14)
        }
        else {
            replaceAceByNum(copiedFaces, 1)
        }
    }

    // console.log('copied faces', copiedFaces)
    // console.log('condition 1', areNumbersInSequence(convertFacesToNumeric(copiedFaces).sort((a, b) => a - b)))
    // console.log('condition 2', !isStraightFlush(copiedSuits, copiedFaces))
    // console.log('condition 3', !isRoyalFlush(copiedSuits, copiedFaces))

    return areNumbersInSequence(convertFacesToNumeric(copiedFaces).sort((a, b) => a - b)) &&
        !isStraightFlush(copiedSuits, copiedFaces) &&
        !isRoyalFlush(copiedSuits, copiedFaces);
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

var identifiedHand = (suits, faces) => {

    const handValue = {
        'High card': 1,
        'Pair': 2,
        'Two Pairs': 3,
        'Three of a kind': 4,
        'Straight': 5,
        'Flush': 6,
        'Full house': 7,
        'Four of a kind': 8,
        'Straight flush': 9,
        'Royal flush': 10
    }

    var handChecker = {
        'Pair': isPair(faces),
        'Two Pairs': twoPairsPresent(faces),
        'Three of a kind': isThreeOfAKind(faces),
        'Straight': isStraight(suits, faces),
        'Flush': isFlush(suits, faces),
        'Full house': isFullHouse(faces),
        'Four of a kind': isFourOfAKindPresent(faces),
        'Straight flush': isStraightFlush(suits, faces),
        'Royal flush': isRoyalFlush(suits, faces)
    }

    var keys = Object.keys(handChecker)

    let trueHand = ''
    Object.keys(handChecker).forEach(hand => {
        if (handChecker[hand] == true) {
            // console.log(hand);
            trueHand = hand
        }
    })

    if (trueHand != '') {
        return [trueHand, handValue[trueHand]];
    }
    else {
        return ['High card', handValue['High card']];
    }
}


// var returned = isFullHouse([7, 7, 7, 2, 2])
// console.log(returned)

// var returned2 = identifiedHand(['S', 'D', 'C', 'H', 'D'], [7, 7, 7, 7, 2])
// console.log(returned2)


// console.log(isStraight(['C', 'D', 'D', 'S', 'H'], ['A', 'J', 'Q', 'K', 'T'])) //424

var comboMaker = (playerFaces, playerSuits, communityFaces, communitySuits) => {
    // var playerFaces = [4, 9]
    // var playerSuits = ['C', 'D']
    // var communityFaces = [2, 5, 'T', 'J', 'K']
    // var communitySuits = ['H', 'S', 'C', 'D', 'S']

    // for (let p = 0; p < playerFaces.length; p++) {
    //     for (let c = 0; c < communityFaces.length; c++) {
    //         let clonedPlayerFaces = [...playerFaces];
    //         let clonedcommunityFaces = [...communityFaces];

    //         clonedcommunityFaces.splice(c, 1, playerFaces[p])
    //         console.log(clonedcommunityFaces);
    //     }
    // }

    // for (let p = 0; p < playerFaces.length; p++) {
    //     for (let c = 0; c < communityFaces.length; c++) {
    //         for (let t = 0; t < communityFaces.length; t++) {

    //             var clonedPlayerFaces = [...playerFaces];
    //             var clonedcommunityFaces = [...communityFaces];

    //             clonedcommunityFaces.splice(c, 1, playerFaces[p])

    //             if (t != c) {
    //                 // clonedcommunityFaces.splice(c, 1, playerFaces[p + 1])
    //                 // clonedcommunityFaces.splice(c, 1, playerFaces[p])
    //                 clonedcommunityFaces.splice(t, 1, playerFaces[p])
    //             }

    //             console.log(clonedcommunityFaces);
    //         }

    //         // clonedcommunityFaces.splice(c, 1, playerFaces[p + 1])
    //         // console.log(clonedcommunityFaces)
    //     }
    // }

    var faceCombos = []
    var suitCombos = []
    // var clonedPlayerFaces = [...playerFaces];
    // var clonedcommunityFaces = [...communityFaces];

    for (let c = 0; c < communityFaces.length; c++) {
        for (let t = 0; t < communityFaces.length; t++) {
            let clonedPlayerFaces = [...playerFaces];
            let clonedcommunityFaces = [...communityFaces];
            clonedcommunityFaces.splice(c, 1, playerFaces[0])
            let clonedcommunitySuits = [...communitySuits];
            clonedcommunitySuits.splice(c, 1, playerSuits[0])

            if (t != c) {
                clonedcommunityFaces.splice(t, 1, playerFaces[1])
                faceCombos.push(clonedcommunityFaces)
                clonedcommunitySuits.splice(t, 1, playerSuits[1])
                suitCombos.push(clonedcommunitySuits)
            }
        }
    }

    for (let c = 0; c < communityFaces.length; c++) {
        let clonedPlayerFaces = [...playerFaces];
        let clonedcommunityFaces = [...communityFaces];
        clonedcommunityFaces.splice(c, 1, playerFaces[0])
        faceCombos.push(clonedcommunityFaces)

        let clonedcommunitySuits = [...communitySuits];
        clonedcommunitySuits.splice(c, 1, playerSuits[0])
        suitCombos.push(clonedcommunitySuits)


    }

    for (let c = 0; c < communityFaces.length; c++) {
        let clonedPlayerFaces = [...playerFaces];
        let clonedcommunityFaces = [...communityFaces];
        clonedcommunityFaces.splice(c, 1, playerFaces[1])
        faceCombos.push(clonedcommunityFaces)

        let clonedcommunitySuits = [...communitySuits];
        clonedcommunitySuits.splice(c, 1, playerSuits[1])
        suitCombos.push(clonedcommunitySuits)

    }




    // console.log(faceCombos)
    // console.log(suitCombos)


    return [suitCombos, faceCombos]

}





var getHand = (playerFaces, playerSuits, communityFaces, communitySuits) => {

    var suitCombos, faceCombos;
    [suitCombos, faceCombos] = comboMaker(playerFaces, playerSuits, communityFaces, communitySuits);

    var handValue = 0;
    for (let index = 0; index < faceCombos.length; index++) {
        if (identifiedHand(suitCombos[index], faceCombos[index])[1] > handValue) {

            handValue = identifiedHand(suitCombos[index], faceCombos[index])[1]
        }

    }
    return handValue
}


console.log(isStraight(['S', 'S', 'D', 'D', 'H'], [8, 7, 6, 5, 4]))

// console.log(
//     getHand(['A', 4],
//         ['S', 'D'],
//         [4, 'K', 4, 8, 7],
//         ['C', 'S', 'H', 'S', 'S']
//     )
// )


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
    identifiedHand: identifiedHand,
    getHand: getHand
    // a1: a1
}




