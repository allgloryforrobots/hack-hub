const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require('../models/models')
const genPassword = require('../utils/passwordGenerator')


const generateJwt = (userId, email, role) => {
    return jwt.sign(
        { id: userId, email, role }, 
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    )
}

class UserController {

    async registration(req, res, next) {

        try {
            const { email, password, role } = req.body
            if (!email || !password) {
                return next(ApiError.badRequest('Некорректный email или пароль'))
            }
    
            const candidate = await User.findOne({
                where: {email}
            })
    
            if (candidate) {
                return next(ApiError.badRequest('Пользователь с таким email уже существует'))
            }
    
            const hashPassword = await bcrypt.hash(password, 5)
            const user = await User.create({ email, role, password: hashPassword })
            const token = generateJwt(user.id, email, role)
            return res.json({ token })

        } catch (e) {
            console.log(e)
            return next(ApiError.badRequest('Ошибка при регистрации'))
        }
      
    }

    async login(req, res, next) {

        try {
            const { email, password } = req.body

            const user = await User.findOne({
                where: {email}
            })
    
            if (!user) {
                return next(ApiError.internal('Пользователь с таким email не найден'))
            }
            
            let comparePassword = bcrypt.compareSync(password, user.password)
            if (!comparePassword) {
                return next(ApiError.internal('Неверный логин или пароль'))
            }
    
            const token = generateJwt(user.id, user.email, user.role)
            res.json({ token })
        } catch (e) {
            console.log(e)
            return next(ApiError.badRequest('Ошибка при авторизации'))
        }

    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }

    async generatePassword(req, res, next) {
        const validPwd = null;
        // на всякий 
        let count = 0
    
        while (!validPwd && count < 100) {
    
            try {
    
                const password = genPassword()
        
                const candidate = await User.findOne({
                    where: {password}
                })
        
                if (!candidate) {
                    return res.json({ password })
                }
        
            } catch (e) {
                return next(ApiError.internal('Пользователь с таким email не найден'))
            }
    
        }
    
        return next(ApiError.internal('превышено число попыток генерации'))
    }
}


module.exports = new UserController()