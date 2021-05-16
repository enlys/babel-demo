import express from 'express';
import partials from 'express-partials';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import compression from 'compression';
import path from 'path';
import history from 'connect-history-api-fallback';
import page from './router/page';

const app = express();
const appPath = '/';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(compression());

// HTML5 history api fallback for SPA
app.use(appPath, history({
    index: '/',
    rewrites: [{
        from: /^\/api\/.*$/,
        to: (context) => context.parsedUrl.pathname
    }]
}))
app.use(appPath, page());

if (app.get('env') === 'development') {
    /* eslint-disable  global-require , import/no-extraneous-dependencies */
    const { createProxyMiddleware } = require('http-proxy-middleware');
    // console.log(proxy);
    app.use(
        `${appPath}/dist/`,
        createProxyMiddleware({
            target: 'http://localhost:3808'
        })
    );
}

app.use((req, res, next) => {
    const err = new Error(`Not Found ${req.originalUrl}`);
    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(3000, () => {
    console.dir('服务启动：http://localhost:3000/');
})