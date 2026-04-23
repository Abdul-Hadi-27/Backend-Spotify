/* /eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* /eslint-disable no-unused-vars */
const  ImageKit =require( "@imagekit/nodejs");

const ImageKitClient = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY, // This is the default and can be omitted
   publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadFile(file) {
  const result = await ImageKitClient.files.upload({
    file,
    fileName: "music_" + Date.now(),
    folder: "spotify-music",
  });
   return result
}


 module.exports={uploadFile}

