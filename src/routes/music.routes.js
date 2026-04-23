/* /eslint-disable no-unused-vars */
/* /eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require("express");
const musicController = require("../controllers/music.controller");
const multer = require("multer");
 const authMiddleware=require('../middlewares/auth.middleware') 

const upload = multer({
  storage: multer.memoryStorage(),
});
const router = express.Router();

router.post("/upload",authMiddleware.authArtist,upload.single('music'), musicController.createMusic);
router.post("/album",authMiddleware.authArtist, musicController.createAlbum);

router.get('/',authMiddleware.authAny,musicController.getAllMusics)
// authMiddleware.authUser

router.get('/albums',authMiddleware.authAny,musicController.getAllAlbums)

router.get('/albums/:id',authMiddleware.authAny,musicController.getAlbumById)
module.exports = router;
