import React, { useState } from 'react';
import './App.css';
import ValidationComponent from './components/ValidationComponent'
import CharComponent from './components/CharComponent'

const App = () => {

  const [inputState, setInputState] = useState({
    input: ""
  })

  const [inputLength, setInputLength] = useState({
    length: 0
  })

  const [inputCharArray, setInputCharArray] = useState({
    charArray:[]
  })

  const showInputLenth = (event) => {
    if(event.target.value.length > 0){
      const length = event.target.value.length   
      setInputLength({length})
    }
  }

  const changeInput = (event) => {
    const input = event.target.value
    setInputState({input})
  }

  const splitInput = (event) => {
    if(event.target.value.length >= 5){
      const input = event.target.value 
      const charArray = input.split('')
      setInputCharArray({charArray})
    }else{
      setInputCharArray({charArray:[]})
    }
  }  

  const deleteChar = (index) => {
    // Create a new copy
    const charArray = [...inputCharArray.charArray];
    // Remove the single char
    charArray.splice(index, 1)

    setInputCharArray({charArray})
    updateInput(charArray.join(''))
  }

  const updateInput = (input) => {
    setInputState({input})
  }

  return (
    <div className="App">
      <h1> Text to Char </h1>
      <ValidationComponent inputLength={inputLength.length}/>      
      <input placeholder='Type a Word...' onChange={(event) => {showInputLenth(event); splitInput(event); changeInput(event)}} type='text' value={inputState.input}/>
      <div className='charBox'>
        {
         inputCharArray.charArray.map( (char, index) => {
           return (
             <CharComponent className='Validator' char={char} key={index} deleteChar={() => {deleteChar(index)}}/>
           )
         }) 
        }
      </div>
    </div>
  );
}

export default App;
