import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './components/main/Layout';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import store from './redux/store';
import setAuthorizationToken from './utils/setAuthorizationToken';
import {SET_CURRENT_USER, loginAction} from './redux/actions/accountActions';
import jwtDecode from 'jwt-decode';
import NewsFeed from './components/home/NewsFeed';
import Signup from './components/signup/Signup';
import Login from './components/login/Login';
import Sell from './components/sell/Sell';

//set user authorization
if (localStorage.jwtToken ) {
  // setAuthorizationToken(localStorage.jwtToken);
  // store.dispatch({type: SET_CURRENT_USER, payload: jwtDecode(localStorage.jwtToken)});
}

const app = document.getElementById('app');
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Layout}>
        <IndexRoute component={NewsFeed}></IndexRoute>
        <Route path="signup" name="signup" component={Signup}></Route>
        <Route path="login" name="sell" component={Login}></Route>
        <Route path="sell" name="sell" component={Sell}></Route>
      </Route>
    </Router>
  </Provider>,
app);