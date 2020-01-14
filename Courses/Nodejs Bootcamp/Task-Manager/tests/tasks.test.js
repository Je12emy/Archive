const request = require('supertest')
const Task = require('../src/models/task')
const app = require('../src/app')
const {userOneId, userOne, setDataBase, taskThree} = require('./fixtures/db')

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

test('Should fetch ALL tasks for user one', async () => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
    
    const tasks = await Task.find({owner: userOne._id})
    expect(tasks.length).toBe(2)
})

test('Should NOT delete task for non-authorized user', async () => {    
    await request(app)
        .delete(`/tasks/${taskThree._id}`)
        .send()
        .expect(401)
    const task = await Task.findById(taskThree._id)
    expect(task).not.toBeNull()
})
