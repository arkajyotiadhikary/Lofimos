import express from "express";
import path from "path";
// routes
import songs from "./routers/songs.router";

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// songs api
app.use("/api", songs);

export default app;
