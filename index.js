"use strict"
// store all API and api Key variables
const movieApiKey="11de6c637aefaaf2fe43d27cf623fff9"
const spoonApiKey="ba1dd8bb59a545308760ceddf87a648c"
// stretch goal* const youTubeURL="https://www.googleapis.com/youtube/v3/search"

const STORE = {
    foodId: [],
    movieId: [],
    foodTitle: [],
    movieTitle: [],
    moviePoster: [],
    started: false,
    formFood: false,
    formMovie: false,
    results: false
}
/*------- Render functions-----------------------*/

// start the plan
function renderStart() {
    $("main").html(`
    <section class="start">
    <h1>Plan the Perfect Quarantine Date Night</h1>
    <h4>Pick a recipe and movie for a pefect date night in!</h4>
    <button id="start">Start</button>
  </section>
    `);
}
// render food form
function renderFoodForm() {
    $("main").html(`
    <h2>Step 1</h2>
    <h3>Let's start with finding a recipe to cook</h3>
    <form id="js-form-food">
            <label for="search-food">What type of food are you in the mood for?</label>
            <input 
            type="text"
            name="search-food"
            id="js-search-food"
            required
            placeholder="indian"
            />
            <input type="button" value="Search Food" id="search-food"/>
    </form>
    `)
}
// render movie form
function renderMovieForm() {
    $('h3').empty();
    console.log("hello")
    console.log(STORE.foodTitle)
    console.log(STORE.foodId)
    $("main").html(`
    <h2>Step 2</h2>
    <h3>Next comes the entertainment</h3>
    <form id="js-form-movie">
    <label for="search-movie">What movie genre do you want to watch?</label>
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
    `)
}
// render results
function renderResults() {
    $('h3').empty();
    $("main").html(`
    <section class="show-results">
    <h2>You picked ${STORE.foodTitle} and ${STORE.movieTitle}</h2>
    <h4>If this is correct hit show results, if not hit restart</h4>
    <button id="results">Show Results</button>
    <button id="restart">Restart</button>
  </section>
    `);
}

function render() {
    if (!STORE.started) {
        renderStart();
    } else if ((!STORE.formFood) & (!STORE.formMovie)) {
        renderFoodForm();
    } else if ((STORE.formFood) & (!STORE.formMovie)) {
        renderMovieForm();
    } else if (STORE.formFood === true & STORE.formMovie === true) {
        renderResults();
    }
}

/*------- Watch forms-----------------------*/
// create a watch form for food
function watchFormFood() {
    // listen for submit button 
    $("main").on('click', '#search-food', function(event){
      event.preventDefault();
      const searchFood= $("#js-search-food").val()
      getFood(searchFood);
    });
  }
   
watchFormFood();
// create a watch form for movie 
function watchFormMovie() {
    $("main").on('click', '#search-movie', function(event){
        event.preventDefault();
        console.log('hello')
        console.log(STORE.foodId)
        const searchMovie= $("#js-search-movie").val()
        console.log(STORE.foodId)
        getMovie(searchMovie);
        console.log(STORE.foodId)
      });
    }
watchFormMovie();

function watchResults() {
    $('main').on("click", "#results", function(){
        const foodIdResult = STORE.foodId 
        console.log(foodIdResult)
        const movieIdResults = STORE.movieId
        console.log(movieIdResults)
        getFoodResults(foodIdResult)
        getMovieResults(movieIdResults)
    })
}
watchResults();
/*------------------ watch results functions ---------------*/
function watchFoodResults() {
    $("main").on("click", ".recipe-result", e=> {
        STORE.foodId = Number($(e.currentTarget).attr('id'));
        console.log(STORE.foodId);
        STORE.foodTitle = $(e.currentTarget).attr('alt')
        console.log(STORE.foodTitle);
        $('h4').text(`You selected ${STORE.foodTitle}, if this is correct click the Next button, if not choose a differnt recipe`)
    });
}

watchFoodResults()

function watchMovieResults() { 
    $("main").on("click", ".movie-result", e=> {
        STORE.movieId = Number($(e.currentTarget).attr('id'));
        console.log(STORE.movieId);
        STORE.movieTitle = $(e.currentTarget).attr('alt')
        STORE.moviePoster = $(e.currentTarget).attr('src')
        console.log("hello")
        console.log(STORE.movieTitle);
        $('h4').text(`You selected ${STORE.movieTitle}, if this is correct click the Next button, if not choose a differnt movie`)
    });
}

watchMovieResults()

/*------------------ GET functions ------------------------*/
// get food
function getFood(searchFood){
    const spoonURL=`https://api.spoonacular.com/recipes/complexSearch?apiKey=${spoonApiKey}&cuisine=${searchFood}`
    fetch(spoonURL)
    .then((responseFood)=> {
        if (responseFood.ok){
            return responseFood.json();
        }
        throw new Error(responseFood.statusText);
    })
    .then((responseJsonFood)=> displayFoodResults(responseJsonFood))
    .catch((err)=>{
        $("#js-error-messageFood").text(`Something went wrong: ${err.message}`); 
    })
}
// get movie
function getMovie(searchMovie){
    const movieURL=`https://api.themoviedb.org/3/discover/movie?api_key=${movieApiKey}&language=en-US&sort_by=popularity.desc&with_genres=${searchMovie}`
    fetch(movieURL)
    .then((responseMovie)=> {
        if (responseMovie.ok){
            return responseMovie.json();
        }
        throw new Error(responseMovie.statusText);
    })
    .then((responseJsonMovie)=> displayMovieResults(responseJsonMovie))
    .catch((err)=>{
        $("#js-error-messageMovie").text(`Something went wrong: ${err.message}`); 
    })
}

function getFoodResults(foodIdResults){
    const spoonURLResults=`https://api.spoonacular.com/recipes/${foodIdResults}/information?apiKey=${spoonApiKey}`
    fetch(spoonURLResults)
    .then((responseFoodResults)=> {
        if (responseFoodResults.ok){
            return responseFoodResults.json();
        }
        throw new Error(responseFoodResults.statusText);
    })
    .then((responseJsonFoodResults)=> displayDateFoodResults(responseJsonFoodResults))
    .catch((err)=>{
        $("#js-error-messageFood").text(`Something went wrong: ${err.message}`); 
    })
}

function getMovieResults(movieIdResults){
    const movieURLResults=`https://api.themoviedb.org/3/movie/${movieIdResults}/watch/providers?api_key=${movieApiKey}`
    fetch(movieURLResults)
    .then((responseMovieResults)=> {
        if (responseMovieResults.ok){
            return responseMovieResults.json();
        }
        throw new Error(responseMovieResults.statusText);
    })
    .then((responseJsonMovieResults)=> displayDateMovieResults(responseJsonMovieResults))
    .catch((err)=>{
        $("#js-error-messageMovie").text(`Something went wrong: ${err.message}`); 
    })
}

/*------------------Display Results--------------------*/
// display results function 
function displayFoodResults(responseJsonFood) {
    console.log(responseJsonFood);
  $("main").html(`
  <h2>Choose the recipe you want by clicking on the picture that looks good</h2>
    <button id="food">Next</button>
    <h4 class="result-id"></h4>
  `)
  for (let i = 0; i < responseJsonFood.results.length; i++) {
    $("main").append(`
      <div class="food-results">
      <h3>${responseJsonFood.results[i].title}</h3>
      <img src="${responseJsonFood.results[i].image}" alt="${responseJsonFood.results[i].title}" class="recipe-result" id="${responseJsonFood.results[i].id}">
      </div>`
    );
  }

}

function displayMovieResults(responseJsonMovie) {
    console.log(responseJsonMovie);
  $("main").html(`
  <h2>Choose the movie you want by clicking on the movie poster</h2>
    <button id="movie">Next</button>
    <h4 class="result-id"></h4>
  `)
  for (let i = 0; i < responseJsonMovie.results.length; i++) {
    $("main").append(`
      <div class="movie-results">
      <h3>${responseJsonMovie.results[i].title}</h3>
      <img src="https://image.tmdb.org/t/p/w300/${responseJsonMovie.results[i].poster_path}" alt="${responseJsonMovie.results[i].title}" class="movie-result" id="${responseJsonMovie.results[i].id}">
      <p>${responseJsonMovie.results[i].overview}</p>
      </div>`
    );
  }

}

function displayDateFoodResults(responseJsonFoodResults) {
    console.log(responseJsonFoodResults);
  $("main").append(`
  <h2>Enjoy your Dinner</h2>
  <h3>${responseJsonFoodResults.title}</h3>
  <img src="${responseJsonFoodResults.image}" alt="${responseJsonFoodResults.title}" class="date-food" >
  <h4>Time to prepare: ${responseJsonFoodResults.readyInMinutes} minutes<h4>    
  <a href="${responseJsonFoodResults.spoonacularSourceUrl}" target="_blank">Get Recipe</a>
  `)
}

function displayDateMovieResults(responseJsonMovieResults) {
    console.log(responseJsonMovieResults);
  $("main").append(`
  <h2>Enjoy your Movie</h2>
    <h3>${STORE.movieTitle}</h3>
    <img src="${STORE.moviePoster}" alt="${STORE.movieTitle}" class="date-movie" >
    <a href="${responseJsonMovieResults.results.US.link}" target="_blank">Here is where you can find your movie</h4>
    <ul class="movie-watch"></ul>
  `)
}


/*---------------- event handlers -------------------------*/
function onStart() {
    $("main").on('click', '#start', startedPlan);
}

function onFood() {
    $("main").on('click', '#food', foodFill);
}
function onMovie() {
    $("main").on('click', '#movie', movieFill)
}

function onRestart() {
    $("main").on('click', '#restart', restartPlan);
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