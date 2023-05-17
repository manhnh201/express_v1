const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
    name: { type: String, required: true },
    author: { type: String },
    userId: { type: mongoose.Types.ObjectId, ref: "users" },
});

const songModel = mongoose.model("song", songSchema);

module.exports = songModel;
