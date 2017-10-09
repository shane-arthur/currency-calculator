import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/index';
import { thunk } from '../reducers/middleware/clientMiddleware';

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, applyMiddleware(thunk));
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(rootReducer);
    });
  }

  return store;
}
