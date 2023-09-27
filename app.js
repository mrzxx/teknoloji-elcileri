//Main inc.
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const port = process.env.PORT || 3000;

//Database ' here.
const db = require('./database/database');
// initalize sequelize with session store
var SequelizeStore = require("connect-session-sequelize")(session.Store);

//Inc's here.
const errorHandler = require('./middleware/error');
const authMiddleware = require('./middleware/auth');
//Route's here.
const authRoutes = require('./routes/auth');
const generalRoutes = require('./routes/general');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



//Session here
app.use(
    session({
        secret: "mrtxx was here",
        store: new SequelizeStore({
        db: db,
        //table: "Session",
        expiration: 24 * 60 * 60 * 1000 * 14,
        checkExpirationInterval: 15 * 60 * 1000
        }),
        saveUninitialized:false,
        resave: false, // we support the touch method so per the express-session docs this should be set to false
        //proxy: true, // if you do SSL outside of node.
    })
);

db.sync();

//Regıster/Logın here.
app.use(authRoutes);

//Auth module here.
//app.use(authMiddleware);

app.use(generalRoutes);

//Error handler here.
app.use(errorHandler);






//RUN SERVER
//For localhost:
app.listen(port, () => {
console.log(`Server ${port} portunda başlatıldı.`);
});
//RUN SERVER