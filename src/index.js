import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyDIW_W_0jdaffMD2yRdcljQo4WNkg3yZoU",
  authDomain: "todoreact-c486d.firebaseapp.com",
  databaseURL: "https://todoreact-c486d.firebaseio.com",
  projectId: "todoreact-c486d",
  storageBucket: "todoreact-c486d.appspot.com",
  messagingSenderId: "650739750861",
  appId: "1:650739750861:web:3767616263503f9f5a1684",
  measurementId: "G-0HRENKS3PY"
};


firebase.initializeApp(config);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
