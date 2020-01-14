const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const {userOneId, userOne, setDataBase} = require('./fixtures/db')

beforeEach(setDataBase)

test('Should sign up a new user', async () => {
    const response = await request(app)
        .post('/users')
        .send({
            name: 'Jeremy Tester',
            email: 'jeremyzelaya@hotmail.es',
            password: 'myPass985041'
        }).expect(201)
    //* Assert the DB was chansged
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

test('Should upload a new user avatar', async() => {
    //? Make a post and attach the profile picture
    await request(app)
    .post('/users/me/avatar')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .attach('avatar','tests/fixtures/profile-pic.jpg')
    .expect(200)

    const user = await User.findById(userOne._id)
    //? Checks if avatar is actually a buffer
    //* toBe uses === which uses memory reference, toEqual checks for the content
    //* with expect any we can compare the type

    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'Jeremy Tester Updated'
        })
        .expect(200)

    const user = await User.findById(userOneId)    
    expect(user.name).toBe('Jeremy Tester Updated')
})

test('Should NOT update invalid users fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            location: 'Test Location'
        })
        .expect(400)

})