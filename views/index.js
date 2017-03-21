import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import store from './redux/store';
import setAuthorizationToken from './utils/setAuthorizationToken';
import {SET_CURRENT_USER, logoutAction} from './redux/actions/accountActions';
import jwtDecode from 'jwt-decode';
import requireAuth from './components/auth/requireAuth';

import Layout from './components/main/Layout';
import NewsFeed from './components/home/NewsFeed';
import Signup from './components/signup/Signup';
import Login from './components/login/Login';
import Sell from './components/sell/Sell';
import Item from './components/item/Item';

//set user authorization
if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  try{
    store.dispatch({type: SET_CURRENT_USER, payload: jwtDecode(localStorage.jwtToken)});
  }catch(e){
    //try catch for jwtDecode throw error when jwtToken is not well form.
    store.dispatch(logoutAction());
  }
}

const app = document.getElementById('app');
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Layout}>
        <IndexRoute component={NewsFeed}></IndexRoute>
        <Route path="signup" name="signup" component={Signup}></Route>
        <Route path="login" name="sell" component={Login}></Route>
        <Route path="sell" name="sell" component={requireAuth(Sell)}></Route>
        <Route path="item/:id" name="item" component={Item}></Route>
      </Route>
    </Router>
  </Provider>,
app);