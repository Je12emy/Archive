const express = require('express')
const app = express()
const path = require('path')

const PORT = process.env.PORT || 3000
const localPublicPath = path.join(__dirname, './src/public')

app.use(express.static(localPublicPath))
app.get('/', (req, res) => {

})

app.listen(PORT, () => {
    console.log('Express server is up on Port:', PORT);
})