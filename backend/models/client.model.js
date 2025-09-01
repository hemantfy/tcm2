const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String
  },
  contact: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  photo: {
    type: String
  },
  notes: {
    type: String,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

clientSchema.pre('save', function(next) {
  if (this.firstName && this.lastName) {
    this.name = `${this.firstName} ${this.lastName}`;
  }
  next();
});

const clientModel= mongoose.model('Client', clientSchema);
module.exports = clientModel;
