import express from "express";

// routes
import songs from "./routers/songs.router";

const app = express();

// songs api
app.use("/api", songs);

export default app;
