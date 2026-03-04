const songModel = require("../models/song.model");
const id3 = require("node-id3");
const storageService = require("../service/storage.service");

async function uploadSong(req, res) {
  try {
    const { mood } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: "No song file provided" });
    }

    const tags = id3.read(req.file.buffer);

    const [songFile, posterFile] = await Promise.all([
      storageService.uploadFile({
        buffer: req.file.buffer,
        filename: (tags.title || "unknown") + ".mp3",
        folder: "/modify/songs",
      }),
      tags.image?.imageBuffer ? storageService.uploadFile({
        buffer: tags.image.imageBuffer,
        filename: (tags.title || "unknown") + ".jpeg",
        folder: "/modify/posters",
      }) : Promise.resolve({ url: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=200&auto=format&fit=crop" }),
    ]);

    const song = await songModel.create({
      title: tags.title || "Unknown Title",
      url: songFile.url,
      postUrl: posterFile.url,
      mood: mood ? (Array.isArray(mood) ? mood : [mood.toLowerCase()]) : ["neutral"],
    });

    res.status(201).json({
      message: "song created successfully",
      song,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Internal server error during upload", error: error.message });
  }
}

async function getSong(req, res) {
  try {
    const mood = req.query.mood?.toLowerCase();
    const song = await songModel.findOne({
      mood,
    });

    res.status(200).json({
      message: "song fetched successfully",
      song
    });
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ message: "Internal server error during fetch", error: error.message });
  }
}

module.exports = { uploadSong , getSong };
