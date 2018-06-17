import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter as R} from 'react-router-dom';
import { Provider } from 'react-redux';
import {store, persistor} from './redux/store';
import { PersistGate } from 'redux-persist/integration/react'
// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Provider store={store}><PersistGate loading={null} persistor={persistor}>
    <R><App /></R>
    </PersistGate></Provider>, document.getElementById('root'));
// registerServiceWorker();
