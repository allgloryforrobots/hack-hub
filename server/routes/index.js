const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const articleRouter = require('./articleRouter')
const uploadRouter = require('./uploadRouter')

// /api
router.use('/user', userRouter)
router.use('/article', articleRouter)
router.use('/upload', uploadRouter)

module.exports = router
