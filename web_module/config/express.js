/**
 * Created by sarin on 4/23/16.
 */
var config = require('./config'),
    http = require('http'),
    express = require('express'),
    morgan = require('morgan'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    passport = require('passport'),
    flash = require('connect-flash')

module.exports = function () {
    var app = express();
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());

    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }));

    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());

    app.set('views', './app/views');
    app.set('view engine', 'ejs');

    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());

    require('../app/routes/index.server.route.js').home(app);
    require('../app/routes/signup.server.route.js')(app);
    require('../app/routes/signin.server.route')(app);
    require('../app/routes/dashboard.server.route')(app);
    require('../app/routes/roles.server.route.js')(app);
    require('../app/routes/shortest_path.server.route.js')(app);
    require('../app/routes/subject_area_connection.server.route.js')(app);
    require('../app/routes/sphere_influence.server.route.js')(app);
    require('../app/routes/incoming_relation.server.route.js')(app);
    require('../app/routes/upload_papers.server.route.js')(app);
    require('../app/routes/typeahead.server.route.js')(app);
    require('../app/routes/admin.server.route.js')(app);
    require('../app/routes/usersettings.server.route.js')(app);
    require('../app/routes/upload_keywords.server.route.js')(app);

    app.use(express.static('./public'));

    return app;
}
