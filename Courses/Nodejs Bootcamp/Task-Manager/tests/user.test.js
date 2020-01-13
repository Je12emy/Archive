const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'Mike',
    email: 'mike@example.com',
    password: '42what123',
    tokens: [{
        token: jwt.sign({_id: userOneId}, process.env.JWT_SECRET)
    }]
}

beforeEach(async () => {
    //? Whipe the user collection
   await User.deleteMany()
   //? Create a new User
   await new User(userOne).save()
})

test('Should sign up a new user', async () => {
    const response = await request(app)
        .post('/users')
        .send({
            name: 'Jeremy Tester',
            email: 'jeremyzelaya@hotmail.es',
            password: 'myPass985041'
        }).expect(201)
    //* Assert the DB was changed
    const user = await User.findById(response.body.user._id)  
    expect(user).not.toBeNull()
    //* Assertion about the response
    //? Matches the expected object with a subset of keys for a desired object
    expect(response.body).toMatchObject({
        user: {
            name: 'Jeremy Tester',
            email: 'jeremyzelaya@hotmail.es'
        },
        token: user.tokens[0].token
    })
    //? Expect the password to not be plain text
    expect(user.password).not.toBe('myPass985041')
})

test('Should Login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    //* Fetch the user from the db
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()
    expect(user.tokens[1].token).toBe(response.body.token)
})

test('Should NOT login in non existing user', async () => {
    await request(app).post('/users/login').send({
        email: userOne,
        password: 'incorrectPassword'
    }).expect(400)
})

test('Should fetch user profile', async () => {
    //? Fetch user profile and set the Authorization Bearer token by passing in the token in the userOne object
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should NOT fetch user profile for non authenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('Should delete account for user', async () => {
    const response = await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    const user = await User.findById(response.body._id)
    expect(user).toBeNull()
})

test('Should NOT delete account for non authenticated user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})