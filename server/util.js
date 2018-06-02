function convert(source) {
    result = [];
    for (let i = 0; i < source.length; i++) {
        result.push(parseInt(source[i].volume))
    }
    return result;
}

module.exports = { convert };