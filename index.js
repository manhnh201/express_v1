const express = require("express");
const db = require("./config");
const jwt = require("jsonwebtoken");
const userRouter = require("./routes/user");
const userModel = require("./models/user");
const bcrypt = require("bcrypt");
const morgan = require("morgan");
const app = express();
const port = 3000;

app.use(express.json());
app.use(morgan("dev"));
//Connect to db
db.connect();

const authenticationCheck = async (req, res, next) => {
    //Check user co trong csdl khong ?
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "manhnh@201");
    const { username } = decoded;
    const user = await userModel.findOne({ username: username });
    if (user) {
        req.user = user;
        next();
    } else {
        res.send("User does not exist!");
    }
};
app.use("/users", authenticationCheck, userRouter);

app.get("/", (req, res) => {
    res.send("Home");
});
app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    // Check trùng username trong db
    // Nếu trùng username thì không cho tạo username, nếu không thì tạo user
    const existingUser = await userModel.findOne({ username });
    if (existingUser) {
        res.send("User already exists!");
    } else {
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);
        const user = await userModel.create({
            username,
            password: hashPassword,
            role: ["user"],
        });
        res.send(user);
    }
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    //Check trong db
    const user = await userModel.findOne({ username });
    //Neu co thi tra token, con khong thi tra error
    if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ username: username }, "manhnh@201");
        //Tra token cho client
        res.send({ token: token });
    } else {
        res.send("User does not exist!");
    }
});
app.listen(port, () => {
    console.log(`App listening on ${port}`);
});

module.exports = app;
