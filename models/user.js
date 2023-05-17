const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String },
    role: [String],
    songs: { type: mongoose.Types.ObjectId, ref: "songs" },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
