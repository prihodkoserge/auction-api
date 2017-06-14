import mongoose from 'mongoose';

const ModelSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  }
});

const ManufacturerSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  models: [ModelSchema],
});

ModelSchema.statics = {
  get(id) {
    return this.findById(id)
      .exec()
      .then((product) => {
        if (product) return product;
        const err = new APIError('No such model exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },
  list({ skip = 0, limit = 30} = {}) {
    return this.find()
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

ManufacturerSchema.statics = {
  get(id) {
    return this.findById(id)
      .exec()
      .then((product) => {
        if (product) return product;
        const err = new APIError('No such maker exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  list({ skip = 0, limit = 30} = {}) {
    return this.find()
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

export const CarModel = mongoose.model('CarModel', ModelSchema);
export const Manufacturer = mongoose.model('Manufacturer', ManufacturerSchema);
