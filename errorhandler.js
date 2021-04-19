const { moduleExpression } = require("@babel/types");


var possibleFaces = [2, 3, 4, 5, 6, 7, 8, 9, 'T', 'J', 'K', 'Q', 'A']
var possibleSuits = ['H', 'D', 'S', 'C']


var checkerrors = (communitySuits, communityFaces, playerSuitsAndFaces) => {

    communityFaces.forEach(element => {
        if (!possibleFaces.includes(element)){
            throw 'Error:\nCommunity Cards: Face character is invalid.'
        }
    })

    communitySuits.forEach(element => {
        if (!possibleSuits.includes(element)){
            throw 'Error:\nCommunity Cards: Suit character is invalid.'
        }
    })


    if (communityFaces.includes('') || communitySuits.includes('')) {
        throw 'Error:\nCommunity Cards: One or more suits or faces are missing. Try again';
    }

    else if (communityFaces.length < 5) {
        throw 'Error:\nCommunity Cards: A card is missing or an extra card is present.'
    }

    else {
        numPlayers = 0;
        Object.values(playerSuitsAndFaces).forEach(element => {
            if (Object.values(element)[0].length != 2) {
                throw 'Error:\nPlayers should have exactly 2 cards'
            }
            numPlayers++

            element[0].forEach(element => {
                if (!possibleSuits.includes(element)){
                    throw 'Error:\nPlayer Cards: Suit character is invalid.'
                }
            })

            element[1].forEach(element => {
                if (!possibleFaces.includes(element)){
                    throw 'Error:\nPlayer Cards: Face character is invalid.'
                }
            })


        });

        if (numPlayers < 2) {
            throw 'Error:\nAt least 2 players are needed.'
        }


    }

}





module.exports = {
    checkerrors: checkerrors
}