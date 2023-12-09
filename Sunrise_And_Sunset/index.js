import express, { response } from "express"
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

const API_URL = "https://api.sunrise-sunset.org/json";

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use(express.static("node_modules/bootstrap/dist"));
app.use(express.static("node_modules/bootstrap-icons/font"));


app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/", async (req, res) =>
{
    console.log(req.body.latitude);
    console.log(req.body.longitude);
    //Get current lat and longitude from request
    var lat = req.body.latitude;
    var long = req.body.longitude;

    //Get current date from request
    var day = req.body.day;
    var month = req.body.month;
    var year = req.body.year;

    
    //Check if day month and year are full
    if(day == "" || month == "" || year == "")
    {
        //Use axios to get the lat and long without the date
        try {
            const response = await axios.get(API_URL, {
                lat : lat,
                long : long
            });
            console.log(response.data);

            res.render("index.ejs", {
                sunrise : response.data.results.sunrise,
                sunday : response.data.results.day_length,
                sunset : response.data.results.sunset
            });

        } catch (error) {
            console.log("error");
            res.render("index.ejs");
        }
    }
    else
    {
        console.log("defined");
    }
});

app.listen(port, () => {
    console.log("Listening on port " + port);    
})