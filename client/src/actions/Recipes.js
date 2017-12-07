import axios from 'axios';

/**
 * @param {*} recipe
 * @return {obj} object
 */
export function setRecipe(recipe) {
  return {
    type: 'ADD_RECIPE',
    recipe
  };
}

/**
 * @export
 * @param {any} id
 * @returns {obj} obj
 */
export function getRecipeAction(id) {
  return {
    type: 'GET_RECIPE',
    id
  };
}

/**
 * @export
 * @param {any} id
 * @returns {obj} obj
 */
export function deleteRecipeAction(id) {
  return {
    type: 'DELETE_RECIPE',
    id
  };
}

/**
 * @export
 * @param {any} recipe
 * @returns {obj} obj
 */
export function editRecipeAction(recipe) {
  return {
    type: 'EDIT_RECIPE',
    id: recipe.id,
    recipe
  };
}

/**
 * @export
 * @param {any} recipes
 * @returns {obj} obj
 */
export function userRecipes(recipes) {
  return {
    type: 'GET_USER_RECIPES',
    recipes
  };
}

/**
 * @export
 * @param {any} favouritedRecipesIds
 * @returns {obj} obj
 */
export function favouritedRecipesIdsAction(favouritedRecipesIds) {
  return {
    type: 'GET_USER_FAVOURITED_RECIPES_ID',
    favouritedRecipesIds
  };
}

/**
 * @export
 * @param {any} favouriteRecipes
 * @param {any} favouritedRecipesCount
 * @returns {obj} obj
 */
export function favouritedRecipesAction(favouriteRecipes, favouritedRecipesCount) {
  return {
    type: 'GET_FAVOURITED_RECIPES',
    favouriteRecipes,
    favouritedRecipesCount
  };
}

/**
 * @export
 * @param {any} allRecipes
 * @param {any} recipesCount
 * @returns {obj} obj
 */
export function allRecipesAction(allRecipes, recipesCount) {
  return {
    type: 'GET_RECIPES',
    allRecipes,
    recipesCount
  };
}

/**
 * @export
 * @param {any} favouritedRecipe
 * @returns {obj} obj
 */
export function toggleFavouriteRecipeAction(favouritedRecipe) {
  return {
    type: 'TOGGLE_FAVOURITE_RECIPE',
    favouritedRecipe
  };
}

/**
 * @export
 * @param {any} page
 * @returns {obj} obj
 */
export function allRecipes(page) {
  return dispatch => axios.get(`/api/v1/recipes?limit=8&page=${page}`)
    .then((res) => {
      const { recipes: allRecipes, recipesCount } = res.data;
      return dispatch(allRecipesAction(allRecipes, recipesCount));
    })
    .catch(error => console.log(error));
}

/**
 * @export
 * @returns {obj} obj
 */
export function getFavouritedRecipesIds() {
  return dispatch => axios.get('api/v1/users/fav-recipes/getIds')
    .then((res) => {
      const { favouritedRecipesIds } = res.data;
      return dispatch(favouritedRecipesIdsAction(favouritedRecipesIds));
    })
    .catch(error => console.log(error));
}

/**
 * @export
 * @param {any} page
 * @returns {obj} obj
 */
export function getFavouritedRecipes(page) {
  return dispatch => axios.get(`/api/v1/users/fav-recipes?limit=8&page=${page}`)
    .then((res) => {
      const { favouritedRecipes, favouritedRecipesCount } = res.data;
      return dispatch(favouritedRecipesAction(favouritedRecipes, favouritedRecipesCount));
    })
    .catch(error => console.log(error.message));
}

/**
 * @export
 * @param {any} data
 * @returns {obj} obj
 */
export function addRecipe(data) {
  return (dispatch) => {
    console.log(data, 'data');
    return axios.post('api/v1/recipes', data)
      .then((res) => {
        toastr.success('Recipe Added', 'Success');
        return dispatch(setRecipe(recipe));
      })
      .catch((error) => {
        if (error) {
          console.log(error.response.data);
        }
      });
  };
}

/**
 * @export
 * @param {any} id
 * @returns {obj} obj
 */
export function toggleFavouriteRecipe(id) {
  return dispatch => axios.post(`api/v1/users/fav-recipes/${id}/add`)
    .then((res) => {
      const { recipe } = res.data;
      console.log('data', res.data);
      return dispatch(toggleFavouriteRecipeAction(recipe));
    })
    .catch((error) => {
      if (error) {
        console.log(error.response);
        console.log(error);
      }
    });
}

/**
 * @export
 * @param {any} id
 * @returns {obj} obj
 */
export function deleteRecipe(id) {
  return dispatch => axios.delete(`api/v1/recipes/${id}`)
    .then((res) => {
      toastr.success('Recipe Deleted', 'Success');
      return dispatch(deleteRecipeAction(id));
    })
    .catch((error) => {
      if (error) {
        console.log(error.response);
        console.log(error.response.data);
      }
    });
}

/**
 * @export
 * @param {any} id,
 * @param {any} recipe
 * @returns {obj} obj
 */
export function editRecipe(id, recipe) {
  return (dispatch) => {
    console.log('id', id, 'recipeToBeUpdated', recipe);
    return axios.put(`api/v1/recipes/${id}`, recipe)
      .then((res) => {
        toastr.success('Recipe Updated', 'Success');
        console.log('res', res.data.data);
        return dispatch(editRecipeAction(res.data.data));
      })
      .catch((error) => {
        if (error) {
          console.log(error);
          console.log(error.response.data);
        }
      });
  };
}

/**
 * @export
 * @param {any} id
 * @returns {obj} obj
 */
export function getRecipe(id) {
  return dispatch => axios.get(`/api/v1/recipes/${id}`)
    .then(res => dispatch(getRecipeAction(id)))
    .catch((error) => {
      if (error) {
        console.log('error', error);
        console.log(error.response.data);
      }
    });
}

/**
 * @export
 * @returns {obj} obj
 */
export function getUserRecipes() {
  return dispatch => axios.get('api/v1/users/myrecipes')
    .then((res) => {
      const { recipes } = res.data;
      return dispatch(userRecipes(recipes));
    })
    .catch((error) => {
      if (error) {
        console.log(error.response.data);
      }
    });
}
