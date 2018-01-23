import bcrypt from 'bcrypt';
import model from '../models';
import mail from '../helpers/mail';
import jwtSigner from '../helpers/jwt';

const { User, Recipe, Review } = model;


/**
 * @class UserController
 */
class UserController {
  /**
  * This Handles User Registration
  * @param {obj} req request object
  * @param {obj} res response object
  * @returns {null} json
  */
  static signUp(req, res) {
    if (!req.body.password || req.body.password.length < 6) {
      return res.status(400).send({ status: 'Bad Request', message: 'Password must be greater than 6' });
    }

    return User.create({
      id: req.body.id,
      firstName: req.body.firstName || '',
      lastName: req.body.lastName || '',
      email: req.body.email,
      password: req.body.password || '',
      profilePicture: req.body.profilePicture
    })
      .then((user) => {
        const {
          firstName, lastName, email, profilePicture, favoriteRecipe, id: userId
        } = user;
        const payload = {
          userId, email, firstName, lastName, favoriteRecipe, profilePicture
        };
        const token = jwtSigner(payload);
        const userProfile = {
          firstName,
          lastName,
          email,
          profilePicture,
          token
        };
        res.status(201).send({ status: 'Success', data: userProfile });
      })
      .catch(errors => res.status(400).send({
        status: 'Bad Request',
        message: 'Bad Request',
        errors: errors.errors.map((registrationError => ({ field: registrationError.path, description: registrationError.message })))
      }));
  }

  /**
  * This Handles User Authentication
  * @param {obj} req request object
  * @param {obj} res response object
  * @param {obj} next next function
  * @returns {null} json
  */
  static signIn(req, res) {
    User.find({
      where: {
        email: req.body.email
      }
    })
      .then((user) => {
        if (!user) {
          return res.status(404).send({ status: 'Not Found', message: 'User Not Found', data: {} });
        }
        bcrypt.compare(req.body.password, user.password).then((response) => {
          if (response) {
            const {
              id: userId, email, firstName, lastName, favoriteRecipe, profilePicture
            } = user;
            const payload = {
              userId, email, firstName, lastName, favoriteRecipe, profilePicture
            };
            const token = jwtSigner(payload);
            return res.status(200).send({ status: 'Sucesss', token });
          }
          return res.status(401).send({ status: 'UnAuthorized', message: 'Invalid Password or Email' });
        })
          .catch(errors => res.status(400).send({
            status: 'Bad Request',
            message: 'Bad Request',
            errors
          }));
      });
  }

  /**
   * @static
   * @param {any} req
   * @param {any} res
   * @memberof UserController
   * @returns {obj} ob
   */
  static getFavoriteRecipes(req, res) {
    // Am Getting the User Favourited Recipe Id's Here When the actionType === 'getIds'
    if (req.params.actionType === 'getIds') {
      return User.findById(req.token.userId)
        .then(user => res.status(200).send({ status: 'Success', data: user.favoriteRecipe }))
        .catch(errors => res.status(404).send({ status: 'Not Found', message: 'User Not Found', errors: errors.message }));
    }

    User.findById(req.token.userId)
      .then((user) => {
        Recipe.findAll({
          where: {
            id: {
              $in: user.favoriteRecipe
            }
          },
        })
          .then((recipes) => {
            res.status(200).send({ status: 'Success', data: recipes });
          });
      })
      .catch(errors => res.status(404).send({ status: 'Not Found', message: 'User Not Found', errors: errors.message }));
  }

  /**
   * @static
   * @param {any} req
   * @param {any} res
   * @memberof UserController
   * @returns {obj} obj
   */
  static addFavoriteRecipe(req, res) {
    User.findById(req.token.userId)
      .then((user) => {
        Recipe.find({
          where: {
            id: req.params.id
          },
          include: [{
            model: Review, as: 'reviews', include: [{ model: User, as: 'user', attributes: ['firstName', 'lastName', 'profilePicture'] }], limit: 5
          }]
        })
          .then((recipe) => {
            if (!recipe) {
              return res.status(404).send({
                status: 'Not Found',
                message: 'Recipe Not Found',
              });
            } else if (user.favoriteRecipe === null) {
              user.update({
                favoriteRecipe: [recipe.id]
              })
                .then(() => res.status(200).send({ status: 'Success', data: recipe }));
            } else {
              if (!user.favoriteRecipe.includes(recipe.id)) {
                user.favoriteRecipe.push(recipe.id);
              } else {
                user.favoriteRecipe = user.favoriteRecipe.filter(id => id !== parseInt(recipe.id, 10));
              }

              user.update({
                favoriteRecipe: user.favoriteRecipe
              })
                .then(() => {
                  res.status(200).send({ status: 'Success', data: recipe });
                });
            }
          });
      })
      .catch(errors => res.status(400).send({ status: 'Bad Request', errors: errors.message }));
  }

  /**
   * @static
   * @param {any} req
   * @param {any} res
   * @memberof UserController
   * @returns {obj} obj
   */
  static getRecipes(req, res) {
    Recipe.findAll({
      where: {
        userId: req.token.userId
      }
    })
      .then((recipes) => {
        res.status(200).send({ status: 'Success', data: recipes });
      })
      .catch(errors => res.status(400).send({ status: 'Bad Request', errors: errors.message }));
  }

  /**
   * @static
   * @param {any} req
   * @param {any} res
   * @memberof UserController
   * @returns {obj} obj
   */
  static myProfile(req, res) {
    User.findById(req.token.userId)
      .then((user) => {
        const {
          firstName, lastName, email, profilePicture
        } = user;
        const userProfile = {
          firstName, lastName, email, profilePicture
        };
        res.status(200).send({ status: 'Success', data: userProfile });
      })
      .catch(errors => res.status(400).send({ status: 'Bad Request', errors: errors.message }));
  }

  /**
   *
   *
   * @static
   * @param {obj} req
   * @param {obj} res
   * @returns {obj} obj
   * @memberof UserController
   */
  static updateProfile(req, res) {
    User.findById(req.token.userId)
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found',
            user,
            token: req.token.id
          });
        }
        if (user.id === req.token.userId) {
          return user
            .update(req.body, { fields: Object.keys(req.body) })
            .then((profile) => {
              const {
                firstName, lastName, email, profilePicture
              } = profile;
              const updatedProfile = {
                firstName, lastName, email, profilePicture
              };
              res.status(200).send({ status: 'Success', data: updatedProfile });
            })
            .catch(errors => res.status(400).send({ status: 'Bad Request', errors: errors.message }));
        }
        return res.status(401).send({ status: 'Not Authorize', message: 'Not Authorize' });
      });
  }

  /**
 * @param {any} req
 * @param {any} res
 * @returns {void} void
 * @memberof UserController
 */
  static forgetPassword(req, res) {
    const { email } = req.body;
    User.find({
      where: {
        email
      }
    })
      .then((user) => {
        if (!user) {
          return res.status(404).send({ status: 'Not Found', message: 'User Not Found' });
        }
        const { id } = user;
        const exp = Math.floor(Date.now() / 1000) + (24 * (60 * 60));
        const payload = { exp, id };
        const token = jwtSigner(payload);
        const resetLink = `${req.protocol}://${req.get('host')}/api/v1/users${req.path}/${token}`;
        mail(email, resetLink);
        return res.status(200).send({ status: 'Success', message: 'A Message has been sent to the email provided, kindly read to mail to reset your password' });
      });
  }

  /**
   *
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @returns {obj} obj
   * @memberof UserController
   */
  static confirmForgetPassword(req, res) {
    const { id: userId, email } = req.token;
    User.findById(userId)
      .then((user) => {
        console.log('user>>>>>>>>>>>>>>>>>/////', user, userId, email, req.token);
        if (!user) {
          return res.status(404).send({
            status: 'Not Found',
            message: 'User Not Found',
          });
        }
        if (user.id === userId) {
          return user
            .update(req.body, { fields: Object.keys(req.body) })
            .then(() => {
              res.status(200).send({ status: 'Success', message: 'Password Changed' });
            })
            .catch(errors => res.status(400).send({ status: 'Bad Request', errors: errors.message }));
        }
        return res.status(401).send({ status: 'Not Authorize', message: 'Not Authorize' });
      });
  }
}

export default UserController;

