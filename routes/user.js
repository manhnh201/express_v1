const userModel = require("../models/user");

const userRouter = require("express").Router();

const authorizationCheck = (req, res, next) => {
    const userRoles = req.user.role;
    //Check xem user nay co quyen lay toan bo user khong ? (Authorization)
    if (userRoles.includes("admin")) {
        next();
    } else {
        res.send("User does not have access permissions!");
    }
};

userRouter.get("/", authorizationCheck, async (req, res) => {
    const users = await userModel.find({});
    res.send(users);
});

userRouter.get("/me", authorizationCheck, async (req, res) => {
    res.send(req.user);
});

userRouter.post("/", async (req, res) => {});

userRouter.patch("/", async (req, res) => {});

userRouter.delete("/:username", authorizationCheck, async (req, res) => {
    try {
        //Lay user tu params
        const username = req.params.username;

        //Check xem username co phai cua user hien tai k
        const currentUser = req.user;
        if (currentUser.username === username) {
            res.status(400).send("Khong the xoa user nay!");
            return;
        }

        //Check xem username co trong db khong ?
        //Tim xem user co trong db khong ?
        const user = await userModel.findOne({ username });
        if (user) {
            await userModel.deleteOne({ username });
            res.send("User deleted!");
        } else {
            res.send("User not found!");
        }
    } catch (error) {
        res.send(error.message);
    }
});

module.exports = userRouter;
