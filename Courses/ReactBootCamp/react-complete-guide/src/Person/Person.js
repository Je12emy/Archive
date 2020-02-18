//! Import React from the package
import React from 'react'

//! Create a component using a function
const person = (props) => {
    //* Use props to render dinamic content.
    return (
        <div>
            <p> My name is {props.name}, I am {props.age} years old</p>
            <p>{props.children}</p>
        </div>
    )
}

//! Export the component
export default person;
