import Paper from "@material-ui/core/Paper";
import { ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import App from "./App";
import "./index.css";
import rootReducer from "./redux/reducers";
import reportWebVitals from "./reportWebVitals";
import theme from "./theme/theme";
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Paper style={{ height: "100vh", width: "100vw" }}>
        <App />
      </Paper>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
