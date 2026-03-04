const express = require("express");
const songRouter = express.Router();
const upload = require("../middleware/upload.middleware");
const songController = require("../controllers/song.controller");

const authMiddleware = require("../middleware/auth.middleware");

songRouter.post("/", authMiddleware.authUser, upload.single("song"), songController.uploadSong);
songRouter.get("/", songController.getSong);

module.exports = songRouter;
