import Product from '../models/product.model';

function load(req, res, next, id) {
  Product.get(id)
    .then((product) => {
      req.product = product; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

function get(req, res) {
  return res.json(req.product);
}

/**
 * Create new user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function create(req, res, next) {
  const product = new Product({
    title: req.body.title,
    description: req.body.description,
    model: req.body.model,
    manufacturer: req.body.manufacturer,
  });

  product.save()
    .then(savedProduct => res.json(savedProduct))
    .catch(e => next(e));
}

/**
 * Update existing user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function update(req, res, next) {
  const product = req.product;
  product.currentPrice = req.body.currentPrice;

  product.save()
    .then(saved => res.json(saved))
    .catch(e => next(e));
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Product.list({ limit, skip })
    .then(products => res.json(products))
    .catch(e => next(e));
}

/**
 * Delete user.
 * @returns {User}
 */
function remove(req, res, next) {
  const product = req.product;
  product.remove()
    .then(deletedProduct => res.json(deletedProduct))
    .catch(e => next(e));
}

function comment(req, res, next) {
  const product = req.product;
  product.comments.push({
    vote: req.body.vote,
    body: req.body.comment,
  });

  product.save()
    .then(p => res.json(p.comments))
    .catch();
}

function makeBid(req, res, next) {
  const product = req.product;
  const bidPrice = req.body.price;

  if (bidPrice <= product.currentPrice) {
    console.error();
  }

  product.currentPrice = bidPrice;

  product.bids.push({
    price: bidPrice
  });

  product.save().then((p) => {
    return res.json(p);
  });
}


export default { load, get, create, update, list, remove, makeBid };
