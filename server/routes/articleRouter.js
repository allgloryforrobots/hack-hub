const Router = require('express')
const router = new Router()
const articleController = require('../controllers/articleController')
const authMiddleware = require('../middleware/AuthMiddleware')
const checkRole = require('../middleware/CheckRoleMiddleware')

// /api/article
router.get('/', articleController.getAll)
router.get('/:id', articleController.getById)
router.post('/', checkRole('ADMIN'), articleController.create)
router.patch('/', checkRole('ADMIN'), authMiddleware, articleController.update)
router.delete('/:id', checkRole('ADMIN'), authMiddleware, articleController.delete)

module.exports = router
