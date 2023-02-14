const express = require('express');
const { isLoggedIn, checkRole } = require('../middlewares/route-guard');
const router = express.Router();

router.get("/perfil", isLoggedIn, (req, res, next) => {
  res.render("user/profile", { user: req.session.currentUser })
})

router.get('/admin-panel', isLoggedIn, checkRole('ADMIN'), (req, res, next) => {       // ROLES: acceso por rol
  res.render("user/admin-page", { user: req.session.currentUser })
})

module.exports = router