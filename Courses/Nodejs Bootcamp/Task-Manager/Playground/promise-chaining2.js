require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('5e0affd2eca8bc26a105c54d').then(task => {
//     if (!task) {
//         console.log('No task was found');
//     }
//     console.log(task);
//     return Task.countDocuments({
//         completed: false
//     })
// }).then(result => {
//     console.log(result, ' tasks are uncompleted');
// }).catch(e => {
//     console.log(e);
// })

const findAndDeleteById = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed: false})
    return count
}

findAndDeleteById('5e0ec3129e6602a5e763ac85').then(count => {
    console.log(count);
    
}).catch(error => {
    console.log(error);
    
})