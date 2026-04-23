/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const musicModel = require("../models/music.model");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const { uploadFile } = require("../services/storage.service");
const albumModel = require("../models/album.model");

async function createMusic(req, res) {
  const { title } = req.body;
  const file = req.file;

  const result = await uploadFile(file.buffer.toString("base64"));
  console.log("result", result);

  const music = await musicModel.create({
    uri: result.url,
    title,
    artist: req.user.id, //req.user is coming from authMiddleware where req.user =decoded, means all variables of decoded(which is taken from token) are saved in req.user
  });

  res.status(201).json({
    message: "Music created succesfully",
    music: {
      id: music._id,
      uri: music.uri,
      title: music.title,
      artist: music.artist,
    },
  });
}

const createAlbum = async (req, res) => {
  const { title, musics } = req.body;
    if (!musics || musics.length === 0) {
    return res.status(400).json({
      message: "No songs selected"
    });
  }


  const album = await albumModel.create({
    title,
    artist: req.user.id,
    musics: musics,
  });

  res.status(201).json({
    message: "Album created succesfully",
    album: {
      id: album._id,
      title: album.title,
      artist: album.artist,
      music: album.musics,
    },
  });
};

async function getAllMusics(req, res) {
  const musics = await musicModel
    .find()
    .sort({ createdAt: -1 }) // 🔥 newest first
    .populate("artist", "username email");

  res.status(200).json({
    message: "Musics fetched successfully",
    musics: musics,
  });
}

async function getAllAlbums(req, res) {
  const albums = await albumModel
    .find()
    .select("title artist ")
    .populate("artist", "username email")
    .populate("musics"); // 🔥 add this

  return res.status(200).json({
    message: "Album fetched succesfully",
    albums: albums,
  });
}

async function getAlbumById(req, res) {
  const albumId = req.params.id;
  const album = await albumModel
    .findById(albumId)
    .populate("artist", "username email")
    .populate("musics","title uri"); // 🔥 add this
  return res.status(200).json({
    message: "Album fetched succesfully",
    album: album,
  });
}

module.exports = {
  createMusic,
  createAlbum,
  getAllMusics,
  getAllAlbums,
  getAlbumById,
};
