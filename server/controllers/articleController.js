const ApiError = require('../error/ApiError')
const { Article } = require('../models/models')

class articleController {

    async create(req, res, next) {

        try {

            const { blocks } = req.body
            
            if (!blocks || blocks.length === 0) next(ApiError.badRequest('В статье нет содержания'))
            if (!req.user) next(ApiError.badRequest('Пользователь не авторизован'))

            const article = await Article.create({ userId: req.user.id, content: JSON.stringify(blocks) })
            return res.json(article)

        } catch (e) {
            console.log(e)
            return next(ApiError.internal('Ошибка при публикации статьи'))
        }

    }

    async getById(req, res) {

    }

    async getAll(req, res) {
        
        try {
            const articles = await Article.findAndCountAll()
            return res.json(articles)

        } catch (e) {
            console.log(e)
            return next(ApiError.internal('Ошибка при получении статей'))
        }

    }

    async update(req, res) {

    }

    async delete(req, res) {

    }

}

module.exports = new articleController()