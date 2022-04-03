import express from "express";
import morgan from "morgan"
import cors from "cors";


const app = express();


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.use(cors())
process.env.NODE_ENV !== "prod" && app.use(morgan("combined"))
app.use(express.json());

export default app;