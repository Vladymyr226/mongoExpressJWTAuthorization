const Router = require('express');
const router = new Router();
const controller = require('./authController');
const { check } = require('express-validator');
const authMiddleware = require('./middlewares/authMiddleware');
const roleMiddleware = require('./middlewares/roleMiddleware');

router.post('/registration', [
  check('username', 'Имя пользователя не может быть путым!').notEmpty(),
  check('password', 'Пароль должен быть больше 4 и меньше 11 символов').isLength({ min: 4, max: 10 })
], controller.registration);

router.post('/login', controller.login);
// router.get('/users', authMiddleware, controller.getUsers); //чтобы всех юзеров могли получать только авторизированные пользователи
router.get('/users', roleMiddleware(['USER']), controller.getUsers); //чтобы всех юзеров могли получать только опр. роли (ADMIN или USER)

module.exports = router;