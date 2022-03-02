import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore , applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';

import { BrowserRouter } from 'react-router-dom';
import burgerBuilderReducer from './Store/reducers/BurgerBuilder';
import orderReducer from './Store/reducers/order';
import authReducer from './Store/reducers/auth';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    order: orderReducer,
    auth: authReducer
});

const store= createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const app=(
    <Provider store={store}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
