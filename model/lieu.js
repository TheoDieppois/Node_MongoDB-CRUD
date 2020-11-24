const mongoose = require('mongoose')

const lieuSchema = new mongoose.Schema({}, { strict: false })

module.exports = mongoose.model('lieu', lieuSchema)