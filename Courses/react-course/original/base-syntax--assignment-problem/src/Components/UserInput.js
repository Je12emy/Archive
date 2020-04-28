import React from 'react'

// Create a functional component
const UserInput = (props) => {
    return (
        <div>
            <h1>Input</h1>
            <input
            className='userInput' 
            onChange={props.changeUserName} type="text" placeholder="Name"/> 
        </div>
    )    

}
export default UserInput