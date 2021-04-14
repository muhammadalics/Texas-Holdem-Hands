console.log('Start');



var checkAllEqual = (arr) => arr.every(card => card == arr[0])

var a1 = (arr) => arr.every(card => card == arr[0])

// module.exports = checkAllEqual;

module.exports = {
    checkAllEqual: checkAllEqual,
    a1: a1
}




