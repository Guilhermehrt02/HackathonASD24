const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, {
    timestamps: true, // Cria os campos createdAt e updatedAt automaticamente
});

module.exports = mongoose.model('User', userSchema);
