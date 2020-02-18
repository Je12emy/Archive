import React, { Component } from 'react';
import logo from './logo.svg';
import Person from './Person/Person'
import './App.css';

class App extends Component {
  //* State is only availible in classes which extend Component (until we learn hooks)
  state = {
    persons: [
      {
        name: 'Jeremy',
        age: 21 
      },
      {
        name: 'James',
        age: 28
      },
      {
        name: 'Linus',
        age: 37
      }
    ]
  }

  //* Event Handdler
  switchNameHanddler = () => {
    //! This will not work
    //this.state.persons[1] = 'Poter'
    this.setState({persons: [
      {
        name: 'Jeremy',
        age: 22
      },
      {
        name: 'James',
        age: 28
      },
      {
        name: 'Linus',
        age: 37
      }
    ]})
  }

  //* onClick event invoke the function switchNameHanddler
  render() {
    return (
      <div className="App">
        <h1>I'm a React App</h1>
        <button onClick={this.switchNameHanddler}>Switch Name</button>
        <Person name={this.state.persons[0].name} age={this.state.persons[0].age}/>
        <Person name={this.state.persons[1].name} age={this.state.persons[1].age}/>
        <Person name={this.state.persons[2].name} age={this.state.persons[2].age}> I am a youtuber </Person>
      </div>
    );
  }
}

export default App;
