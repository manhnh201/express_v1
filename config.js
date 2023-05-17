const mongoose = require("mongoose");

async function connect() {
    try {
        await mongoose.connect("mongodb://127.0.0.1/mindx", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connect successful!");
    } catch (error) {
        console.log("Connect error!");
    }
}

module.exports = { connect };
