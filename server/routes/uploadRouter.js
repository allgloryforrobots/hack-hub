const Router = require('express')
const router = new Router()
const checkRole = require('../middleware/CheckRoleMiddleware')
const upload = require('../storage')

// /upload
router.post('/image', upload.single('image'), (req, res) => {
    res.json({
        "success" : 1,
        "file": {
            "url" : process.env.URL + '/' + req.file.filename,
            // ... and any additional fields you want to store, such as width, height, color, extension, etc
        }
    });
});

module.exports = router

