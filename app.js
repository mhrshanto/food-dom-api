async function productData() {
  const apiURL = "https://www.themealdb.com/api/json/v1/1/search.php?s="
  const response = await fetch(apiURL);
  const data = await response.json(); 
  const meals = data.meals;

  document.getElementById("product-list").innerHTML =
    meals.map((meal, index)=> {
      const idMeal = meal.idMeal;
      const description = meal.strInstructions;
      const shortDesc = description.slice(0, 120);
      
      return (
        `<div id="product-card">
        <img
              id="product-img"
              src="${meal.strMealThumb}"
              alt="product-image"
            />
            <div class="card-info">
              <h3 id="product-title">${meal.strMeal}</h3>
              <p id="product-desc">${shortDesc}</p>
              <div class="button-div">
                <button class="details-btn" onclick="popupFunction(${idMeal})">View Details</button>
              </div>
            </div>
          </div>`
      )
    }).join("")
}

productData();

const searchIcon = document.querySelector(".search-icon");
async function productSearch(foodName) {
  const searchURL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`
  const productList = document.getElementById("product-list");

  const response = await fetch(searchURL);
  const data = await response.json();
  
  const meals = data.meals;
  if(meals == null) {
    productList.innerHTML = `<h1>Products Not Found!</h1>`
  }
  else {
    productList.innerHTML =
    meals.map((meal, index)=> {

      const description = meal.strInstructions;
      const shortDesc = description.slice(0, 120);
      const mealId = meal.idMeal;      
      return (
        `<div id="product-card">
        <img
              id="product-img"
              src="${meal.strMealThumb}"
              alt="product-image"
            />
            <div class="card-info">
              <h3 id="product-title">${meal.strMeal}</h3>
              <p id="product-desc">${shortDesc}</p>
              <div class="button-div">
                <button class="details-btn" onclick="popupFunction(${mealId})">View Details</button>
              </div>
            </div>
          </div>`
      )      
    }).join("")
  }
}

searchIcon.addEventListener("click", ()=> {
  const foodName = document.getElementById("search").value;
   productSearch(foodName)
})


async function popupFunction(id){
  const popupURL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(popupURL);
  const data = await response.json(); 
  const meals = data.meals;
  const popup = document.getElementById("popup");

  popup.style.display = "block";

  popup.innerHTML =
    meals.map((meal, index)=> {

      const description = meal.strInstructions;
      const shortDesc = description.slice(0, 700);
      const mealId = meal.idMeal;      
      return (
        `<div id="product-popup">
        <img
              id="product-img"
              src="${meal.strMealThumb}"
              alt="product-image"
            />
            <div class="card-info">
              <h3 id="product-title">${meal.strMeal}</h3>
              <p id="product-desc">${shortDesc}</p>
              <div class="button-div">
                <button class="close-btn details-btn" onclick="closePopup()">Close</button>
              </div>
            </div>
          </div>`
      )      
    }).join("")
}

function closePopup () {
  const popup = document.getElementById("popup");

  popup.style.display = "none";
}