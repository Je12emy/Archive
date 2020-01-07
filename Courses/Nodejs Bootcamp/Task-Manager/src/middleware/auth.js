const User = require('../models/user')
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    try {
        //! Extract token and remove the Bearer portion
        const token = req.header('Authorization').replace('Bearer ','')
        //? Verify the token with jwt. here the payload is located. Remember the _id is embeeded in the token so we can access it
        const decoded = jwt.verify(token, 'secretPassword')
        //! Output Example: { _id: 'asd123', iat: 1578375390, exp: 1578375395 }
        
        //? Find the user by his/her id and token within the tokens array
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token}) 
        if (!user) {
            //? Trigger the catch block
            throw new Error()
        }
        //? Send back the found user in the request
        req.user = user
        next()
    } catch (error) {
        res.status(401).send('Please authenticate')
    }
}
module.exports = auth

