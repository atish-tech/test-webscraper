import express from "express";
import { Scraper } from "./Controller/scraper";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World kmew fkcjwe dffk");
});

app.get("/api/webscraper", Scraper);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
