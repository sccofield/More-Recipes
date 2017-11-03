[![Build Status](https://travis-ci.org/SEUNAGBEYE/More-Recipes.svg?branch=server-developing)](https://travis-ci.org/SEUNAGBEYE/More-Recipes)
[![Coverage Status](https://coveralls.io/repos/github/SEUNAGBEYE/More-Recipes/badge.svg?branch=development)](https://coveralls.io/github/SEUNAGBEYE/More-Recipes?branch=development)
[![Maintainability](https://api.codeclimate.com/v1/badges/cfa1eddd9d86ea7c5b4d/maintainability)](https://codeclimate.com/github/SEUNAGBEYE/More-Recipes/maintainability)

This is a project that allows users to upload, search, review, up-vote and down-vote a recipe.


<p align="center">
    <img src="https://fuchodeveloper.github.io/assets/images/logo.png" alt='more recipes logo'/>
</p>

<p align="center">
    <img src="https://travis-ci.org/fuchodeveloper/more-recipes.svg?branch=master" alt="travis ci build test badge" />
    <a href='https://coveralls.io/github/fuchodeveloper/more-recipes?branch=master'><img src='https://coveralls.io/repos/github/fuchodeveloper/more-recipes/badge.svg?branch=master' alt='Coverage Status' /></a>
    <a href="https://codeclimate.com/github/fuchodeveloper/more-recipes"><img src="https://codeclimate.com/github/fuchodeveloper/more-recipes/badges/gpa.svg" /></a>
</p>

## More-recipes
More-Recipes provides a platform for users to share the awesome and exciting  recipe ideas they have invented or learnt.  Suppose a user comes up with a recipe,  he/she can post it on More-Recipes and  get feedback in form of reviews and votes from other users who explore that recipe. Users can also keep a list of their favorite recipes on the application.


## How it works 
* User can see recips uploaded by the users of the app,

* Users can:
	* view a recipe, 
	* Search for recipes
* Authenticated users should be able to:
    * Add a recipe
    * View or modify the recipe he/she added
    * Delete the recipe he/she added
    * Retrieve recipes from the catalog
    * Modify a recipe in the catalog, including upvoting, downvoting, favoriting e.t.c
    * Delete a recipe from the catalog
    * Retrieve favorited recipes from the catalog
    * Add a review for a recipe
    * Retrieve recipes with the most upvotes
    

<h3>ENDPOINTS</h3>
<hr>
<table>
  <tr>
      <th>Request</th>
      <th>End Point</th>
      <th>Action</th>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/users/signup</td>
      <td>Create an account</td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/users/signin</td>
      <td>Signin to the app</td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/recipes</td>
      <td>Create a recipe</td>
  </tr>  
  <tr>
      <td>DELETE</td>
      <td>/api/v1/recipes/:id</td>
      <td>Delete a recipe you created</td>
  </tr>
  
  <tr>
      <td>PUT</td>
      <td>/api/v1/recipes/:id</td>
      <td>Update a reecipe you created/td>
  </tr>
  
  <tr>
      <td>POST</td>
      <td>/api/v1/recipes/:id/upvote</td>
      <td>Upvote a recipe</td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/recipes/:id/reviews </td>
      <td>Post a review</td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/recipes/:id/upvote</td>
      <td>Upvote a recipe</td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/recipes/:id/downvote</td>
      <td>Downvote a recipe</td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/users/:id/recipes</td>
      <td>Favorite a recipe</td>
  </tr>
   <tr>
      <td>GET</td>
      <td>/api/v1/users/:id/recipes</td>
      <td>Get all your favorite recipes</td>
  </tr>
    <tr>
      <td>GET</td>
      <td>/api/recipes/:id</td>
      <td>Get a recipe</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/recipes</td>
      <td>Get all recipe</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/recipes?sort=upvotes&order=des</td>
      <td>Gets recipe with most Upvotes</td>
  </tr>
</table>
<br/>


checkout the UI at https://seunagbeye.github.io/More-Recipes/template/

