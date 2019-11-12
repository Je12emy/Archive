import React from 'react';
import style from './recipe.module.css'

//* We are given a props object, which is then destructured
const Recipe = ({ title, calories, image, ingredients }) => {
    console.log(style.image.toString());
    
    return (
        <div className={style.recipe}>
            <h1> {title} </h1>
            <p> {calories} </p>
            <ol>
                {
                    ingredients.map((ingredient) => (
                        <li> {ingredient.text} </li>
                    ))
                }
            </ol>
            <img className={style.image} src={image} alt="Food photo"/>
        </div>
    )
}
export default Recipe;