import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import './index.css';
import App from './components/App';
import mainReducer from './reducers';


const store = createStore(mainReducer, {advList: {favourites: []}})
ReactDOM.render(
    <Provider store= {store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

