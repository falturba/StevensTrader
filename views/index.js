import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './components/main/Layout';
import NewsFeed from './components/home/NewsFeed';
import Signup from './components/signup/Signup';
import Signin from './components/signin/Signin';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import store from './redux/store';

const app = document.getElementById('app');



ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Layout}>
        <IndexRoute component={NewsFeed}></IndexRoute>
        <Route path="signup" name="signup" component={Signup}></Route>
        <Route path="signin" name="signin" component={Signin}></Route>
      </Route>
    </Router>
  </Provider>,
app);