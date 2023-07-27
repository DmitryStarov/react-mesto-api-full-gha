/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');
const validator = require('validator');
const { REG_URL, INVALID_URL } = require('../utils/constants');

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;
const cardSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    link: {
      type: String,
      required: true,
      validate: {
        validator(url) {
          return REG_URL.test(url);
        },
        message: INVALID_URL,
      },
    },
    owner: {
      type: ObjectId,
      ref: 'user',
      required: true,
    },
    likes: [{
      type: ObjectId,
      ref: 'user',
      default: [],
    }],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  },
);
module.exports = mongoose.model('card', cardSchema);
