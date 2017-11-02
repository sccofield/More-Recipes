import express from 'express';
import { json, urlencoded } from 'body-parser';
import RecipeController from '../controllers/recipesController';
import UserController from '../controllers/usersController';
import authMiddleware from '../middlewares/authMiddleware';

const recipeRoute = express();
const userRoute = express();


recipeRoute.use(json()); // for parsing application/json
recipeRoute.use(urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

userRoute.use(json()); // for parsing application/json
userRoute.use(urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

recipeRoute.route('/')
  .get(RecipeController.allRecipe)
  .post(authMiddleware, RecipeController.addRecipe)

recipeRoute.route('/:id')
  .get(RecipeController.getRecipe)
  .put(authMiddleware, RecipeController.updateRecipe)
  .delete(authMiddleware, RecipeController.deleteRecipe)
  .post(authMiddleware, RecipeController.upVoteRecipe)

recipeRoute.route('/:id/upvotes')
  .put(authMiddleware, RecipeController.upVoteRecipe)

recipeRoute.route('/:id/downvotes')
  .put(authMiddleware, RecipeController.downVoteRecipe)

recipeRoute.route('/:id/reviews')
  .post(authMiddleware, RecipeController.reviewRecipe)

// User Routes Starts Here

userRoute.route('/signup')
  .get((req, res) => {
    res.send("Please Sign Up");
  })
  .post(UserController.signUp)

userRoute.route('/signin')
  .get((req, res) => {
    res.send("Please Sign In");
  })
  .post(UserController.signIn)

userRoute.route('/:id/recipes')
  .get(authMiddleware, UserController.getFavoriteRecipes)

userRoute.route('/:id/recipes/:id')
  .post(authMiddleware, UserController.addFavoriteRecipe)

userRoute.route('/myrecipes')
  .get(authMiddleware, UserController.getRecipes)

export { recipeRoute, userRoute };