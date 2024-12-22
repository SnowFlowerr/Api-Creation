import express from "express";

const port = 8080;

const app = express();
app.use(express.text());

const router = express.Router();

app.use('/', router);

let data = "";

router.post("/", async function createUser(req, res) {
    try {
        data=req.body
        return res.status(201).send( req.body );
    }
    catch (err) {
        return res.status(500).send(err)
    }
})

router.get("/", async function getUser(req, res) {
    try {
        return res.status(201).send(data);
    }
    catch (err) {
        return res.status(500).send(err)
    }
})

app.listen(port, () => {
    console.log("Server on port", port)
})