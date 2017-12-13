
import isEmpty from 'lodash/isEmpty';

const initialState = {
  allRecipes: [],
  pagination: '',
  userFavouritedRecipeId: [],
  favouriteRecipes: [],
  popularRecipes: [],
  recipeCategories: []
  // favouritedRecipesCount: '',
  // userRecipes: []
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
  case 'ADD_RECIPE':
    return {
      ...state,
      ...{ allRecipes: [action.recipe, ...state.allRecipes] }
    };

  case 'GET_RECIPE':
    return { ...state, ...{ allRecipes: [...state.allRecipes.filter(recipe => recipe.id === parseInt(action.id))] || action.recipe } };

  case 'GET_USER_RECIPES':
    return {
      ...state,
      ...{
        allRecipes:
        action.recipes
      }
    };

  case 'GET_RECIPES':

    return {
      ...state,
      ...{
        allRecipes: action.allRecipes,
        pagination: action.pagination
      }
    };

  case 'RECIPE_CATEGORIES':

    return {
      ...state,
      ...{
        recipeCategories: action.recipeCategories,
      }
    };
  case 'GET_POPULAR_RECIPES':
    return {
      ...state,
      ...{
        popularRecipes: [...action.popularRecipe]
      }
    };

  case 'SEARCH_RECIPES':
    return {
      ...state,
      ...{
        allRecipes: [...action.recipes],
        pagination: action.pagination
      }
    };

  case 'DELETE_RECIPE':
    return {
      ...state,
      ...{ allRecipes: state.allRecipes.filter(recipe => recipe.id !== action.id) }
    };


  case 'EDIT_RECIPE':

    return {
      ...state,
      ...{
        allRecipes: [...state.allRecipes.map((recipe) => {
          if (recipe.id == action.recipe.id) {
            recipe = action.recipe;
          }
          return recipe;
        })]
      }
    };

  case 'TOGGLE_FAVOURITE_RECIPE':
    return {
      ...state,
      ...{
        favouriteRecipes: !state.userFavouritedRecipeId.includes(action.favouritedRecipe.id) ?
          [...state.favouriteRecipes, action.favouritedRecipe] :
          state.favouriteRecipes.filter(recipe => recipe.id != action.favouritedRecipe.id),

        userFavouritedRecipeId: !state.userFavouritedRecipeId.includes(action.favouritedRecipe.id) ?
          state.userFavouritedRecipeId.concat(action.favouritedRecipe.id) :
          state.userFavouritedRecipeId.filter(id => id !== action.favouritedRecipe.id)
      }
    };

  case 'TOGGLE_THUMBS_UP_RECIPE':


    return {
      ...state,
      ...{
        allRecipes: [...state.allRecipes.map((recipe) => {
          if (recipe.id === action.recipe.id) {
            recipe = action.recipe;
          }
          return recipe;
        })],
        favouriteRecipes: [...state.favouriteRecipes.map((recipe) => {
          if (recipe.id === action.recipe.id) {
            recipe = action.recipe;
          }
          return recipe;
        })],
      }
    };

  case 'TOGGLE_THUMBS_DOWN_RECIPE':

    return {
      ...state,
      ...{
        allRecipes: [...state.allRecipes.map((recipe) => {
          if (recipe.id === action.recipe.id) {
            recipe = action.recipe;
          }
          return recipe;
        })],
        favouriteRecipes: [...state.favouriteRecipes.map((recipe) => {
          if (recipe.id === action.recipe.id) {
            recipe = action.recipe;
          }
          return recipe;
        })],
      }
    };

  case 'GET_FAVOURITED_RECIPES':
    return {
      ...state,
      favouriteRecipes: [...action.favouriteRecipes],
      pagination: action.pagination
    };

  case 'GET_USER_FAVOURITED_RECIPES_ID':
    return {
      ...state,
      ...{ userFavouritedRecipeId: action.favouritedRecipesIds }
    };

  default: return state;
  }
};
