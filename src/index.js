import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'antd/dist/antd.css';

import 'sendbird-uikit/dist/index.css';
import 'lib/fonts/index.css';
import './styles.css';
import 'react-phone-input-2/lib/style.css';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);
