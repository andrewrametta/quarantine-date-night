// store all API and api Key variables
const movieApiKey="11de6c637aefaaf2fe43d27cf623fff9"
const spoonApiKey="ba1dd8bb59a545308760ceddf87a648c"
//const movieURL="https://api.themoviedb.org/3/movie/popular"
// stretch goal* const youTubeURL="https://www.googleapis.com/youtube/v3/search"

// create a watch form
function watchForm() {
    $("#js-form").submit((event) => {
        event.preventDefault();
        const searchCity=$("#js-search-location").val();
        const searchFood=$("#js-search-food").val();
        // stretch goal* const searchMovie=$("js-search-movie").val();
        console.log(searchFood)
        getFood(searchFood)
    })
}

watchForm();

//var myHeaders = new Headers();
//myHeaders.append("Authorization", "Bearer Ginpac6lJcI7UvfB1IoF4zNjunhDCDm1FnoL3-1xmWe87RmzBXGvpanQaWEl98SHA_RGJy4tkA4kInGzxJ-p5eO-zsP4tYPhKqUr-fxGBG_IhFEfva0eUeJdclW9X3Yx");

/*var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};
*/  
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
        $("#js-error-message").text(`Something went wrong: ${err.message}`); 
    })
}
// GET function 
/*function getDateNight(searchFood) {
    const movieURL=`https://api.themoviedb.org/3/movie/popular?api_key=${movieApiKey}`
    //const spoonURL=`https://api.spoonacular.com/recipes/complexSearch?apiKey=${spoonApiKey}&cuisine=${searchFood}`
    console.log(movieURL)
    console.log(spoonURL)
    Promise.all([
        fetch(movieURL),
        fetch(spoonURL)
        ])
        .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error(response.statusText);
          })
        .then((responseJson) => console.log(responseJson))
        .catch((err) => {
            $("#js-error-message").text(`Something went wrong: ${err.message}`);
          });
      }



// display results function 
/*function displayResults(responseJson) {
    console.log(responseJson);
}
*/

// query params?