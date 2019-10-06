import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Provider } from 'mobx-react';
import BookStore from './appStore';

ReactDOM.render(
  <Provider store={BookStore}>
  <App />
  </Provider>,
  document.getElementById('root')
);
