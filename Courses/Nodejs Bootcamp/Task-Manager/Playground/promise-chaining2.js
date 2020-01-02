require('../src/db/mongoose')
const Task = require('../src/models/task')

Task.findByIdAndDelete('5e0affd2eca8bc26a105c54d').then(task => {
    if (!task) {
        console.log('No task was found');
    }
    console.log(task);
    return Task.countDocuments({
        completed: false
    })
}).then(result => {
    console.log(result, ' tasks are uncompleted');
}).catch(e => {
    console.log(e);
    
})