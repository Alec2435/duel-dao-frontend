
module.exports.makeid = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


module.exports.cleanObj = (obj) => {
    console.log({obj})
    for (var propName in obj) {
        if (obj[propName] === undefined) {
            obj[propName] = null;
        }
    }
    return obj
}