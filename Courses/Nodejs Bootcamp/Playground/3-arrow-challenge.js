
const tasks = {
    tasks: [{
        text: 'Grocery shopping',
        completed: true
    },
    {
        text: 'Clean yard',
        completed: false
    },
    {
        text: 'Film Course',
        completed: false
    }],
    getTasks(){
        let uncompletedTasks = this.tasks.filter((task) => task.completed === false)
        uncompletedTasks.forEach((toDo, index) => console.log(`${index+1}. ${toDo.text}`))
    }
}
tasks.getTasks()


