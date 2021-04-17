const { arrayExpression, isFlowBaseAnnotation } = require("@babel/types");
// const { Console } = require("node:console");

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
    // console.log(count);
    return [Object.values(count).includes(num), count];
}

var isPairPresent = (arr) => isCountPresent(arr, 2)[0]

var isThreeOfAKindPresent = (arr) => isCountPresent(arr, 3)[0]

//Suits dont matter for four of a kind
var isFourOfAKindPresent = (faces) => isCountPresent(faces, 4)[0]

//exclusive check
var twoPairsPresent = (arr) => {
    let count = countOccurrence(arr);
    let pairCount = 0;
    Object.values(count).forEach(number => {
        if (number == 2) {
            pairCount++;
        }
    })
    return pairCount == 2;
}

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
    // faceToNumber = {
    //     'T': 10,
    //     'J': 11,
    //     'Q': 12,
    //     'K': 13,
    //     'A': 14
    // }

    // console.log(Object.keys(scheme))

    Object.keys(scheme).forEach(element => {
        element = returnNum(element)
        let index = faces.indexOf(element);
        // console.log(element)
        // console.log(index);
        if (index != -1) {
            // console.log(scheme[element]);            
            faces.splice(index, 1, scheme[element])

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
        areArraysEqual(faceTranslator(faceToNumber, faces).sort((a, b) => a - b), [10, 11, 12, 13, 14]);
}


var isStraightFlush = (suits, faces) => {
    // console.log('First condition: ', checkAllEqual(suits))
    // console.log('Second condition: ', areNumbersInSequence(faces))
    // console.log('Third condition: ', !isRoyalFlush(suits, faces))

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
    // console.log(indexOfAce);
    faces.splice(indexOfAce, 1, num);
    // console.log('replace ace by num: ', faces)
    return faces;
}

var isStraight = (suits, faces) => {
    let copiedSuits = [...suits];
    let copiedFaces = [...faces];

    // console.log('freshly copied faces: ', copiedFaces)
    // console.log('freshly copied suits: ', copiedSuits)

    if (copiedFaces.includes('A')) {
        if (isAceByKing(copiedFaces)) {
            // console.log('inside if ', copiedFaces);
            replaceAceByNum(copiedFaces, 14)
        }
        else {
            replaceAceByNum(copiedFaces, 1)
        }
    }

    // console.log('copied faces', copiedFaces)
    // console.log('condition 1', areNumbersInSequence(faceTranslator(copiedFaces).sort((a, b) => a - b)))
    // console.log('condition 2', !isStraightFlush(copiedSuits, copiedFaces))
    // console.log('condition 3', !isRoyalFlush(copiedSuits, copiedFaces))

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

    // console.log(handChecker);
    let keys = Object.keys(handChecker)

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


// console.log(isStraight(['S', 'S', 'D', 'D', 'H'], [8, 7, 6, 5, 4]))

// console.log(
//     getHand(['A', 4],
//         ['S', 'D'],
//         [4, 'K', 4, 8, 7],
//         ['C', 'S', 'H', 'S', 'S']
//     )
// )





// const readline = require('readline').createInterface({
//     input: process.stdin,
//     output: process.stdout
//   });

//   readline.question('Who are you?', name => {
//     console.log(`Hey there ${name}!`);
//     readline.close();
//   });


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
            // console.log(input)
            // console.log(input.join('\n'));
            // process.exit(0);
        });


    })
};









// const readline = require('readline');

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

//  var question = function(q){

//     var response;

//     rl.setPrompt(q);
//     rl.prompt();

//     return new Promise(( resolve , reject) => {

//         rl.on('line', (userInput) => {
//             response = userInput;
//             rl.close();
//         });

//         rl.on('close', () => {
//             resolve(response);
//         });

//     });


// };



var returnNum = (val) => {
    if (!isNaN(val)) {
        return parseInt(val);
    }
    else {
        return val;
    }
}


var splitSuitAndFace = (arr) => {
    let suits = [];
    let faces = [];

    arr.forEach(element => {
        // faces.push(element.charAt(0))
        faces.push(returnNum(element.charAt(0)))
        suits.push(element.charAt(1))
    })

    return [suits, faces];
}



var parseInput = (userInput) => {

    // let userInput = await readUserInput();


    // let communityFaces = [];
    // let communitySuits = [];
    let extracteddata = userInput[0].split(" ")
    let communityFaces = splitSuitAndFace(extracteddata)[0];
    let communitySuits = splitSuitAndFace(extracteddata)[1];

    let playerSuitsAndFaces = {}


    for (let index = 1; index < userInput.length; index++) {
        let extracteddata = userInput[index].split(" ")
        playerSuitsAndFaces[extracteddata[0]] = [splitSuitAndFace(extracteddata.slice(1))[0], splitSuitAndFace(extracteddata.slice(1))[1]]
    }


    console.log('Parsing data now')
    console.log(communityFaces);
    console.log(communitySuits);
    console.log(playerSuitsAndFaces);

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


// var aceReplacer = (faces) => {
//     if (faces.includes('A')) {
//         if (isAceByKing(faces)) {
//             replaceAceByNum(faces, 14)
//         }
//         else {
//             replaceAceByNum(faces, 1)
//         }
//     }
//     return faces;
// }


// var replaceAceByFourteen = (faces) => {
//     if (faces.includes('A')) {
//         faces.splice(faces.indexOf('A'), 1, 14)
//     }
//     return faces
// }

var areSameSets = (set1, set2) => {
    return set1.every((val, index) => val === set2[index]);
}

// https://www.pokerstarsschool.com/lessons/poker-hand-rankings/
var tieBreakPair = (faceSet1, faceSet2) => {
    
    if (areSameSets(faceSet1, faceSet2)){
        return [0, 0]
    }
    
    let set1 = [...faceSet1];
    let set2 = [...faceSet2];

    isSet1Greater = 0;
    isSet2Greater = 0;

    // set1 = replaceAceByFourteen(set1);
    // set2 = replaceAceByFourteen(set2);

    set1 = faceTranslator(faceToNumber, faceTranslator(faceToNumber, set1)) //because facetranslator doesnt replace all instances of a letter.
    set2 = faceTranslator(faceToNumber, faceTranslator(faceToNumber, set2)) 

    let count1 = isCountPresent(set1, 2)[1];
    let key1 = parseInt(findKeysbyValue(count1, 2)[0]) //find the face on pair        

    let count2 = isCountPresent(set2, 2)[1];
    let key2 = parseInt(findKeysbyValue(count2, 2)[0]) //find the face on pair        

    console.log('keys')
    console.log(count1);
    console.log(count2);
    console.log('key1: ', key1);
    console.log('key2: ',key2);

    if (key1 > key2){
        isSet1Greater = 1;
    }
    else if (key2 > key1){
        isSet2Greater = 1;
    }
    else { //key2 == key1
        set1 = set1.filter(x => x!=key1).sort((a, b) => b - a)
        set2 = set2.filter(x => x!=key2).sort((a, b) => b - a)

        console.log('sets')
        console.log(set1)
        console.log(set2)

        if (set1[0] > set2[0]){
            isSet1Greater = 1;
        }
        else {
            isSet2Greater = 1;
        }
    }
    
    return [isSet1Greater, isSet2Greater];

}


var tieBreakHighCard = (faceSet1, faceSet2) => {
    // Check if cards are identical outside!!!!    
    let set1 = [...faceSet1];
    let set2 = [...faceSet2];

    isSet1Greater = 0;
    isSet2Greater = 0;

    set1 = faceTranslator(faceToNumber, set1).sort((a, b) => b - a) 
    set2 = faceTranslator(faceToNumber, set2).sort((a, b) => b - a)
    
    for (let index = 0; index < 5; index++){
        if (set1[index] > set2[index]){
            // isSet1Greater = 1;
            return [1, 0];
        }
        else if (set2[index] > set1[index]) {
            // isSet2Greater = 1;
            return [0, 1];
        }
            

    }

       

}




var bubbleSort = () => {

}











    // ; ( async () => {
    //     // console.log(await question("how old are you? "));
    //     response = await question("how old are you? ");
    //     parseInput(response);


    // })();


    ; (async () => {
        // faceTranslator(numberToFace, [12, 11, 13, 14, 10])
        // describeHand(1, ['C', 'D', 'D', 'S', 'H'], ['A', 'Q', 'K', 'J', 'T'])
        tieBreakPair(['T', 'T', 7, 'K', 2], ['T', 'T', 7, 'Q', 2]);

        response = await readUserInput();

        var communityFaces;
        var communitySuits;
        var playerSuitsAndFaces;
        [communitySuits, communityFaces, playerSuitsAndFaces] = parseInput(response);

        var playerHandName = {}
        console.log('hello')
        console.log(playerSuitsAndFaces)

        console.log(Object.keys(playerSuitsAndFaces));

        Object.keys(playerSuitsAndFaces).map(name => {
            // console.log('inside map function')
            // console.log(name);
            // console.log(playerHandName);
            // console.log(playerSuitsAndFaces[1]);
            // console.log(playerSuitsAndFaces[0]);
            // console.log(communityFaces);
            // console.log(communitySuits);

            playerHandName[name] = getHand(playerSuitsAndFaces[name][1], playerSuitsAndFaces[name][0], communitySuits, communityFaces);

            console.log(playerSuitsAndFaces[name][1], playerSuitsAndFaces[name][0], communitySuits, communityFaces);


        });

        console.log(playerHandName);

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
    tieBreakHighCard:tieBreakHighCard
    // a1: a1
}




