import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loader from 'react-loader';
import { recipeCategories } from '../../actions/Recipes';
import RecipeCard from './RecipeCard';
import Pagination from './Pagination';
import Exclamation from './Exclamation';
import CategoryButton from './CategoryButton';


/**
 * @class CategoryPage
 * @extends {Component}
 */
class CategoryPage extends Component {
  /**
   * Creates an instance of AllRecipes.
   * @param {any} props
   * @memberof AllRecipes
   */
  constructor(props) {
    super(props);
    this.paginateRecipes = this.paginateRecipes.bind(this);
  }

  /**
   * @returns {void} void
 * @memberof CategoryPage
 */
  componentDidMount() {
    this.paginateRecipes(1);
  }

  /**
   * @returns {void} void
   * @param {any} page
   * @memberof CategoryPage
   */
  paginateRecipes(page) {
    this.props.recipeCategories();
  }

  /**
   * @returns {jsx} JSX
   * @memberOf CategoryPage
   */
  render() {
    return (
      <div>
        { this.props.loading ?
          <main style={{ marginTop: 40 }}>
            <div className="container">
              <CategoryButton />
            </div>

            <div className="container">
              <div style={{ textAlign: 'center', marginTop: 100 }}>
                <h4 className="container__myrecipes">
                  {this.props.category.name}
                </h4><br /><br />
              </div>

              <div className="row">
                {
                  this.props.category.recipes.length > 0 ?
                    this.props.category.recipes.map((elem, index) => (
                      <RecipeCard key={elem.id}
                        user={this.props.user}
                        recipe={elem}
                        id={elem.id}
                        onDelete={this.deleteRecipe}
                        editRecipe={this.editRecipe}
                        toggleFavouriteRecipe={this.toggleFavouriteRecipe}
                        history={this.props.history}
                      />)) :
                    <Exclamation>
                      <p className="text-muted text-center">
                      Sorry no recipe has been added to
                        {this.props.category.name}
                       yet, please add to get started
                      </p>
                    </Exclamation>
                }
              </div>
            </div>
            <Pagination recipesCount={this.props.pagination}
              recipesPagination={this.paginateRecipes}
            />
          </main> :
          <Loader loaded={this.props.loading}/> }
      </div>
    );
  }
}

/**
 * mapStateToProps
 * @param {Object} state
 * @param {Object} props
 *
 * @returns {Object} object
 */
const mapStateToProps = (state, props) => ({
  recipes: state.recipes.allRecipes,
  pagination: state.recipes.pagination,
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.recipes.loading,
  category: state.recipes.recipeCategories
    .find(recipeCategory => (
      recipeCategory.name === props.match.params.categoryName
    ))
});

const propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  recipes: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  category: PropTypes.object.isRequired,
  recipeCategories: PropTypes.func.isRequired,
  pagination: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired

};

CategoryPage.propTypes = propTypes;

export default connect(mapStateToProps, { recipeCategories })(CategoryPage);

