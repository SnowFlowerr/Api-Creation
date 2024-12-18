import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const port = 8080;
const url = process.env.MongoDB

const app = express();
app.use(express.json());
app.use(cors());

const router=express.Router();

function mongooseConnect() {
    mongoose.connect(url)
        .then(() => console.log("MongoDB is Connected"))
        .catch((err) => console.log(err))
}

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        trim: true
    },
    password: {
        type: String,
    },
}, { timeStamp: true })

const User = mongoose.model("user", userSchema);

app.use('/',router);

router.post("/", async function createUser(req, res) {
    try {
        const data = req.body;
        const createdUser = await User.create(data);
        return res.status(201).send(createdUser);
    }
    catch (err) {
        return res.status(500).send(err)
    }
})

router.get("/", async function getUser(req, res) {
    try {
        const getUser = await User.find();
        return res.status(201).send(getUser);
    }
    catch (err) {
        return res.status(500).send(err)
    }
})

app.listen(port, () => {
    mongooseConnect();
    console.log("Server on port", port)
})