const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')

const userOne = {
    name: 'Mike',
    email: 'mike@example.com',
    password: '42what123'
}

beforeEach(async () => {
    //? Whipe the user collection
   await User.deleteMany()
   //? Create a new User
   await new User(userOne).save()
})

test('Should sign up a new user', async () => {
    await request(app).post('/users').send({
        name: 'Jeremy Tester',
        email: 'jeremyzelaya@hotmail.es',
        password: 'myPass985041'
    }).expect(201)
})

test('Should Login existing user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
})

test('Should NOT login in non existing user', async () => {
    await request(app).post('/users/login').send({
        email: userOne,
        password: 'incorrectPassword'
    }).expect(400)
})
