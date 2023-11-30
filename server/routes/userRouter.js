const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/AuthMiddleware')

// проверка роли
// const checkRole = require('../middleware/CheckRoleMiddleware')
// router.post('/some', checkRole('ADMIN'), userController.some)

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.post('/auth', authMiddleware, userController.check)
router.get('/generate-password', userController.generatePassword)

module.exports = router