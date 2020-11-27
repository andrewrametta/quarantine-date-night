// store all API and api Key variables
const movieApiKey="11de6c637aefaaf2fe43d27cf623fff9"
const spoonApiKey="ba1dd8bb59a545308760ceddf87a648c"
// stretch goal* const youTubeURL="https://www.googleapis.com/youtube/v3/search"

const STORE = {
    food: {},
    movie: {},
    started: false,
    formFood: false,
    formMovie: false,

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
            <input type="submit" value="Search Food" class="food"/>
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
    } else if (STORE.formFood & STORE.formMovie) {
        renderResults();
    } else if (!STORE.formFood & !STORE.formMovie) {
        renderFoodForm();
    } else if (STORE.formFood & !STORE.formMovie) {
        renderMovieForm();
    }
}

/*------- Watch forms-----------------------*/
// create a watch form for food
function watchFormFood() {
    $("#js-form-food").submit((event) => {
        event.preventDefault();
        const searchCity=$("#js-search-location").val();
        const searchFood=$("#js-search-food").val();
        // stretch goal* const searchMovie=$("js-search-movie").val();
        console.log(searchFood);
        getFood(searchFood);
    })
}

watchFormFood();
// create a watch form for movie 
function watchFormMovie() {
    $("#js-form-movie").submit((event)=>{
        event.preventDefault();
        const searchMovie= $("#js-search-movie :selected").val();
        console.log(searchMovie);
        getMovie(searchMovie);
    })
}
watchFormMovie();

/*------------------ GET functions ------------------------*/
// get food
function getFood(searchFood){
    const spoonURL=`https://api.spoonacular.com/recipes/complexSearch?apiKey=${spoonApiKey}&cuisine=${searchFood}`
    fetch(spoonURL)
    .then((responseFood)=> {
        if (responseFood.ok){
            return responseFood.json();
        }
        throw new Error(resonseFood.statusText);
    })
    .then((responseJsonFood)=>console.log(responseJsonFood))
    .catch((err)=>{
        $("#js-error-messageFood").text(`Something went wrong: ${err.message}`); 
    })
}
// get movie
function getMovie(searchMovie){
    const movieURL=`https://api.themoviedb.org/3/discover/movie?api_key=${movieApiKey}&language=en-US&sort_by=popularity.desc&with_genres=${searchMovie}`
    fetch(movieURL)
    .then((responseFood)=> {
        if (responseFood.ok){
            return responseFood.json();
        }
        throw new Error(resonseFood.statusText);
    })
    .then((responseJsonFood)=>console.log(responseJsonFood))
    .catch((err)=>{
        $("#js-error-messageFood").text(`Something went wrong: ${err.message}`); 
    })
}

/*---------------- event handlers -------------------------*/
function onStart() {
    $("main").on('click', '#start', startedPlan);
}

function onFood() {
    $("main").on('clicl', '')
}

function onRestart() {
    $("main").on('click', '#restart', restartPlan);
}


function startedPlan() {
    STORE.started = true;
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
    onRestart();
    onStart();
    render();
}

$(dateNight);