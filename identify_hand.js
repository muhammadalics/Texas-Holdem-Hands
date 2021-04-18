const { checkAllEqual, returnNum, findKeysbyValue, splitSuitAndFace, areNumbersInSequence,
    areArraysEqual, faceTranslator, bubbleSortRankings, outputResults, bubbleSort,
    isCountPresent, countOccurrence, isAceByKing, replaceAceByNum } = require('./helper_functions');

var isPairPresent = (arr) => isCountPresent(arr, 2)[0]

var isThreeOfAKindPresent = (arr) => isCountPresent(arr, 3)[0]

var isFourOfAKindPresent = (faces) => isCountPresent(faces, 4)[0]

//exclusive check
var twoPairsPresent = (arr) => {
    let count = countOccurrence(arr);
    let pairCount = 0;
    Object.values(count).forEach(number => {
        if (number == 2) { pairCount++; }
    })
    return pairCount == 2;
}


var faceToNumber = {
    'T': 10,
    'J': 11,
    'Q': 12,
    'K': 13,
    'A': 14
}


var isRoyalFlush = (suits, faces) => {
    return checkAllEqual(suits) &&
        areArraysEqual(faceTranslator(faceToNumber, faces).sort((a, b) => a - b), [10, 11, 12, 13, 14]);
}

var isStraightFlush = (suits, faces) => {
    return checkAllEqual(suits) &&
        areNumbersInSequence(faceTranslator(faceToNumber, faces).sort((a, b) => a - b)) &&
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

var isStraight = (suits, faces) => {
    let copiedSuits = [...suits];
    let copiedFaces = [...faces];

    if (copiedFaces.includes('A')) {
        let replaceNum = isAceByKing(copiedFaces) ? 14 : 1;
        replaceAceByNum(copiedFaces, replaceNum);
    }

    return areNumbersInSequence(faceTranslator(faceToNumber, copiedFaces).sort((a, b) => a - b)) &&
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

    let handChecker = {
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

    let keys = Object.keys(handChecker)

    let trueHand = ''
    Object.keys(handChecker).forEach(hand => {
        if (handChecker[hand] == true) {
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


var comboMaker = (playerFaces, playerSuits, communityFaces, communitySuits) => {

    let faceCombos = []
    let suitCombos = []

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

    return [suitCombos, faceCombos]

}


var getHand = (playerFaces, playerSuits, communityFaces, communitySuits) => {

    let suitCombos, faceCombos;
    [suitCombos, faceCombos] = comboMaker(playerFaces, playerSuits, communityFaces, communitySuits);

    var handValue = 0;
    let handSuit;
    let handFace;


    for (let index = 0; index < faceCombos.length; index++) {
        if (identifiedHand(suitCombos[index], faceCombos[index])[1] > handValue) {

            handValue = identifiedHand(suitCombos[index], faceCombos[index])[1]
            handSuit = suitCombos[index]
            handFace = faceCombos[index]
        }

    }
    return [handValue, handSuit, handFace]
}


module.exports = {
    isPairPresent: isPairPresent,
    isThreeOfAKind: isThreeOfAKind,
    isThreeOfAKindPresent:isThreeOfAKindPresent,
    isFourOfAKindPresent: isFourOfAKindPresent,
    twoPairsPresent: twoPairsPresent,
    isRoyalFlush: isRoyalFlush,
    isStraightFlush: isStraightFlush,
    isFullHouse: isFullHouse,
    isFlush: isFlush,
    isStraight: isStraight,   
    isPair: isPair,
    identifiedHand:identifiedHand,
    comboMaker:comboMaker,
    getHand:getHand

}