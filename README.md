# Assignment 2 - React App 

__Name:__ Edwin Jose

__Video demonstration:__ ..... [URL of YouTube video demonstration](https://youtu.be/Xu-KngZjoSQ) ....

This repository contains an implementation of the Movie Fans Web Application using the React. 

### Features
[ A bullet-point list of the __new features__ you added to the Movies app.]

+ Add pagination
+ Favourite TV series  
+ Favourite Actors
+ My fantasy movie - The user can create their fantasy movie record. Allow the addition of a cast, where each member has a role name and description. Adding/Uploading a movie poster  
+ Add Review for Favorite Movie
+ Add favorite and remove favorite button  
+ Add TV show detailed view section
+ Add Actors details view
+ Data Model - An additional data entity type: TV series and Server state Caching  
+ Popular movie page
+ Sign In with private and public routing.
+ Upcoming movies
+ Flitering movies with language.


### Setup requirements.

+ Ensure you have Node.js and npm installed on your machine  
+ Navigate to the root directory of the cloned repository in your terminal  
+ Run `npm install` to install the necessary dependencies  
+ Create a `.env` file in the root directory and add your TMDB API key as `REACT_APP_TMDB_API_KEY=your_api_key_here`  
+ Run `npm start` to start the development server  
+ Open your web browser and navigate to http://localhost:3000 to view the app  
+ Make sure to replace `your_api_key_here` with your actual TMDB API key  

### API Endpoints

+ Get list of favourite movies - `/movies/favourites`
+ Get movie details - `/movies/:id`
+ Get home page data (e.g. trending movies, featured sections) - `/`
+ Get specific movie review - `/reviews/:id`
+ Get upcoming movies - `/movies/upcoming`
+ Submit new movie review - `/reviews/form`
+ Get popular movies - `/movies/popular`
+ Get TV series list - `/tv`
+ Get actors list - `/actors`
+ Get actor details - `/actors/:id`
+ Get TV series details - `/tv/:id`
+ User authentication - `/signin`
+ Get favourite actors - `/actors/favourites`
+ Get favourite TV shows - `/tv/favourites`
+ Create fantasy movie - `/fantasy/create`
+ Get list of fantasy movies - `/fantasymovies`
+ Get reviews on favourites - `/favouriteReview`

### Routing

+ Home Page = `/`
+ Redirect any unknown route to Home Page = `"*"`
+ Favourite Movies Page = `/movies/favourites`
+ Movie Details Page = `/movies/:id`
+ Upcoming Movies Page = `/movies/upcoming`
+ Popular Movies Page = `/movies/popular`
+ Add Movie Review Page = `/reviews/form`
+ Movie Review Page = `/reviews/:id`
+ TV Series Page = `/tv`
+ TV Series Details Page = `/tv/:id`
+ Favourite TV Shows Page = `/tv/favourites`
+ Actors Page = `/actors`
+ Actor Details Page = `/actors/:id`
+ Favourite Actors Page = `/actors/favourites`
+ Sign In Page = `/signin`
+ Create Fantasy Movie Page = `/fantasy/create`
+ Fantasy Movies List Page = `/fantasymovies`
+ Reviews for Favourite Movies Page = `/favouriteReview`


### Assignment 1 integration

+ Front end deployment  
+ Frontend CDN deployment to AWS (CloudFront)  

### Independent learning (If relevant)
  
+ Uploading poster of the movie 
+ Allow the addition of a cast, where each member has a role name and description  
+
