const { checkAllEqual, returnNum, findKeysbyValue, splitSuitAndFace, areNumbersInSequence,
    areArraysEqual, faceTranslator, bubbleSortRankings, outputResults, bubbleSort,
    isCountPresent, countOccurrence, isAceByKing, replaceAceByNum, areSameSets } = require('./helper_functions');

var faceToNumber = {
    'T': 10,
    'J': 11,
    'Q': 12,
    'K': 13,
    'A': 14
}

//Used for breaking tie for several hands: High Card, Straight, Flush, Full house, Straight Flush
var tieBreakMultiple = (faceSet1, faceSet2, num) => {
    // Check if cards are identical outside!!!!
    //num does nothing. dont remove. its there to reduce code size when calling bubble sort.    
    let set1 = [...faceSet1];
    let set2 = [...faceSet2];

    set1 = faceTranslator(faceToNumber, set1).sort((a, b) => b - a)
    set2 = faceTranslator(faceToNumber, set2).sort((a, b) => b - a)

    for (let index = 0; index < 5; index++) {
        if (set1[index] > set2[index]) {
            return [1, 0];
        }
        else if (set2[index] > set1[index]) {
            return [0, 1];
        }
    }
}

var tieBreakTwoPair = (faceSet1, faceSet2, num) => {
    //num does nothing. dont remove. its there to reduce code size when calling bubble sort.    
    // Check if cards are identical outside!!!!    
    let set1 = [...faceSet1];
    let set2 = [...faceSet2];

    let isSet1Greater = 0;
    let isSet2Greater = 0;

    set1 = faceTranslator(faceToNumber, faceTranslator(faceToNumber, set1)) //because facetranslator doesnt replace all instances of a letter.
    set2 = faceTranslator(faceToNumber, faceTranslator(faceToNumber, set2))

    let count1 = isCountPresent(set1, 2)[1];
    let set1pairs = findKeysbyValue(count1, 2)

    let count2 = isCountPresent(set2, 2)[1];
    let set2pairs = findKeysbyValue(count2, 2)

    if (Math.max(...set1pairs) > Math.max(...set2pairs)) {
        isSet1Greater = 1
    }
    else if (Math.max(...set2pairs) > Math.max(...set1pairs)) {
        isSet2Greater = 1
    }
    else {
        let fifthCardSet1 = set1.filter(x => x != set1pairs[0] && x != set1pairs[1])
        let fifthCardSet2 = set2.filter(x => x != set2pairs[0] && x != set2pairs[1])

        // console.log(fifthCardSet1)
        // console.log(fifthCardSet2)

        if (fifthCardSet1 > fifthCardSet2) {
            isSet1Greater = 1
        }
        else {
            isSet2Greater = 1
        }

    }

    return [isSet1Greater, isSet2Greater];
}

// This function can break tie for pair, three of a kind and four of a kind
var tieBreak234OfAKind = (faceSet1, faceSet2, num) => {

    if (areSameSets(faceSet1, faceSet2)) {
        return [0, 0]
    }

    let set1 = [...faceSet1];
    let set2 = [...faceSet2];

    let isSet1Greater = 0;
    let isSet2Greater = 0;

    set1 = faceTranslator(faceToNumber, set1) //because facetranslator doesnt replace all instances of a letter.
    set2 = faceTranslator(faceToNumber, set2)

    let count1 = isCountPresent(set1, num)[1];
    let key1 = parseInt(findKeysbyValue(count1, num)[0]) //find the face on pair        

    let count2 = isCountPresent(set2, 2)[1];
    let key2 = parseInt(findKeysbyValue(count2, num)[0]) //find the face on pair        

    // console.log('keys')
    // console.log(count1);
    // console.log(count2);
    // console.log('key1: ', key1);
    // console.log('key2: ', key2);

    if (key1 > key2) {
        isSet1Greater = 1;
    }
    else if (key2 > key1) {
        isSet2Greater = 1;
    }
    else { //key2 == key1
        set1 = set1.filter(x => x != key1).sort((a, b) => b - a)
        set2 = set2.filter(x => x != key2).sort((a, b) => b - a)

        // console.log('sets')
        // console.log(set1)
        // console.log(set2)

        if (set1[0] > set2[0]) {
            isSet1Greater = 1;
        }
        else {
            isSet2Greater = 1;
        }
    }
    return [isSet1Greater, isSet2Greater];
}




//returns the hand numbers of all the hands that have ties.
var tieChecker = (playerInfo) => {

    // Example:
    // KS AD 3H 7C TD
    // John 9H 7S
    // Sam AC KH
    // Becky JD QC
    // Ted 3D 8S

    let ties = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0,
    };
    playerInfo.forEach(player => {
        ties[player.handNumber] += 1
    })

    let tieHands = [];

    Object.values(ties).forEach(num => {
        if (ties[num] > 1) {
            tieHands.push(num)
        }
    })

    return tieHands;
}



module.exports = {
    tieBreak234OfAKind: tieBreak234OfAKind,
    tieBreakMultiple: tieBreakMultiple,
    tieBreakTwoPair: tieBreakTwoPair,
    tieChecker: tieChecker
}