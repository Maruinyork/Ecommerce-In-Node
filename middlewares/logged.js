const isLogged = ((req, res, next) => {
    let msgError = `Debe iniciar sesión`
    if (req.user) {
        next();
    } else {
        return res.render('viewError', { msgError })
    }
});

module.exports = isLogged