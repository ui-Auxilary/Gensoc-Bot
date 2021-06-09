const mongoose = require('mongoose');

const messageCountSchema = mongoose.Schema({
  //The userID
  _id: {
    type: String,
    required: true,
  },

  // How many messages sent
  messageCount: {
    type: Number,
    required: true,
  },
})

module.exports = mongoose.model('message-counts', messageCountSchema);
