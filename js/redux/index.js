import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import reducers from './reducer';
import rootSaga from './saga';
import { navigatorMiddleware } from '../navigator/AppNavigators'

const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    reducers,
    window.devToolsExtension ? window.devToolsExtension() : undefined,
    applyMiddleware(logger, sagaMiddleware, navigatorMiddleware)
);

sagaMiddleware.run(rootSaga);

export default store