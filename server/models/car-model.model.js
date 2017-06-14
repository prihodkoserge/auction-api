import mongoose from 'mongoose';

const ModelSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  }
});

/**
 * @typedef User
 */
