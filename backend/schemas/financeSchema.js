const mongoose = require('mongoose')

const Schema = mongoose.Schema

const financeSchema = new Schema({
    description: {
      type: String,
      required: true
    },
    type: {
        type: String,
        required: true
      },
    amount: {
      type: Number,
      required: true
    }
  }, { timestamps: true })

module.exports = mongoose.model('Finance', financeSchema)