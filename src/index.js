import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import thunkMiddleware from'redux-thunk';
import * as serviceWorker from "./serviceWorker";

import { createStore, applyMiddleware, compose } from "redux";

import reducers from "./Store/reducers";
import { Provider } from "react-redux";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);


serviceWorker.unregister();
