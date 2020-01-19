const generateMessage = (username, text) => {
    return {
        username,
        text,
        createdAt: new Date().getTime()
    }
}
const generateLocation = (username, url) => {
    return {
        username,
        url,
        createAt: new Date().getTime()
    }
}

module.exports = {
    generateMessage,
    generateLocation
}