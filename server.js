const express = require(`express`);
const { Server: HttpServer } = require(`http`);
const { Server: IOServer } = require(`socket.io`);
const app = express();
const passport = require('passport');
const log4js = require('./utils/logs');
const MongoStore = require(`connect-mongo`);
const dotenv = require(`dotenv`);
const httpServer = new HttpServer(app);
const isLogged = require('./middlewares/logged');
const io = new IOServer(httpServer);
const socketIoChat = require(`./webSockets/webSocketChat`);
const session = require('express-session');
socketIoChat(io); 
dotenv.config();

app.use(express.static(`./public`));
app.use("/api", express.static("./public"));
app.use("/error", express.static("./public"));
app.use("/api/productos", express.static("./public"));
app.use("/chat/individual", express.static("./public"));
app.use("/api/productos/categoria", express.static("./public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());


//Middleware
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGO,
        ttl: 10,
    }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 600000 }
}));

app.use(passport.session());

//Vistas
app.set(`views`, `./views`);
app.set(`view engine`, `ejs`);

//Libreria log4js
const loggerConsole = log4js.getLogger(`default`);
const loggerArchiveWarn = log4js.getLogger(`warnArchive`);
const loggerArchiveError = log4js.getLogger(`errorArchive`);

app.use((req, res, next) => {
    loggerConsole.info(`
    Ruta consultada: ${req.originalUrl}
    Metodo ${req.method}`);
    next();
});


//Rutas
const productosRouter = require(`./routes/MVC/productosRouter`);
const carritoRouter = require(`./routes/MVC/carritoRouter`);
const { loginRouter } = require(`./routes/MVC/userRouter`);
const { signupRouter } = require(`./routes/MVC/userRouter`);
const { logoutRouter } = require(`./routes/MVC/userRouter`);
const { profileRouter } = require(`./routes/MVC/userRouter`);
const generalViewsRouter = require(`./routes/MVC/generalViewsRouter`);
const ordenesRouter = require(`./routes/MVC/ordenesRouter`);
const chatRouter = require(`./routes/MVC/chatRouter`);
const { loginJWTRouter } = require(`./routes/API/userRouterJWT`);
const { registerJWTRouter } = require(`./routes/API/userRouterJWT`);
const productosRouterJWT = require(`./routes/API/productosRouterJWT`);
const ordenesRouterJWT = require(`./routes/API/ordenesRouterJWT`);
const carritoRouterJWT = require(`./routes/API/carritoRouterJWT`);

//Rutas MVC
app.use(`/`, generalViewsRouter);
app.use(`/api/productos`, isLogged, productosRouter);
app.use(`/api/carrito`, isLogged, carritoRouter);
app.use(`/api/ordenes`, isLogged, ordenesRouter);
app.use(`/chat`, isLogged, chatRouter);
app.use(`/login`, loginRouter);
app.use(`/signup`, signupRouter);
app.use('/logout', isLogged, logoutRouter);
app.use(`/profile`, isLogged, profileRouter);

//Rutas APIRestful
app.use(`/apiRestful/login`, loginJWTRouter);
app.use(`/apiRestful/signup`, registerJWTRouter);
app.use(`/apiRestful/productos`, productosRouterJWT);
app.use(`/apiRestful/carrito`, carritoRouterJWT);
app.use(`/apiRestful/ordenes`, ordenesRouterJWT);


app.use((req, res) => {
    loggerConsole.warn(`
    Estado: 404
    Ruta consultada: ${req.originalUrl}
    Metodo ${req.method}`);

    loggerArchiveWarn.warn(`Estado: 404, Ruta consultada: ${req.originalUrl}, Metodo ${req.method}`);
    const msgError = `Estado: 404, Ruta consultada: ${req.originalUrl}, Metodo ${req.method}`;

    res.render(`viewError`, { msgError });
});


const yargs = require('yargs/yargs')(process.argv.slice(2))
const args = yargs
.default({
    port: process.env.PORT
})
.argv

httpServer.listen(args.port, err => {
    if (err) throw err
    console.log(`>>>>> 🪄 Servidor escuchando en el puerto ${args.port}`)
})