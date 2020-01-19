const generateMessage = text => {
    return {
        text,
        createdAt: new Date().getTime()
    }
}
const generateLocation = url => {
    return {
        url,
        createAt: new Date().getTime()
    }
}

module.exports = {
    generateMessage,
    generateLocation
}