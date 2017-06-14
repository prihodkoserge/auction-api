import {Manufacturer, CarModel} from '../models/manufacturer.model';

function load(req, res, next, id) {
  Manufacturer.get(id)
    .then((m) => {
      req.manufacturer = m; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

function get(req, res) {
  return res.json(req.manufacturer);
}

function create(req, res, next) {
  const manufacturer = new Manufacturer({
    name: req.body.name,
  });

  manufacturer.save()
    .then(saved => res.json(saved))
    .catch(e => next(e));
}

function update(req, res, next) {
  const manufacturer = req.manufacturer;
  manufacturer.name = req.body.name;

  manufacturer.save()
    .then(saved => res.json(saved))
    .catch(e => next(e));
}

function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Manufacturer.list({ limit, skip })
    .then(m => res.json(m))
    .catch(e => next(e));
}

function modelsList(req, res, next) {
  const manufacturer = req.manufacturer;
  return res.json(manufacturer.models);
}

function remove(req, res, next) {
  const manufacturer = req.manufacturer;
  manufacturer.remove()
    .then(deleted => res.json(deleted))
    .catch(e => next(e));
}

function createModel(req, res, next) {
  const manufacturer = req.manufacturer;
  const model = new CarModel({
      name: req.body.name
  });

  manufacturer.models.push(model);
  model.save()
    .then(savedModel => {
      manufacturer.save().then(savedManufacturer => {
      return res.json(savedModel);
    }).catch(e => next(e));
  }).catch(e => next(e));
}

export default { load, get, create, update, list, remove, modelsList, createModel };
