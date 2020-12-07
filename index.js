"use strict";
// store all API and api Key variables
const movieApiKey = "11de6c637aefaaf2fe43d27cf623fff9";
const spoonApiKey = "ba1dd8bb59a545308760ceddf87a648c";

// create a store to store all info needed
const STORE = {
  foodId: [],
  movieId: [],
  foodTitle: [],
  movieTitle: [],
  moviePoster: [],
  started: false,
  formFood: false,
  formMovie: false,
};
/*------- Render functions-----------------------*/

// start the plan
function renderStart() {
  $("main").html(`
    <div class="bg-image">
    <section class="start">
    <h1>Plan the Perfect Quarantine Date Night</h1>
    <h4>Pick a recipe and movie for a pefect date night in!</h4>
    <button id="start">Start</button>
  </section>
  </div>
    `);
}
// render food form
function renderFoodForm() {
  $("main").html(`
  <div class="bg-image-recipe">
    <section class="step-one">
    <h2>Step 1</h2>
    <h3>Let's start with finding a recipe to cook</h3>
    <form id="js-form-food">
            <label for="search-food" class="food-type">What type of food are you in the mood for?</label>
            <select name="search-food" id="js-search-food">
            <option value="African">African</option>
            <option value="American">American</option>
            <option value="British">British</option>
            <option value="Cajun">Cajun</option>
            <option value="Caribbean">Caribbean</option>
            <option value="Chinese">Chinese</option>
            <option value="Eastern European">Eastern European</option>
            <option value="European">European</option>
            <option value="French">French</option>
            <option value="German">German</option>
            <option value="Greek">Greek</option>
            <option value="Indian">Indian</option>
            <option value="Irish">Irish</option>
            <option value="Italian">Italian</option>
            <option value="Japanese">Japanese</option>
            <option value="Jewish">Jewish</option>
            <option value="Korean">Korean</option>
            <option value="Latin American">Latin American</option>
            <option value="Mediterranean">Mediterranean</option>
            <option value="Mexican">Mexican</option>
            <option value="Middle Eastern">Middle Eastern</option>
            <option value="Nordic">Nordic</option>
            <option value="Southern">Southern</option>
            <option value="Spanish">Spanish</option>
            <option value="Thai">Thai</option>
            <option value="Vietnamese">Vietnamese</option>
            </select>
            <label for="search-diet" class="dietary-restrictions">Do you have any dietary restrictions?</label>
            <select name="search-diet" id="js-search-diet">
            <option value="">none</option>
            <option value="Gluten Free">Gluten Free</option>
            <option value="Ketogenic">Keto</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Vegan">Vegan</option>
            <option value="Pescetarian">Pescetarian</option>
            <option value="Paleo">Paleo</option>
            <option value="Primal">Primal</option>
            <option value="Whole30">Whole30</option>
            </select>
            <input type="button" value="Search Food" id="search-food"/>
    </form>
    </section>
    </div>
    `);
}
// render movie form
function renderMovieForm() {
  $("h3").empty();
  $("main").html(`
  <div class="bg-movie-form">
    <section class="step-two">
    <h2>Step 2</h2>
    <h3>Let's pick some Entertainment</h3>
    <form id="js-form-movie">
    <label for="search-movie" class="movie-select">What movie genre do you want to watch?</label>
    <select name="search-movie" id="js-search-movie">
        <option value="28">Action</option>
        <option value="12">Adventure</option>
        <option value="35">Comedy</option>
        <option value="18">Drama</option>
        <option value="27">Horror</option>
        <option value="10749">Romance</option>
        <option value="878">Sci Fi</option>
        <option value="53">Thriller</option>
    </select>
    <input type="button" value="Search Movie" id="search-movie">
</form>
</section>
</div>
    `);
}
// render results
function renderResults() {
  $("h3").empty();
  $("main").html(`
  <div class="results-check">
    <section class="show-results">
    <h2>You picked ${STORE.foodTitle} and ${STORE.movieTitle}</h2>
    <h4>If this is correct hit show results, if not hit restart</h4>
    <button id="results">Show Results</button>
    <button id="restart">Restart</button>
  </section>
  </div>
    `);
}

//create render function to go through app
function render() {
  if (!STORE.started) {
    renderStart();
  } else if (!STORE.formFood & !STORE.formMovie) {
    renderFoodForm();
  } else if (STORE.formFood & !STORE.formMovie) {
    renderMovieForm();
  } else if ((STORE.formFood === true) & (STORE.formMovie === true)) {
    renderResults();
  }
}

/*------- Watch forms-----------------------*/
// create a watch form for food
function watchFormFood() {
  // listen for submit button
  $("main").on("click", "#search-food", function (event) {
    event.preventDefault();
    const searchFood = $("#js-search-food").val();
    const searchDiet = $("#js-search-diet").val();
    getFood(searchFood, searchDiet);
  });
}

watchFormFood();
// create a watch form for movie
function watchFormMovie() {
  $("main").on("click", "#search-movie", function (event) {
    event.preventDefault();
    const searchMovie = $("#js-search-movie").val();
    getMovie(searchMovie);
  });
}
watchFormMovie();

function watchResults() {
  $("main").on("click", "#results", function () {
    const foodIdResult = STORE.foodId;
    const movieIdResults = STORE.movieId;
    $("main").empty();
    getFoodResults(foodIdResult);
    getMovieResults(movieIdResults);
  });
}
watchResults();
/*------------- watch results functions ---------------*/
function watchFoodResults() {
  $("main").on("click", ".recipe-result", (e) => {
    STORE.foodId = Number($(e.currentTarget).attr("id"));
    STORE.foodTitle = $(e.currentTarget).attr("alt");
    $(window).scrollTop(0);
    $("h4").text(
      `You selected ${STORE.foodTitle}, if this is correct click the Next button, if not choose a different recipe`
    );
  });
}

watchFoodResults();

function watchMovieResults() {
  $("main").on("click", ".movie-result", (e) => {
    STORE.movieId = Number($(e.currentTarget).attr("id"));
    STORE.movieTitle = $(e.currentTarget).attr("alt");
    STORE.moviePoster = $(e.currentTarget).attr("src");
    $(window).scrollTop(0);
    $("h4").text(
      `You selected ${STORE.movieTitle}, if this is correct click the Next button, if not choose a differnt movie`
    );
  });
}

watchMovieResults();

/*------------------ GET functions ------------------------*/
// get food
function getFood(searchFood, searchDiet) {
  const spoonURL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${spoonApiKey}&cuisine=${searchFood}&diet=${searchDiet}`;
  fetch(spoonURL)
    .then((responseFood) => {
      if (responseFood.ok) {
        return responseFood.json();
      }
      throw new Error(responseFood.statusText);
    })
    .then((responseJsonFood) => displayFoodResults(responseJsonFood))
    .catch((err) => {
      $("#js-error-messageFood").text(`Something went wrong: ${err.message}`);
    });
}
// get movie
function getMovie(searchMovie) {
  const movieURL = `https://api.themoviedb.org/3/discover/movie?api_key=${movieApiKey}&language=en-US&sort_by=popularity.desc&with_genres=${searchMovie}`;
  fetch(movieURL)
    .then((responseMovie) => {
      if (responseMovie.ok) {
        return responseMovie.json();
      }
      throw new Error(responseMovie.statusText);
    })
    .then((responseJsonMovie) => displayMovieResults(responseJsonMovie))
    .catch((err) => {
      $("#js-error-messageMovie").text(`Something went wrong: ${err.message}`);
    });
}

function getFoodResults(foodIdResults) {
  const spoonURLResults = `https://api.spoonacular.com/recipes/${foodIdResults}/information?apiKey=${spoonApiKey}`;
  fetch(spoonURLResults)
    .then((responseFoodResults) => {
      if (responseFoodResults.ok) {
        return responseFoodResults.json();
      }
      throw new Error(responseFoodResults.statusText);
    })
    .then((responseJsonFoodResults) =>
      displayDateFoodResults(responseJsonFoodResults)
    )
    .catch((err) => {
      $("#js-error-messageFood").text(`Something went wrong: ${err.message}`);
    });
}

function getMovieResults(movieIdResults) {
  const movieURLResults = `https://api.themoviedb.org/3/movie/${movieIdResults}/watch/providers?api_key=${movieApiKey}`;
  fetch(movieURLResults)
    .then((responseMovieResults) => {
      if (responseMovieResults.ok) {
        return responseMovieResults.json();
      }
      throw new Error(responseMovieResults.statusText);
    })
    .then((responseJsonMovieResults) =>
      displayDateMovieResults(responseJsonMovieResults)
    )
    .catch((err) => {
      $("#js-error-messageMovie").text(`Something went wrong: ${err.message}`);
    });
}

/*------------------Display Results--------------------*/
// display results function
function displayFoodResults(responseJsonFood) {
  if (responseJsonFood.totalResults === 0) {
    $("main").html(`
      <div class="food-results-error">
      <h2>Hmm this is embarrassing but the food selection you chose did not match any recipies</h2>
        <button id="start">Try Again</button>
        </div>`);
  } else {
    $("main").html(`
    <div class="food-results-bg">
  <h2>What looks good?</h2>
  <p>Click the recipe picture you want to select</p>
    <button id="food">Next</button>
    <h4 class="result-id"></h4>
    <div id="group"></div>
    </div>
  `);
    for (let i = 0; i < responseJsonFood.results.length; i++) {
      $("#group").append(`
      <div class="food-results" id="item">
      <h3>${responseJsonFood.results[i].title}</h3>
      <img src="${responseJsonFood.results[i].image}" alt="${responseJsonFood.results[i].title}" class="recipe-result" id="${responseJsonFood.results[i].id}">
      </div>`);
    }
  }
}

function displayMovieResults(responseJsonMovie) {
  $("main").html(`
  <div class="movie-results-bg">
  <h2>Anything look good?</h2>
  <p>Click the movie poster to select your movie</p>
    <button id="movie">Next</button>
    <h4 class="result-id"></h4>
    <div id="group"></div>
    </div>
  `);
  for (let i = 0; i < responseJsonMovie.results.length; i++) {
    $("#group").append(`
      <div class="movie-results" id="item">
      <h3>${responseJsonMovie.results[i].title}</h3>
      <img src="https://image.tmdb.org/t/p/w300/${responseJsonMovie.results[i].poster_path}" alt="${responseJsonMovie.results[i].title}" class="movie-result" id="${responseJsonMovie.results[i].id}">
      <p>${responseJsonMovie.results[i].overview}</p>
      </div>`);
  }
}

function displayDateFoodResults(responseJsonFoodResults) {
  $("main").append(`
  <div class="food-results-final">
  <h2>Enjoy your Dinner</h2>
  <h3>${responseJsonFoodResults.title}</h3>
  <img src="${responseJsonFoodResults.image}" alt="${responseJsonFoodResults.title}" class="date-food" >
  <h4>Time to prepare: ${responseJsonFoodResults.readyInMinutes} minutes<h4>    
  <a href="${responseJsonFoodResults.spoonacularSourceUrl}" target="_blank">Get your Recipe</a>
  <button id="restart">Restart</button>
  </div>
  `);
}

function displayDateMovieResults(responseJsonMovieResults) {
  $("main").append(`
  <div class="movie-results-final">
  <h2>Enjoy your Movie</h2>
    <h3>${STORE.movieTitle}</h3>
    <img src="${STORE.moviePoster}" alt="${STORE.movieTitle}" class="date-movie" >
    <h4><a href="${responseJsonMovieResults.results.US.link}" target="_blank">Find your Movie</h4>
    </div>
  `);
}

/*---------------- event handlers -------------------------*/
function onStart() {
  $("main").on("click", "#start", startedPlan);
}

function onFood() {
  $("main").on("click", "#food", foodFill);
}
function onMovie() {
  $("main").on("click", "#movie", movieFill);
}

function onRestart() {
  $("main").on("click", "#restart", restartPlan);
}

function startedPlan() {
  STORE.started = true;
  render();
}

function foodFill() {
  STORE.formFood = true;
  render();
}

function movieFill() {
  STORE.formMovie = true;
  render();
}

function restartPlan() {
  // empty store and change everything to false
  STORE.foodId = [];
  STORE.movieId = [];
  STORE.foodTitle = [];
  STORE.movieTitle = [];
  STORE.moviePoster = [];
  STORE.started = false;
  STORE.formFood = false;
  STORE.formMovie = false;
  render();
}

function dateNight() {
  onRestart();
  onStart();
  onFood();
  onMovie();
  render();
}

$(dateNight);
