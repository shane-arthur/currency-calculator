import path from 'path';
import http from 'http';
import express from 'express';
import httpProxy from 'http-proxy';
import compression from 'compression';

var webpack = require('webpack');
var config = require('../../webpack.config');

const compiler = webpack(config);

const app = express();
const proxy = httpProxy.createProxyServer();
const server = new http.Server(app);

app.use(compression());

app.use(express.static(path.join(__dirname, '../..', 'dist')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* istanbul ignore next */
if (__DEVELOPMENT__) { // eslint-disable-line no-undef
    app.all('/dist/*', (req, res) => {
        proxy.web(req, res, {
            target: 'http://localhost:8080',
        });
    });
}

app.use(require('webpack-hot-middleware')(compiler, {
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000
}));

const setRoutes = (routes) => {
    routes.forEach(route => {
        require(route).default(app);
    });
};

const routes = ['./routes/server-side-rendering/ssrHandler'];

setRoutes(routes);

/* istanbul ignore next */
server.listen('3000', (err) => {
    if (err) {
        console.error(err); // eslint-disable-line no-console
    }
    console.info('==> 💻  Open http://%s:%s in a browser to view the app.', 'localhost', '3000'); // eslint-disable-line no-console
});

export default app;


