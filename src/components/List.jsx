import React, { useState } from "react";
import "../index.css";

function List() {
  const [userInput, setUserInput] = useState("");
  const [meal, setMeal] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const searchMeal = () => {
    if (userInput.trim() === "") {
      setErrorMessage("Input Field Cannot Be Empty");
      return;
    }

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${userInput}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.meals === null) {
          setErrorMessage(
            "We couldn't find the recipe for the dish you're looking for. Sorry 😞"
          );
          return;
        }
        setMeal(data.meals[0]);
        setErrorMessage("");
      })
      .catch(() => {
        setErrorMessage("Invalid Input");
      });
  };

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const hideRecipe = () => {
    setMeal(null);
  };

  return (
    <div className="container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter the name of the dish you are looking for."
          value={userInput}
          onChange={handleInputChange}
        />
        <button onClick={searchMeal}>Search</button>
      </div>
      {meal ? (
        <div>
          <img className="img" src={meal.strMealThumb} alt={meal.strMeal} />
          <div className="details">
            <h2>{meal.strMeal}</h2>
            <h4>{meal.strArea}</h4>
          </div>
          <div>
            <ul>
              {Object.keys(meal).map((key) => {
                if (key.includes("strIngredient") && meal[key]) {
                  const measureKey = `strMeasure${key.slice(13)}`;
                  return (
                    <li key={key}>
                      {meal[measureKey]} {meal[key]}
                    </li>
                  );
                }
                return null;
              })}
            </ul>
          </div>
          <div id="recipe">
            <button id="hide-recipe" onClick={hideRecipe}>
              X
            </button>
            <pre>{meal.strInstructions}</pre>
          </div>
        </div>
      ) : (
        <div id="result">{errorMessage && <h3>{errorMessage}</h3>}</div>
      )}
    </div>
  );
}

export default List;
