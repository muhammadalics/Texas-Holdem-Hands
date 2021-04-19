const { arrayExpression, isFlowBaseAnnotation } = require("@babel/types");
// const { Console } = require("node:console");

const { checkAllEqual, returnNum, findKeysbyValue, splitSuitAndFace, areNumbersInSequence,
    areArraysEqual, faceTranslator, bubbleSortRankings, outputResults, bubbleSort,
    isCountPresent, countOccurrence, isAceByKing, replaceAceByNum } = require('./helper_functions');

const { tieBreak234OfAKind, tieBreakMultiple, tieBreakTwoPair, tieChecker } = require('./tiebreak')

const { describeHand } = require('./describe_hand');

const { getHand } = require('./identify_hand')

const { checkerrors } = require('./errorhandler');

let readline = require('readline');
const errorhandler = require("./errorhandler");

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

    ; (async () => {

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

        try {
            response = await readUserInput();
        }
        catch(e){
            throw e;
        }
        finally {
            console.log('');
        }

        var communityFaces;
        var communitySuits;
        var playerSuitsAndFaces;
        [communityFaces, communitySuits, playerSuitsAndFaces] = parseInput(response);

        checkerrors(communitySuits, communityFaces, playerSuitsAndFaces)

        var playerInfo = []

        Object.keys(playerSuitsAndFaces).map(name => {

            let playerHand = {}

            let handInfo = getHand(playerSuitsAndFaces[name][1], playerSuitsAndFaces[name][0], communityFaces, communitySuits)
           
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

                for (let i = 0; i < rankedfaces.length; i++) {
                    for (let j = 0; j < tieFaces.length; j++) {
                        if (areArraysEqual(rankedfaces[i], tieFaces[j])) {
                            playerInfo.forEach(player => {
                                if (player.name == tieNames[j]) {
                                    player.handNumber -= i * 0.1
                                }
                            })
                        }
                    }
                }
            })
        });

        // identify the players who have exactly same cards (faces)
        exactequal = []
        for (let i = 0; i < playerInfo.length; i++) {
            for (let j = 0; j < playerInfo.length; j++) {
                if (areArraysEqual(playerInfo[i].faces, playerInfo[j].faces) && playerInfo[i].name != playerInfo[j].name) {

                    exactequal.push(playerInfo[i].name);
                    exactequal.push(playerInfo[j].name);
                }

            }
        }

        playerInfo.forEach(player => {
            if (exactequal.includes(player.name)) {
                player.name += '(tie)'
            }
        })

        finalRankings = bubbleSortRankings(playerInfo);
        outputResults(finalRankings)
    })().then(console.log(''))
    .catch(console.error);

