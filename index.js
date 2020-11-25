// store all API and api Key variables
const movieApiKey="11de6c637aefaaf2fe43d27cf623fff9"
const yelpApiKey="Ginpac6lJcI7UvfB1IoF4zNjunhDCDm1FnoL3-1xmWe87RmzBXGvpanQaWEl98SHA_RGJy4tkA4kInGzxJ-p5eO-zsP4tYPhKqUr-fxGBG_IhFEfva0eUeJdclW9X3Yx"
//const movieURL="https://api.themoviedb.org/3/movie/popular"
//const yelpURL="https://api.yelp.com/v3/businesses/search"
// stretch goal* const youTubeURL="https://www.googleapis.com/youtube/v3/search"

// create a watch form
function watchForm() {
    $("#js-form").submit(event => {
        event.preventDefault();
        const searchCity=$("#js-search-location").val();
        const searchFood=$("js-seach-food").val();
        // stretch goal* const searchMovie=$("js-search-movie").val();
        getDateNight()
    })
}

// GET function 
function getDateNight() {
    const movieURL=`https://api.themoviedb.org/3/movie/popular?${movieApiKey}&language=en-US`
    const yelpURL=`https://api.yelp.com/v3/transactions/food_delivery/search?term=restaurant&location=${searchCity}&limit=10&open_now=true&categories=${searchFood}`
    Promise.all([
        fetch()
    ])
}



// display results function 



// query params?