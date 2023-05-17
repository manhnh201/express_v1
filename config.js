const mongoose = require("mongoose");

async function connect() {
    try {
        await mongoose.connect(
            "mongodb+srv://nguynhungmanh201:Manh1106@manhnhtest.fcxhgzb.mongodb.net/mydatabase",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        console.log("Connect successful!");
    } catch (error) {
        console.log("Connect error!");
    }
}

module.exports = { connect };
