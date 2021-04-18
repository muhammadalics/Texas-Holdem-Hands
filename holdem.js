const { arrayExpression, isFlowBaseAnnotation } = require("@babel/types");
// const { Console } = require("node:console");

const { checkAllEqual, returnNum, findKeysbyValue, splitSuitAndFace, areNumbersInSequence,
    areArraysEqual, faceTranslator, bubbleSortRankings, outputResults, bubbleSort,
    isCountPresent, countOccurrence, isAceByKing, replaceAceByNum } = require('./helper_functions');

const { tieBreak234OfAKind, tieBreakMultiple, tieBreakTwoPair, tieChecker } = require('./tiebreak')

const { describeHand } = require('./describe_hand');

const { getHand } = require('./identify_hand')

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

var areSameSets = (set1, set2) => {
    return set1.every((val, index) => val === set2[index]);
}


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
            6: [tieBreakMultiple, undefined],
            7: [tieBreakMultiple, undefined],
            8: [tieBreak234OfAKind, 4],
            9: [tieBreakMultiple, undefined],
            // no 10 because royal flush is unique
        }

        response = await readUserInput();

        var communityFaces;
        var communitySuits;
        var playerSuitsAndFaces;
        [communitySuits, communityFaces, playerSuitsAndFaces] = parseInput(response);

        // var playerHand = {}
        var playerInfo = []
        // console.log('hello')
        // console.log(playerSuitsAndFaces)

        // console.log(Object.keys(playerSuitsAndFaces));

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
                    if (playerInfo[index].handNumber == handnum) {
                        tieNames.push(playerInfo[index].name)
                        tieFaces.push(playerInfo[index].faces)
                    }
                }

                let rankedfaces = bubbleSort(tieFaces, fnNames[handnum][0], fnNames[handnum][1]);

                // console.log('ranked faces')
                // console.log(rankedfaces)

                for (let i = 0; i < rankedfaces.length; i++) {
                    for (let j = 0; j < tieFaces.length; j++) {
                        if (areSameSets(rankedfaces[i], tieFaces[j])) {
                            playerInfo.forEach(player => {
                                if (player.name == tieNames[j]) {
                                    player.handNumber -= i * 0.1 //this is correct
                                }
                            })

                        }

                    }
                }

            })
        });

        finalRankings = bubbleSortRankings(playerInfo);
        outputResults(finalRankings)
    })();

