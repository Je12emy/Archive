const request = require('supertest')
const Task = require('../src/models/task')
const app = require('../src/app')
const {userOneId, userOne, setDataBase} = require('./fixtures/db')

beforeEach(setDataBase)

test('Should create task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'Finish create task test'
        })
        .expect(201)
    const task = Task.findById(response.body._id)
    expect(task).not.toBeNull()
})