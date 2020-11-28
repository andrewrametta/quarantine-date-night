
// store all API and api Key variables
const movieApiKey="11de6c637aefaaf2fe43d27cf623fff9"
const spoonApiKey="ba1dd8bb59a545308760ceddf87a648c"
// stretch goal* const youTubeURL="https://www.googleapis.com/youtube/v3/search"

const STORE = {
    foodId: [],
    movieId: [],
    foodTitle: "",
    movieTitle: [],
    started: false,
    formFood: false,
    formMovie: false
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
    <input type="submit" value="Search Movie" class="movie">
</form>
    `)
}
// render results
function renderResults() {
    console.log("results will show here");
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
    $("#js-form-movie").click((event)=>{
        event.preventDefault();
        const searchMovie= $("#js-search-movie :selected").val();
        console.log(searchMovie);
        getMovie(searchMovie);
    })
}
watchFormMovie();

/*------------------ watch results functions ---------------*/
function watchFoodResults() {
    $("main").on("click", ".recipe-result", e=> {
        STORE.foodId = Number($(e.currentTarget).attr('id'))
        STORE.foodTitle = $(e.currentTarget).attr("alt");
        console.log(STORE.foodId);
        console.log(STORE.foodTitle);
    });
}

watchFoodResults()
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
    .then((responseJsonFood)=>displayFoodResults(responseJsonFood))
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
    .then((responseJsonMovie)=>console.log(responseJsonMovie))
    .catch((err)=>{
        $("#js-error-messageFood").text(`Something went wrong: ${err.message}`); 
    })
}

/*------------------Display Results--------------------*/
// display results function 
function displayFoodResults(responseJsonFood) {
    console.log(responseJsonFood);
  // iterate through the articles array, stopping at the length of array
  $("main").html(`
  <h2>Choose the recipe you want then click the Next button</h2>
    <button id="food">Next</button>
    <p class="result-id"></p>
  `)
  for (let i = 0; i < responseJsonFood.results.length; i++) {
    // for each state in the results
    //array, add a list item to the results
    //list with the park name, url, description, and address
    $("main").append(`
      <div>
      <h3>${responseJsonFood.results[i].title}</h3>
      <img src=${responseJsonFood.results[i].image} alt=${responseJsonFood.results[i].title} class="recipe-result" id="${responseJsonFood.results[i].id}">
      </div>`,
    );
  }

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
    STORE.food = {};
    STORE.movie = {};
    render();
}

// display results function 
/*function displayResults(responseJson) {
    console.log(responseJson);
}
*/

function dateNight() {
    //onRestart();
    onStart();
    onFood();
    onMovie();
    render();
}

$(dateNight);