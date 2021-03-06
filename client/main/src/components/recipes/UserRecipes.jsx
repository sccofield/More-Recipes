import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addRecipe,
  getUserRecipes,
  recipeCategories }
  from '../../actions/Recipes';
import RecipeCard from './RecipeCard';
import Pagination from './Pagination';
import Exclamation from './Exclamation';
import RecipeModal from './RecipeModal';
import CategoryButton from './CategoryButton';


/**
 * @export
 * @class UserRecipes
 * @extends {Component}
 */
export class UserRecipes extends Component {
  /**
   * Creates an instance of UserRecipes.
   * @param {any} props
   * @memberof UserRecipes
   */
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      image: '',
      ingredients: [],
      steps: [],
      errors: {},
      categoryId: '',
      downvotes: [],
      upvotes: [],
      userRecipes: []
    };
    this.paginateRecipe = this.paginateRecipe.bind(this);
  }

  /**
  * @returns {void} void
  * @memberof UserRecipes
  */
  componentDidMount() {
    this.props.recipeCategories();
    this.paginateRecipe();
  }

  /**
   * @param {Number} [page=1]
   *
   * @returns {void} void
   * @memberof UserRecipes
   */
  paginateRecipe(page = 1) {
    this.props.getUserRecipes(page)
      .then(res => {
        this.setState({
          userRecipes: [...this.state.userRecipes, ...res.recipes]
        });
      });
  }


  /**
   * @returns {JSX} jsx
   * @memberof UserRecipes
   */
  render() {
    return (
      <div id="userRecipesBody">
        <main style={{ marginTop: 40 }}>

          <div className="container">
            <CategoryButton />
          </div>

          <div className="container">
            <div style={{ textAlign: 'center', marginTop: 100 }}>
              <Link to="#" className="btn auth-button"
                data-toggle="modal"
                id="addRecipe"
                data-target="#addModal">Add Recipe</Link>
              <h4 className="container__myrecipes">My Recipes</h4><br /><br />
              <RecipeModal addRecipe={this.props.addRecipe}
                recipeCategories={this.props.categories}/>
            </div>

            <div className="row">
              {
                this.props.userRecipes.length > 0 ?
                  this.props.userRecipes.map((elem, index) => (
                    <RecipeCard key={elem.id} user={this.props.user}
                      recipe={elem} id={elem.id} onDelete={this.deleteRecipe}
                      editRecipe={this.editRecipe}
                    />)) :
                  <Exclamation>
                    <p className="text-muted">Sorry you haven't added any
                     recipe yet, please add to get started</p>
                  </Exclamation>
              }
            </div>
          </div>
        </main>
        <Pagination
          recipesPagination={this.paginateRecipe}
          recipesCount={this.props.recipesCount}
        />
      </div>
    );
  }
}

const propTypes = {
  recipesCount: PropTypes.number.isRequired,
  categories: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  userRecipes: PropTypes.array.isRequired,
  addRecipe: PropTypes.func.isRequired,
  getUserRecipes: PropTypes.func.isRequired,
  recipeCategories: PropTypes.func.isRequired,
};

UserRecipes.propTypes = propTypes;

/**
 * mapStateToProps
 * @param {Object} state
 *
 * @returns {Object} object
 */
export const mapStateToProps = (state) => ({
  recipes: state.recipes,
  user: state.auth.user,
  userRecipes: state.recipes.allRecipes,
  recipesCount: Number(state.recipes.pagination),
  categories: state.recipes.recipeCategories
});

export default connect(mapStateToProps, {
  addRecipe, getUserRecipes, recipeCategories
})(UserRecipes);

