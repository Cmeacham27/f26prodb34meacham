const mongoose = require('mongoose');

const dragonSchema = mongoose.Schema({
    kind: { type: String, required: true },
    wings: { type: Boolean, required: true },
    teeth: { type: Number, required: true, min: 0 }
});

module.exports = mongoose.model('Dragon', dragonSchema);