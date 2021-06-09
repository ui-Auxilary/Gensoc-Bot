const mongoose = require('mongoose');

const newMemberSchema = mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email_or_phone: {
    type: String,
    required: true,
  },
  arc_member: {
    type: String,
    required: true,
  },
  zid: {
    type: String,
    required: true,
  },
  discord_id: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('memberData',newMemberSchema);
