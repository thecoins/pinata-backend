function convert(source) {
    let result = [];
    for (let i = 0; i < source.length; i++) {
        result.push(parseInt(source[i].volume))
    }
    return result;
}

function convertArray(source) {
    let result = [];
    for (let i = 0; i < source.length; i++) {
        let item = []
        let time = new Date(source[i].timestamp).getTime();
        let volume = parseInt(source[i].volume);
        item.push(time);
        item.push(volume);
        result.push(item);
    }
    return result;
}

module.exports = { convert,convertArray };