import React from 'react';
import ReactDOM from 'react-dom';
import './Design/index';
import App from './App/Component/App';
import { createStore } from 'redux';
import * as serviceWorker from './serviceWorker';
import { mainReducer } from './MainReducer/mainReducer';
import { Provider } from 'react-redux';

export const store = createStore(mainReducer)

ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
