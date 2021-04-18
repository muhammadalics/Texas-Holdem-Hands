
var returnNum = (val) => {
    let value = !isNaN(val) ? parseInt(val):val;
    return value;   
}



module.exports = {
    returnNum: returnNum
}