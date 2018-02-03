
import isEmpty from 'lodash/isEmpty';

const initialState = {
  isAuthenticated: false,
  user: {},
};

const setUser = (action) => ({
  isAuthenticated: !isEmpty(action.user),
  user: action.user,
  userFavouritedRecipeId: !isEmpty(action.user && action.user.favoriteRecipe) ? [...action.user.favoriteRecipe.map(elem => elem.id)] : [],
  favouriteRecipes: !isEmpty(action.user && action.user.favoriteRecipe) ? [...action.user.favoriteRecipe] : []
});

export default (state = initialState, action = {}) => {
  switch (action.type) {
  case 'SET_CURRENT_USER':
    return setUser(action);
  case 'UPDATE_PROFILE':
    return setUser(action);
  default: return state;
  }
};
