"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// routes
const songs_router_1 = __importDefault(require("./routers/songs.router"));
const app = (0, express_1.default)();
// songs api
app.use("/api", songs_router_1.default);
exports.default = app;
