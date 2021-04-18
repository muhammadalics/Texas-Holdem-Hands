const { arrayExpression, isFlowBaseAnnotation } = require("@babel/types");
// const { Console } = require("node:console");

// const { returnNum} = require('./helper_functions.js')

// import {returnNum} from './helper_functions';

var helper_functions = require('./helper_functions');

var checkAllEqual = (arr) => arr.every(card => card == arr[0])

var countOccurrence = (arr) => {
    let count = {};
    arr.forEach(element => {
        count[element] = (count[element] + 1) || 1;
    });
    return count;
}

var isCountPresent = (arr, num) => {
    let count = countOccurrence(arr);   
    return [Object.values(count).includes(num), count];
}

var isPairPresent = (arr) => isCountPresent(arr, 2)[0]

var isThreeOfAKindPresent = (arr) => isCountPresent(arr, 3)[0]

var isFourOfAKindPresent = (faces) => isCountPresent(faces, 4)[0]

//exclusive check
var twoPairsPresent = (arr) => {
    let count = countOccurrence(arr);
    let pairCount = 0;
    Object.values(count).forEach(number => {
        if (number == 2) {pairCount++;}
    })
    return pairCount == 2;
}

var areNumbersInSequence = (arr) => {
    sortedArray = arr.sort((a, b) => a - b);
    subtractionArray = [];
    for (let index = 1; index < sortedArray.length; index++) {
        subtractionArray.push(sortedArray[index] - sortedArray[index - 1]) // if numbers are in sequence then this array will be all 1.       
    }
    return checkAllEqual(subtractionArray) && subtractionArray[0] == 1;
}

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

var faceTranslator = (scheme, faces) => {
    Object.keys(scheme).forEach(element => {
        element = helper_functions.returnNum(element)
        for (i = 0; i < 4; i++) {
            let index = faces.indexOf(element);
            if (index != -1) {
                faces.splice(index, 1, scheme[element])
            }
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

//this check is for isstraight only
var isAceByKing = (faces) => {
    return faces.includes('A') && (faces.includes('K') || faces.includes('Q') || faces.includes('J') || faces.includes('T'));
}
//this check is for isstraight only
var replaceAceByNum = (faces, num) => {
    let indexOfAce = faces.indexOf('A');   
    faces.splice(indexOfAce, 1, num);
    return faces;
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



let readline = require('readline');
var readUserInput = () => {


    let input = [];

    let rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.prompt();

    return new Promise((resolve, reject) => {

        rl.on('line', function (cmd) {

            input.push(cmd);
        });

        rl.on('close', function (cmd) {

            resolve(input)

        });


    })
};

// var returnNum = (val) => {
//     let value = !isNaN(val) ? parseInt(val):val;
//     return value;   
// }

var splitSuitAndFace = (arr) => {
    let suits = [];
    let faces = [];

    arr.forEach(element => {
        faces.push(helper_functions.returnNum(element.charAt(0)))
        suits.push(element.charAt(1))
    })

    return [suits, faces];
}

var parseInput = (userInput) => {
    let extracteddata = userInput[0].split(" ")  
    let communityFaces;
    let communitySuits;
    [communityFaces, communitySuits] = splitSuitAndFace(extracteddata);
    let playerSuitsAndFaces = {}

    for (let index = 1; index < userInput.length; index++) {
        let extracteddata = userInput[index].split(" ")
        playerSuitsAndFaces[extracteddata[0]] = [splitSuitAndFace(extracteddata.slice(1))[0], splitSuitAndFace(extracteddata.slice(1))[1]]
    }

    return [communitySuits, communityFaces, playerSuitsAndFaces]

}

var findKeysbyValue = (givenObject, val) => {
    let keys = Object.keys(givenObject);
    let allInstances = keys.filter(key => givenObject[key] == val)
    return allInstances;
};

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

var areSameSets = (set1, set2) => {
    return set1.every((val, index) => val === set2[index]);
}

// https://www.pokerstarsschool.com/lessons/poker-hand-rankings/
//dont use. use tieBreakmultiple instead
var tieBreakHighCard = (faceSet1, faceSet2) => {
    // Check if cards are identical outside!!!!    
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


// use tieBreak234OfAKind instead of this:
var tieBreakPair = (faceSet1, faceSet2) => {

    if (areSameSets(faceSet1, faceSet2)) {
        return [0, 0]
    }

    let set1 = [...faceSet1];
    let set2 = [...faceSet2];

    let isSet1Greater = 0;
    let isSet2Greater = 0;

    // set1 = replaceAceByFourteen(set1);
    // set2 = replaceAceByFourteen(set2);

    set1 = faceTranslator(faceToNumber, set1) //because facetranslator doesnt replace all instances of a letter.
    set2 = faceTranslator(faceToNumber, set2)

    let count1 = isCountPresent(set1, 2)[1];
    let key1 = parseInt(findKeysbyValue(count1, 2)[0]) //find the face on pair        

    let count2 = isCountPresent(set2, 2)[1];
    let key2 = parseInt(findKeysbyValue(count2, 2)[0]) //find the face on pair        

    console.log('keys')
    console.log(count1);
    console.log(count2);
    console.log('key1: ', key1);
    console.log('key2: ', key2);

    if (key1 > key2) {
        isSet1Greater = 1;
    }
    else if (key2 > key1) {
        isSet2Greater = 1;
    }
    else { //key2 == key1
        set1 = set1.filter(x => x != key1).sort((a, b) => b - a)
        set2 = set2.filter(x => x != key2).sort((a, b) => b - a)

        console.log('sets')
        console.log(set1)
        console.log(set2)

        if (set1[0] > set2[0]) {
            isSet1Greater = 1;
        }
        else {
            isSet2Greater = 1;
        }
    }
    return [isSet1Greater, isSet2Greater];
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

        console.log(fifthCardSet1)
        console.log(fifthCardSet2)

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

    console.log('keys')
    console.log(count1);
    console.log(count2);
    console.log('key1: ', key1);
    console.log('key2: ', key2);

    if (key1 > key2) {
        isSet1Greater = 1;
    }
    else if (key2 > key1) {
        isSet2Greater = 1;
    }
    else { //key2 == key1
        set1 = set1.filter(x => x != key1).sort((a, b) => b - a)
        set2 = set2.filter(x => x != key2).sort((a, b) => b - a)

        console.log('sets')
        console.log(set1)
        console.log(set2)

        if (set1[0] > set2[0]) {
            isSet1Greater = 1;
        }
        else {
            isSet2Greater = 1;
        }
    }
    return [isSet1Greater, isSet2Greater];
}



let bubbleSort = (faces, tieBreakFn, num) => {

    let sortedFaces = [...faces]

    for (let i = 0; i < sortedFaces.length - 1; i++) {
        for (let j = 0; j < sortedFaces.length - 1; j++) {
            let ranking = tieBreakFn(sortedFaces[j], sortedFaces[j + 1], num)
            if (ranking[0] < ranking[1]) {
                let tmp = sortedFaces[j];
                sortedFaces[j] = sortedFaces[j + 1];
                sortedFaces[j + 1] = tmp;
            }
        }
    }
    return sortedFaces;
};

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





let bubbleSortRankings = (playerInfo) => {

    for (let i = 0; i < playerInfo.length - 1; i++) {
        for (let j = 0; j < playerInfo.length - 1; j++) {          
            if (playerInfo[j].handNumber < playerInfo[j+1].handNumber) {
                let tmp = playerInfo[j];
                playerInfo[j] = playerInfo[j + 1];
                playerInfo[j + 1] = tmp;
            }
        }
    }
    return playerInfo;
};


let outputResults = (playerInfo) => {

    for (let i=0; i < playerInfo.length; i++){
        console.log(i+1, ' ', playerInfo[i].name, ' ',  playerInfo[i].description)
    }

}



    // ; ( async () => {
    //     // console.log(await question("how old are you? "));
    //     response = await question("how old are you? ");
    //     parseInput(response);


    // })();


    ; (async () => {
        // faceTranslator(numberToFace, [12, 11, 13, 14, 10])
        // describeHand(1, ['C', 'D', 'D', 'S', 'H'], ['A', 'Q', 'K', 'J', 'T'])
        // tieBreakTwoPair(['Q', 'Q', 7, 7, 3], ['Q', 'Q', 7, 7, 1]);
        // tieBreak234OfAKind(['A', 'A', 'Q', 'A', 'K'], ['A', 'A', 'T', 'A', 'Q'], 3)
        // bubbleSort([[2, 7, 9, 9, 9], [2, 7, 'T', 'T', 'T'],[2, 7, 'A', 'A', 'A'], ['K', 'Q', 'K', 'K', 'A']], tieBreakThreeOfAKind )

        // Straight, Flush, Full house, Straight Flush

        var fnNames = {
            1: [tieBreakMultiple, undefined],
            2: [tieBreak234OfAKind, 2],
            3: [tieBreakTwoPair, undefined],
            4: [tieBreak234OfAKind, 3],
            5: [tieBreakMultiple, undefined],
            6: [tieBreakMultiple,undefined],
            7: [tieBreakMultiple,undefined],
            8: [tieBreak234OfAKind, 4],
            9: [tieBreakMultiple,undefined],
            10: [tieBreakMultiple,undefined], // check please!!!!!!!!!!!!!!!!!!!

        }

        response = await readUserInput();

        var communityFaces;
        var communitySuits;
        var playerSuitsAndFaces;
        [communitySuits, communityFaces, playerSuitsAndFaces] = parseInput(response);

        // var playerHand = {}
        var playerInfo = []
        console.log('hello')
        console.log(playerSuitsAndFaces)

        console.log(Object.keys(playerSuitsAndFaces));

        Object.keys(playerSuitsAndFaces).map(name => {
            // console.log('inside map function')
            // console.log(name);
            // console.log(playerHand);
            // console.log(playerSuitsAndFaces[1]);
            // console.log(playerSuitsAndFaces[0]);
            // console.log(communityFaces);
            // console.log(communitySuits);
            let playerHand = {}

            let handInfo = getHand(playerSuitsAndFaces[name][1], playerSuitsAndFaces[name][0], communitySuits, communityFaces)

            // playerHand[name] = getHand(playerSuitsAndFaces[name][1], playerSuitsAndFaces[name][0], communitySuits, communityFaces);

            playerHand['name'] = name;
            playerHand['handNumber'] = handInfo[0]
            playerHand['suits'] = handInfo[1]
            playerHand['faces'] = handInfo[2]
            playerHand['description'] = describeHand(handInfo[0], handInfo[1], handInfo[2])

            playerInfo.push(playerHand)

            let tieHands = tieChecker(playerInfo)

            tieHands.forEach(handnum => {
                let tieNames = [];
                let tieFaces = [];
                for (let index = 0; index < playerInfo.length; index++) {
                    if(playerInfo[index].handNumber == handnum){
                        tieNames.push(playerInfo[index].name)
                        tieFaces.push(playerInfo[index].faces)
                    }                   
                }

                let rankedfaces = bubbleSort(tieFaces, fnNames[handnum][0],fnNames[handnum][1]);

                console.log('ranked faces')
                console.log(rankedfaces)

                for(let i=0; i < rankedfaces.length; i++){
                    for(let j=0; j < tieFaces.length; j++){
                        if(areSameSets(rankedfaces[i], tieFaces[j])){                           
                            playerInfo.forEach(player => {
                                if (player.name == tieNames[j]){
                                    player.handNumber -= i *0.1 //this is correct
                                }
                            })
                            
                        }

                    }
                }

            })

            // console.log(playerSuitsAndFaces[name][1], playerSuitsAndFaces[name][0], communitySuits, communityFaces);


        });

        // console.log(playerInfo);
        // console.log(tieChecker(playerInfo))

        finalRankings = bubbleSortRankings(playerInfo);
        outputResults(finalRankings)


    })();







module.exports = {
    checkAllEqual: checkAllEqual,
    countOccurrence: countOccurrence,
    isCountPresent: isCountPresent,
    isPairPresent: isPairPresent,
    isThreeOfAKindPresent: isThreeOfAKindPresent,
    isFourOfAKindPresent: isFourOfAKindPresent,
    twoPairsPresent: twoPairsPresent,
    areNumbersInSequence: areNumbersInSequence,
    faceTranslator: faceTranslator,
    isRoyalFlush: isRoyalFlush,
    areArraysEqual: areArraysEqual,
    isStraightFlush: isStraightFlush,
    isFullHouse: isFullHouse,
    isFlush: isFlush,
    isStraight: isStraight,
    isThreeOfAKind: isThreeOfAKind,
    isPair: isPair,
    identifiedHand: identifiedHand,
    getHand: getHand,
    findKeysbyValue: findKeysbyValue,
    describeHand: describeHand,
    tieBreakPair: tieBreakPair,
    tieBreakHighCard: tieBreakHighCard,
    tieBreakTwoPair: tieBreakTwoPair,
    tieBreak234OfAKind: tieBreak234OfAKind,
    // tieBreakThreeOfAKind: tieBreakThreeOfAKind,
    bubbleSort: bubbleSort
    // a1: a1
}




