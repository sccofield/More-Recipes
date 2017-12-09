import db from '../models/index';


/**
 * This is a representation of the recipes data
 */
class RecipeController {
  /**
 * This handles getting all recipes
 * @param {obj} req request object
 * @param {obj} res res object
 * @param {obj} next next function
 * @returns {null} json
 */
  static allRecipe(req, res) {
    const sortBy = req.query.sort;

    if (sortBy) {
      const orderBy = req.query.order.toUpperCase();
      req.query.sort.toLowerCase();

      db.Recipe.findAll({
        order: [
          [sortBy, orderBy]
        ],
        offset: parseInt(req.query.page) === 1 ? 0 : req.query.limit * req.query.page,
        limit: req.query.limit
      })
        .then(recipes => res.status(200).json({ status: 'success', recipes }))
        .catch(error => res.status(200).json({ status: 'fail', error: error.message }));
    } else {
      db.Recipe.findAndCountAll()
        .then((recipesWithCount) => {
          db.Recipe.findAll({
            order: [['createdAt', 'DESC']],
            offset: (recipesWithCount.count > req.query.limit) ? req.query.limit * req.query.page : 0,
            limit: req.query.limit
          })
            .then((recipes) => {
              const remainder = recipesWithCount.count % req.query.limit === 0 ? 0 : 1;
              const page = Math.floor(recipesWithCount.count / req.query.limit) + remainder;
              // recipes = recipes.reverse();
              res.status(200).json({ status: 'success', recipes, recipesCount: page });
            })
            .catch(error => res.status(200).json({ status: 'fail', error: error.message }));
        });
    }
  }

  /**
  * This Handles adding a recipe
  * @param {obj} req request object
  * @param {obj} res res object
  * @returns {null} json
  */
  static addRecipe(req, res) {
    return db.Recipe.create({
      id: req.body.id,
      name: req.body.name,
      image: req.body.image || '',
      description: req.body.description,
      steps: req.body.steps || [],
      userId: req.token.userId
    })
      .then(recipe => res.status(201).json({ status: 'success', recipe }))
      .catch(error => res.status(400).json({ status: 'fail', error }));
  }

  /**
  * This Handles getting a recipe
  * @param {obj} req request object
  * @param {obj} res res object
  * @param {obj} next next function
  * @param {number} id this is the id supplied by other class method when getting a single recipe
  * @returns {null} json
  */
  static getRecipe(req, res) {
    console.log('server responding');

    if (isNaN(req.params.id) || req.params.id === '' || req.params.id === '') {
      return res.status(400).send('Please input a valid ID');
    }


    db.Recipe.findById(req.params.id)
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({
            message: 'Recipe Not Found',
          });
        }

        return res.status(200).json({ status: 'success', data: recipe });
      })
      .catch(error => res.status(400).json({ status: 'error', error: error.message }));
  }


  /**
  * This Handles updating a recipe
  * @param {obj} req request object
  * @param {obj} res res object
  * @param {obj} next next function
  * @returns {null} json
  */
  static updateRecipe(req, res) {
    if (isNaN(req.params.id) || req.params.id === '' || req.params.id === '') {
      return res.status(400).send('Please input a valid ID');
    }

    db.Recipe.findById(req.params.id)
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({
            message: 'Recipe Not Found',
          });
        }
        if (recipe.userId === req.token.userId) {
          return recipe
            .update(req.body, { fields: Object.keys(req.body) })
            .then(updatedRecipe => res.status(200).json({ status: 'success', data: updatedRecipe }))
            .catch(error => res.status(400).json({ status: 'error', error: error.message }));
        }
        return res.status(401).send('Not Authorize');
      })
      .catch(error => res.status(400).json({ status: 'error', error: error.message }));
  }

  /**
  * This Handles reviewing a recipe
  * @param {obj} req request object
  * @param {obj} res res object
  * @param {obj} next next function
  * @returns {null} json
  */
  static reviewRecipe(req, res) {
    if (isNaN(req.params.id) || req.params.id === '' || req.params.id === '') {
      return res.status(400).send('Please input a valid ID');
    }

    db.Recipe.findById(req.params.id)
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).json({
            message: 'Recipe Not Found',
          });
        }
        return db.Review.create({
          userId: req.token.userId,
          recipeId: recipe.id,
          body: req.body.body
        })
          .then(review => res.status(200).json({ status: 'success', data: review }))
          .catch(error => res.status(400).json({ status: 'error', error: error.message }));
      })
      .catch(error => res.status(400).json({ status: 'error', error: error.message }));
  }

  /**
  * This Handles deletion a recipe
  * @param {obj} req request object
  * @param {obj} res res object
  * @param {obj} next next function
  * @returns {null} json
  */
  static deleteRecipe(req, res) {
    if (isNaN(req.params.id) || req.params.id === '' || req.params.id === '') {
      return res.status(400).send('Please input a valid ID');
    }

    db.Recipe.findById(req.params.id)
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({
            message: 'Recipe Not Found',
          });
        }
        console.log(recipe);

        if (recipe.userId === req.token.userId) {
          return recipe
            .destroy()
            .then(() => res.status(204).json({ status: 'success', message: 'No Content' }))
            .catch(error => res.status(400).json({ status: 'error', error: error.message }));
        }
        return res.status(401).send('Not Authorize');
      })
      .catch(error => console.log(error.message));
  }

  /**
   * @static
   * @param {any} req
   * @param {any} res
   * @returns {obj} obj
   * @memberof RecipeController
   */
  static upVoteRecipe(req, res) {
    if (isNaN(req.params.id) || req.params.id === '' || req.params.id === '') {
      return res.status(400).send('Please input a valid ID');
    }

    db.Recipe.findById(req.params.id)
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).json({
            message: 'Recipe Not Found',
          });
        }

        if (recipe.upvotes === null) {
          recipe.upvotes = [];
        }

        if (!recipe.upvotes.includes(req.token.userId)) {
          console.log(typeof req.token.userId);
          recipe.upvotes.push(req.token.userId);
          recipe.downvotes = recipe.downvotes.filter(id => id != req.token.userId);
        } else {
          recipe.upvotes = recipe.upvotes.filter(id => id != req.token.userId);
        }
        recipe.update({
          upvotes: recipe.upvotes,
          downvotes: recipe.downvotes
        })
          .then(recipe => res.status(200).json({ status: 'success', recipe }))
          .catch(error => res.status(400).json({ status: 'error', error: error.message }));
      })
      .catch(error => res.status(400).json({ status: 'error', error: error.message }));
  }

  /**
   * @static
   * @param {any} req
   * @param {any} res
   * @returns {obj} obj
   * @memberof RecipeController
   */
  static downVoteRecipe(req, res) {
    if (isNaN(req.params.id) || req.params.id === '' || req.params.id === undefined) {
      return res.status(400).send('Please input a valid ID');
    }

    db.Recipe.findById(req.params.id)
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({
            message: 'Recipe Not Found',
          });
        }
        if (recipe.downvotes === null) {
          recipe.downvotes = [];
        }

        if (!recipe.downvotes.includes(req.token.userId)) {
          recipe.downvotes.push(req.token.userId);
          recipe.upvotes = recipe.upvotes.filter(id => id != req.token.userId);
        } else {
          recipe.downvotes = recipe.downvotes.filter(id => id != req.token.userId);
        }

        recipe.update({
          downvotes: recipe.downvotes,
          upvotes: recipe.upvotes
        })
          .then(recipe => res.status(200).json({ status: 'success', recipe }));
      })
      .catch(error => res.status(400).json({ status: 'error', error: error.message }));
  }

  /**
   * @static
   * @param {any} req
   * @param {any} res
   * @returns {obj} obj
   * @memberof RecipeController
   */
  static popularRecipe(req, res) {
    db.Recipe.findAll({
      where: {
        upvotes: {
          [db.sequelize.Op.ne]: []
        }
      },
    })
      .then(popularRecipes => res.status(200).json({
        status: 'success',
        popularRecipes: popularRecipes.sort((a, b) => b.upvotes.length - a.upvotes.length).splice(0, req.query.limit ? req.query.limit : popularRecipes.length)
      }))
      .catch(error => console.log(error.message));
  }
}

export default RecipeController;
