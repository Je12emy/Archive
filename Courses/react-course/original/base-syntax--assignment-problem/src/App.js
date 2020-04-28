import React, { Component, useState } from "react";
import "./App.css";
import UserInput from "./Components/UserInput";
import UserOutput from "./Components/UserOutput";

const App = () => {
  // Username States
  const [userState, setUserState] = useState({
    users: [
      {
        name: "Jeremy",
      },
      {
        name: "Elon",
      },
      {
        name: "Linus",
      },
    ],
  });

  // Username Handler
  const changeUserName = (event) => {
    setUserState({
      users:[
        {
          name: event.target.value
        },
        {
          name: 'Elon'
        }
      ]      
    })
  }

  return (
    <div className="App">
      <UserInput changeUserName={changeUserName}/>
      <UserOutput userName={userState.users[0].name}/>
      <UserOutput userName={userState.users[1].name} />
    </div>
  );
};

export default App;
