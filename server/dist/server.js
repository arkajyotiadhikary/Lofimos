"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const db_1 = require("./db");
// connect database
db_1.sequelize
    .authenticate()
    .then(() => {
    console.log("Connection to the database has been established successfully.");
})
    .catch((error) => {
    console.error("Unable to connect to the database:", error);
});
// port
const parsedPort = parseInt(process.env.PORT || "", 10);
const port = isNaN(parsedPort) ? 2526 : parsedPort;
app_1.default.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`);
});
