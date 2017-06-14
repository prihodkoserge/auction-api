import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

const productStates = ['ACTIVE', 'FINISHED', 'READY'];

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  expectedPrice: {
    type: Number,
    default: 0,
  },
  currentPrice: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
  },
  odometer: {
    type: Number,
    default: 0,
  },
  manufacturer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Manufacturer',
  },
  model: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CarModel',
  },
  status: {
    type: String,
    enum: productStates,
    default: 'READY'
  },
  visible: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  rating: {
    type: Number,
    default: 0,
  },
  bids: [{
    price: Number,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  comments: [{
    body: String,
    vote: {
      type: Number,
      min: 1,
      max: 5,
    }
  }],

});

ProductSchema.method({
});

ProductSchema.statics = {
  get(id) {
    return this.findById(id)
      .populate('manufacturer model')
      .exec()
      .then((product) => {
        if (product) return product;
        const err = new APIError('No such product exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  list({ skip = 0, limit = 30} = {}) {
    return this.find()
      .populate('manufacturer model')
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

export default mongoose.model('Product', ProductSchema);
