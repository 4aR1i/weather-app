import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import './index.scss';

const elemRoot = document.getElementById('root');

if (elemRoot) {
  const root = ReactDOM.createRoot(elemRoot);
  root.render(<App />);
}
