module.exports = async () => {
    //* Import the models
    const Tweet = require('./models/Tweet')
    const User = require('./models/User')

    //! Constrains
    User.hasMany(Tweet, {as: 'Tweets', foreignKey: 'userID' })
    Tweet.belongsTo(User, {as: 'Users', foreignKey:'userID'})

    try {
        //* Create Data
        //const user = await User.create({username: 'Jeremy', password:'password123'})
        //const tweet = await Tweet.create({content: 'This is my first tweet', userID: user.id})
        
        //* Find User
        const users = await User.findAll({ where: {username: 'Jeremy'}, include: [ { model: Tweet, as: 'Tweets' } ] })
        console.log('Jeremy Tweets:', JSON.stringify(users));
        
    } catch (error) {
        console.log(error)
    }
}