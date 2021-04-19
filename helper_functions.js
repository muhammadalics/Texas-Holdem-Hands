
var returnNum = (val) => {
    let value = !isNaN(val) ? parseInt(val):val;
    return value;   
}

var findKeysbyValue = (givenObject, val) => {
    let keys = Object.keys(givenObject);
    let allInstances = keys.filter(key => givenObject[key] == val)
    return allInstances;
};

var splitSuitAndFace = (arr) => {
    let suits = [];
    let faces = [];

    arr.forEach(element => {
        faces.push(returnNum(element.charAt(0)))
        suits.push(element.charAt(1))
    })

    return [suits, faces];
}

var checkAllEqual = (arr) => arr.every(card => card == arr[0])

var areNumbersInSequence = (arr) => {
    sortedArray = arr.sort((a, b) => a - b);
    subtractionArray = [];
    for (let index = 1; index < sortedArray.length; index++) {
        subtractionArray.push(sortedArray[index] - sortedArray[index - 1]) // if numbers are in sequence then this array will be all 1.       
    }
    return checkAllEqual(subtractionArray) && subtractionArray[0] == 1;
}

var faceTranslator = (scheme, faces) => {
    Object.keys(scheme).forEach(element => {
        element = returnNum(element)
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
                
                return false;
            }
        }
        return true;
    }
    return false;
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

    console.log('*** Results ***')
    for (let i=0; i < playerInfo.length; i++){       
        console.log(i+1, playerInfo[i].name, playerInfo[i].description)
    }

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

var isCountPresent = (arr, num) => {
    let count = countOccurrence(arr);   
    return [Object.values(count).includes(num), count];
}

var countOccurrence = (arr) => {
    let count = {};
    arr.forEach(element => {
        count[element] = (count[element] + 1) || 1;
    });
    return count;
}

var isAceByKing = (faces) => {
    return faces.includes('A') && (faces.includes('K') || faces.includes('Q') || faces.includes('J') || faces.includes('T'));
}

var replaceAceByNum = (faces, num) => {
    let indexOfAce = faces.indexOf('A');   
    faces.splice(indexOfAce, 1, num);
    return faces;
}

var areSameSets = (set1, set2) => {
    return set1.every((val, index) => val === set2[index]);
}


module.exports = {
    returnNum: returnNum,
    findKeysbyValue:findKeysbyValue,
    splitSuitAndFace:splitSuitAndFace,
    checkAllEqual:checkAllEqual,
    areNumbersInSequence:areNumbersInSequence,
    faceTranslator:faceTranslator,
    areArraysEqual:areArraysEqual,
    bubbleSortRankings: bubbleSortRankings,
    outputResults:outputResults,
    bubbleSort: bubbleSort,
    isCountPresent:isCountPresent,
    countOccurrence:countOccurrence,
    isAceByKing:isAceByKing,
    replaceAceByNum:replaceAceByNum,
    areSameSets: areSameSets
    
}