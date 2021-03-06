
/**
 * @param {any} req
 * @param {any} res
 * @param {any} next
 * @returns {obj} obj
 */
function validateId(req, res, next) {
  // If id is not a number
  if (!Number(req.params.id)) {
    return res.status(400).send({ status: 'Failure', message: 'Please input a valid ID' });
  }
  next();
}

export default validateId;
