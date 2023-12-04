import express from "express"
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.static("node_modules/bootstrap/dist"));
app.use(express.static("node_modules/bootstrap-icons/font"));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.listen(port, () => {
    console.log("Listening on port " + port);    
})