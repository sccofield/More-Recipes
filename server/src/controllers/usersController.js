import db from '../models/index';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class UserController{
  /**
  * This Handles User Registration
  * @param {obj} req request object
  * @param {obj} res response object
  * @returns {null} json
  */
  static signUp(req, res) {
      return db.User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        profilePicture: req.body.profilePicture
      })
        .then(user => res.status(200).json({message: 'success', data: user}))
        .catch(error => res.status(400).json(error));
  }

  /**
  * This Handles User Authentication
  * @param {obj} req request object
  * @param {obj} res response object
  * @param {obj} next next function
  * @returns {null} json
  */
  static signIn(req, res, next) {

    db.User.find({
      where: {
        email: req.body.email
      }
    }).then(user => {
      bcrypt.compare(req.body.password, user.password).then(response => {
        if (response){
          const token = jwt.sign({userId: user.id, email: user.email}, process.env.SECRET_KEY, {expiresIn: '1h'});
          return res.status(200).send(token)
        } 
        return res.status(200).send('Invalid Password or Email?')
      })
      .catch(error => res.status(404).json(error))
    })
    .catch(error => res.status(200).json(error))
    
  }

  static getFavoriteRecipes(req, res){
    console.log(req.token.userId)
    console.log({} == {}, 'hiooo')
    db.User.findById(req.token.userId)
    .then(user => {
      db.Recipe.findAll({
        where: {
          id: {
            [db.Sequelize.Op.in]: user.favoriteRecipe
          }
        }
      })
      .then(recipes => recipes.length > 0 ? res.status(200).json({message: 'success', data: recipes}) : res.status(404).send('No favorited Recipes Yet, Please Add Some!!!')) 
      .catch(error => res.status(404).send('No favorited Recipes Yet, Please Add Some!!!'))    
    })
    .catch(error => res.status(400).send(error))
  }

  static addFavoriteRecipe(req, res){

    db.User.findById(req.token.userId)
    .then(user => {
      db.Recipe.findById(req.params.id)
      .then(recipe => {
          if(!recipe){
            return res.status(404).send({
              message: "Recipe Not Found",
            });
          }

          else{

            if (user.favoriteRecipe === null){
              user.update({
                favoriteRecipe: [recipe.id]
              })
              .then(recipe => res.status(200).send(user))
              .catch(error => res.status(400).send('error'))
            }else{
              !user.favoriteRecipe.includes(recipe.id) ? user.favoriteRecipe.push(recipe.id) : ''

              user.update({
                favoriteRecipe: user.favoriteRecipe               
              })
              .then(recipe => res.status(200).send(user))
              .catch(error => res.status(400).send('error'))
            }
          }
        })
      .catch(error => res.status(400).send(error))         
      })
    .catch(error => res.status(400).send(error))
  }

  static getRecipes(req, res){

      db.Recipe.findAll({
        where: {
          id: req.token.userId
        }
      })
      .then(recipes => res.status(200).send(recipes))     
      .catch(error => res.status(400).send(error))
  }

}

export default UserController;
