const express = require('express');
const router = express.Router();
const { Video } = require("../models/Video");

const { auth } = require("../middleware/auth");
const multer = require("multer");

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.mp4') {
            return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
        }
        cb(null, true)
    }
})

var upload = multer({ storage: storage }).single("file")

//=================================
//             Video
//=================================

router.post('/uploadfiles', (req, res) => {
    // 비디오를 서버에 저장한다.
    upload(req, res, err => {
        if(err){
            return res.json({success: false, err})
        }
        return res.json({success:true, url: res.req.file.path, fileName: res.req.file.filename })
    })
})

router.post('/uploadVideo', (req, res) => {
    // 비디오 정보들을 저장한다.
    const video = new Video(req.body)

    video.save((err, doc) => {
        if(err) return res.json({ success: false, err })
        return res.status(200).json({ success: true })
    })
})

router.get('/getVideos', (req, res) => {
    // 비디오들을 DB에서 가져와서 클라이언트에 보낸다.
   
    Video.find()
        .populate('writer')
        .exec((err, videos) => {
            if(err) return res.status(400).send(err);
            return res.status(200).json({ success:true, videos })
        })
})

router.post('/getVideoDetail', (req, res) => {
    // 비디오들을 DB에서 가져와서 클라이언트에 보낸다.
   Video.findOne({ "_id" : req.body.videoId })
   .populate('writer')
   .exec((err, videoDetail) => {
       if(err) return res.status(400).send(err)
       return res.status(200).json({ success: true, videoDetail })
   })
})


module.exports = router;
