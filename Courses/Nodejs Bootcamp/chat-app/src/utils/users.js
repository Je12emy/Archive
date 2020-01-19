const users = []

const addUser = ({id, username, room}) => {
    //? Clean the data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()
    
    //? Validate the data
    if(!username || !room){
        return {errror: 'Username and Room are required'}
    }

    //? Check for existing user
    const existingUser = users.find(user => {
        return user.room === room && user.username === username
    })

    //? Validate for existing users
    if(existingUser){
        return {error: 'This username is in use for this rooom'}
    }

    //? Add the new user
    const user = {id, username, room}
    users.push(user)
    return {user}
}

const removeUser = (id) => {
    const index = users.findIndex( user =>  user.id === id )

    if(index !== -1){        
        //* Returns a new array with the removed items by their index
        return users.splice(index,1)[0]
    }
}

const getUser = (id) => {
    const index = users.findIndex(user => user.id === id)
    if (index === -1) {
        return {error: 'User not found'}
    }
    return users[index]
}

const getUsersInRoom = (room) => {
   const usersInRoom = users.filter(user => user.room === room.toLowerCase())    
   if (usersInRoom.length === 0) {
       return {errror: 'There are no users in this room'}
   }
   return usersInRoom
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}