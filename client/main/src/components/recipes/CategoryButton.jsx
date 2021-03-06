import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


/**
 * @param {Object} props
 *
 * @returns {jsx} JSX
 */
function CategoryButton(props) {
  return (
    <div className="dropdown" style={{ float: 'left' }}>
      <button className="btn btn-default dropdown-toggle auth-button"
        type="button" id="about-us" data-toggle="dropdown"
        aria-haspopup="true" aria-expanded="false">Category
      </button>
      <div className="dropdown-menu" aria-labelledby="about-us">
        {
          props.categories.map(category =>
            (<Link className="dropdown-item"
              key={category.id} to={`/categories/${category.name}`}
            >{category.name}</Link>))
        }
      </div>
    </div>
  );
}

const propTypes = {
  categories: PropTypes.array.isRequired,
};

CategoryButton.propTypes = propTypes;

/**
 * mapStateToProps
 * @export
 * @param {Object} state
 *
 * @returns {Object} object
 */
export const mapStateToProps = (state) => ({
  categories: state.recipes.recipeCategories
    .map(category => ({ name: category.name, id: category.id }))
});

export { CategoryButton as CategoriesButton };
export default connect(mapStateToProps)(CategoryButton);
