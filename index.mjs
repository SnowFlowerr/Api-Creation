import express from "express";
import xmlparser from 'express-xml-bodyparser';

const port = 8080;

const app = express();
app.use(express.json());
app.use(express.text());
app.use(xmlparser());

const router = express.Router();

app.use('/', router);

let data = "";

router.post("/", async function createUser(req, res) {
    try {
        data=req.body
        return res.status(201).json( req.body );
    }
    catch (err) {
        return res.status(500).json(err)
    }
})

router.get("/", async function getUser(req, res) {
    try {
        return res.status(201).json(data);
    }
    catch (err) {
        return res.status(500).json(err)
    }
})

app.listen(port, () => {
    console.log("Server on port", port)
})