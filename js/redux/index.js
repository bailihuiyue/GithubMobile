import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import reducers from './reducer';
import rootSaga from './saga';

const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    reducers,
    window.devToolsExtension ? window.devToolsExtension() : undefined,
    applyMiddleware(logger, sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default store