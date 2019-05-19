import { applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import reducers from './reducer';
import rootSaga from './saga';
import { navigatorMiddleware } from '../navigator/AppNavigators'

const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducers,
    composeEnhancer(
        //logger, 
        applyMiddleware(sagaMiddleware, navigatorMiddleware)
    )
);

sagaMiddleware.run(rootSaga);

export default store