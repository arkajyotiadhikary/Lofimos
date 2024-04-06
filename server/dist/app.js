"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
// routes
const songs_route_1 = __importDefault(require("./routers/songs.route"));
const auth_route_1 = __importDefault(require("./routers/auth.route"));
const user_route_1 = __importDefault(require("./routers/user.route"));
const app = (0, express_1.default)();
// set ejs for admin pages
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname, "views"));
// middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use("/api", songs_route_1.default);
app.use("/api", auth_route_1.default);
app.use("/api", user_route_1.default);
exports.default = app;
