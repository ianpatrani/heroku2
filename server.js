const express = require("express");
const cors = require("cors");
const multer = require("multer");
const dayjs = require('dayjs');
const MethodOverride = require('method-override');
const { v4: uuidv4 } = require('uuid');

const server = express();
const log = console.log;
let port = process.env.PORT || 3000;

server.use(cors());
/* server.unsubscribe(express.json());
server.use(express.urlencoded({extended:true})); */

const multerConfig = multer.diskStorage({
    destination: function (res, file, cb) { //cb callback
        cb(null, "./bucket")
    },
    filename: function (res, file, cb) {
        let idImage = uuid().split("-")[0];
        let day = dayjs().format('DD-MM-YYYY'); //fecha servidor
        cb(null, `${day}.${idImage}.${file.originalname}`);
    },
});

const multerMiddle = multer({
    storage: multerConfig
});

server.get("/", (req, res) => {
    res.send("start endpoint")
});

server.post("/upload", multerMiddle.single("imagefile"), (req, res) => {
    if (req.file) {
        res.send("imagen guardada...")
    } else {
        res.send("error al cargar la imagen /posiblemente no fue recibida");
    }
});

server.listen(port, () => {
    console.log("start server");
});