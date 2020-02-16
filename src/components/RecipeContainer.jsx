import React, { useEffect, useState } from 'react';
import './App.css';
import Recipe from './RecipeView';

const RecipeContainer = () => {

  const APP_ID = '672bb17c';
  const APP_KEY = 'e9e52ca418943239824ba17bc1538d83';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState(''); 
  const [query, setQuery] = useState('chicken');

  useEffect(() => {
    console.log('use effect ran');
    getRecipes() ;
  }, [query])

  const getRecipes = async() => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();

    setRecipes(data.hits);
    console.log(data.hits);
  }

  const updateSearch = e =>{
    setSearch(e.target.value);
  }

  const getSearch = e =>{
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return (
    <div className="App">
      <form className="search-form">
        <input className="search-bar" type='text' value={search} onChange={updateSearch}/>
        <button className="search-button" type='submit' onClick={getSearch}>
          Search
        </button>
      </form>
      <div className='recipes'>
      {recipes.map(recipe =>(
        <Recipe 
        key={recipe.recipe.label}
        title={recipe.recipe.label} 
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
        />
      ))}
      </div>
    </div>
  );
};

export default RecipeContainer;