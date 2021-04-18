const { checkAllEqual, returnNum, findKeysbyValue, splitSuitAndFace, areNumbersInSequence,
    areArraysEqual, faceTranslator, bubbleSortRankings, outputResults, bubbleSort, isCountPresent, isAceByKing, replaceAceByNum } = require('./helper_functions');

var faceToNumber = {
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
    14: 'A',

}


var describeHand = (handValue, handSuit, handFace) => {
    wordsForFaces = {
        1: 'One',
        2: 'Two',
        3: 'Three',
        4: 'Four',
        5: 'Five',
        6: 'Six',
        7: 'Seven',
        8: 'Eight',
        9: 'Nine',
        'T': 'Ten',
        'J': 'Joker',
        'Q': 'Queen',
        'K': 'King',
        'A': 'Ace'
    }

    let description;

    if (handValue == 1) {
        description = "High card -"
        for (let index = 0; index < handFace.length - 1; index++) {
            description += " " + wordsForFaces[handFace[index]] + ","
        }
        description += " " + wordsForFaces[handFace[4]]
    }


    else if (handValue == 2) {
        let count = isCountPresent(handFace, 2)[1];
        let key = findKeysbyValue(count, 2)[0] //find the face on pair        
        description = "Pair " + key;
    }

    else if (handValue == 3) {
        let count = isCountPresent(handFace, 2)[1];
        let keys = findKeysbyValue(count, 2)
        description = "Two Pair " + wordsForFaces[keys[0]] + 's ' + wordsForFaces[keys[1]] + 's';
    }
    //Three of a kind
    else if (handValue == 4) {
        let count = isCountPresent(handFace, 3)[1];
        let keys = findKeysbyValue(count, 3)

        let oneKeys = findKeysbyValue(count, 1) // This is to get the names of faces that are not part of the three

        description = "Three " + wordsForFaces[keys[0]] + 's, with ' + wordsForFaces[oneKeys[0]] + ', ' + wordsForFaces[oneKeys[1]] + ' kickers';
    }

    else if (handValue == 5) {
        if (isAceByKing(handFace)) {
            var modhandFace = replaceAceByNum(handFace, 14)
        }
        else {
            var modhandFace = replaceAceByNum(handFace, 1)
        }

        let translatedFaces = faceTranslator(faceToNumber, modhandFace).sort((a, b) => a - b);

        if (translatedFaces[translatedFaces.length - 1] < 11) {
            description = translatedFaces[translatedFaces.length - 1] + '-high straight'
        }
        else {
            description = wordsForFaces[faceTranslator(numberToFace, translatedFaces)[translatedFaces.length - 1]] + '-high straight'
        }

    }

    else if (handValue == 6) {
        if (isAceByKing(handFace)) {
            var modhandFace = replaceAceByNum(handFace, 14)
        }
        else {
            var modhandFace = replaceAceByNum(handFace, 1)
        }

        let translatedFaces = faceTranslator(faceToNumber, modhandFace).sort((a, b) => a - b);

        if (translatedFaces[translatedFaces.length - 1] < 11) {
            description = translatedFaces[translatedFaces.length - 1] + '-high flush'
        }
        else {
            description = wordsForFaces[faceTranslator(numberToFace, translatedFaces)[translatedFaces.length - 1]] + '-high flush'
        }
    }

    else if (handValue == 7) {
        let count = isCountPresent(handFace, 3)[1];
        let threeOfAKindKeys = findKeysbyValue(count, 3)
        let pairKeys = findKeysbyValue(count, 2) // Get pair

        description = "Full house - Three " + wordsForFaces[threeOfAKindKeys[0]] + "s and " + "Two " + wordsForFaces[pairKeys[0]] + "s"

    }

    else if (handValue == 8) {
        let count = isCountPresent(handFace, 4)[1];
        let fourOfAKindKeys = findKeysbyValue(count, 4)

        let oneKeys = findKeysbyValue(count, 1) //"fifth card"

        description = "Four " + wordsForFaces[fourOfAKindKeys[0]] + 's, with ' + wordsForFaces[oneKeys[0]];
    }

    else if (handValue == 9) {
        if (isAceByKing(handFace)) {
            var modhandFace = replaceAceByNum(handFace, 14)
        }
        else {
            var modhandFace = replaceAceByNum(handFace, 1)
        }

        let translatedFaces = faceTranslator(faceToNumber, modhandFace).sort((a, b) => a - b);

        if (translatedFaces[translatedFaces.length - 1] < 11) {
            description = translatedFaces[translatedFaces.length - 1] + '-high straight flush'
        }
        else {
            description = wordsForFaces[faceTranslator(numberToFace, translatedFaces)[translatedFaces.length - 1]] + '-high straight flush'
        }

    }

    else if (handValue == 10) {
        description = "Royal Flush" //no description needed because royal flush is unique except the suits.

    }

    return description;
}

module.exports = {
    describeHand: describeHand
}