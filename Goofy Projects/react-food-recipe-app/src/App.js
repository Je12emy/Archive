import React,{useEffect,useState} from 'react';
import './App.css';
import { log } from 'util';
import Recipe from './Components/Recipe'

const App = ()=>{
  //? const variables for keys and api endpoint
  const APP_ID = 'f3dd72ba'
  const APP_KEY = '6d25956fcfb5c8062541bfba4e1a6e23'
  const [recipes, setRecipes] = useState([])
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('chicken')

  //* Use effect is a function which is run when the page is refreshed
  useEffect(()=>{
    getRecipes() //* Invoke the function for fethching our data
  },[query]) //? Run this function when the page is loaded for the first time only

  const getRecipes = async () => {
    //* Await the get request
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    //* Wait for the data to arraive and parse it
    const data = await response.json()
    setRecipes(data.hits)
  };

  const updateSearch = e => {
    //* Events have a sender which references the element where the event occured, we can modify this sender object
    //? Update our search variable by asigning it the value we are atempting to type in  
    setSearch(e.target.value)
    //? If we log our search we will see the string as we type it
    //console.log(search);
  };
  const submitQuery = e => {
    //! Stop the form from refreshing the whole page after a submit
    e.preventDefault();
    //* Set query into the finished search text
    setQuery(search)
    setSearch('')
    //console.log(search)
  }

  return(
    //* Basic JSX which is exported into App.js
    <div className="App">
      <form className="search-form" onSubmit={submitQuery}>
        <input type="text" className="search-bar" value={search} onChange={updateSearch}/>
          <button type="submit" className="search-button">
            Submit
          </button>  
      </form>
      <div className="recipes">
        {
          recipes.map((recipe,index) =>
            (
            //? The recipe item, has a ricipe object which we want to access to
            <Recipe key={index} 
            title={recipe.recipe.label} 
            calories={recipe.recipe.calories} 
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}/>)
            )
        }
      </div>
    </div>
  )
}

export default App;
