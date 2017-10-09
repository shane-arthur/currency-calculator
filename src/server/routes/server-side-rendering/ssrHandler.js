  import { renderToString } from 'react-dom/server';
  import StaticRouter from 'react-router-dom/StaticRouter';
  import { renderRoutes, matchRoutes } from 'react-router-config';
  import { Provider } from 'react-redux';
  import React from 'react';
  import { routes } from '../../config/index';
  import configureStore from '../../../store/configureStore';
  import { initialCalculationState } from '../../../constants/initial-state/initialState';

  const store = configureStore(initialCalculationState);
  const reduxState = escape(JSON.stringify(initialCalculationState));


  export default function (app) {
    app.get('*', (req, res) => {
      const branch = matchRoutes(routes, req.url);
      const promises = branch.map(({ route }) => {
        let fetchData = route.component.fetchData;
        return fetchData instanceof Function ? fetchData() : Promise.resolve(null)
      });
      Promise.all(promises).then(data => {
        let context = {};
        const html = renderToString(
          <Provider store={store}>
            <StaticRouter location={req.url} context={context}>
              {renderRoutes(routes)}
            </StaticRouter>
          </Provider>);
        if (context.status === 404) {
          res.status(404);
        }
        if (context.status === 302) {
          return res.redirect(302, context.url);
        }
        res.render('index', { html, reduxState });
      }).catch(error => { console.log(error) });
    });
  }


