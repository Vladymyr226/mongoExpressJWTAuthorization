const jwt = require('jsonwebtoken');
const { secret } = require('../config');

module.exports = function (roles) {
  return function (req, res, next) {
    if (req.method === 'OPTIONS') {
      next();
    }
    try {
      const token = req.headers.authorization.split(' ')[1];
      // console.log(token);
      if (!token) {
        return res.status(403).json({ message: "Пользователь не авторизован!" });
      }
      //декодируем токен, чтобы достать массив ролей
      const { role: userRoles } = jwt.verify(token, secret);

      const hasRole = userRoles.some(role => {
        return roles.includes(role);
      });
      if (!hasRole) {
        return res.status(403).json({ message: "У вас нет доступа!" });
      }

      next();
    }
    catch (error) {
      console.log(error);
      return res.status(403).json({ message: "Пользователь не авторизован!" });
    }
  };
};