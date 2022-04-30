const { ObjectId } = require('mongoose').Schema;

module.exports = {
  is_archived: { type: Boolean, required: true, default: false },
  is_registered: { type: Boolean, default: false, required: true },
  created_by: { type: ObjectId, ref: 'User' },
  updated_by: { type: ObjectId, ref: 'User' },
};
