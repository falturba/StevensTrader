import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './components/Layout';
import NewsFeed from './pages/NewsFeed';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

const app = document.getElementById('app');

ReactDOM.render(
    <Router history={browserHistory}>
      <Route path="/" component={Layout}>
        <IndexRoute component={NewsFeed}></IndexRoute>
        <Route path="signup" name="signup" component={Signup}></Route>
        <Route path="signin" name="signin" component={Signin}></Route>
      </Route>
      
    </Router>,
app);


/*********************************************************
 ********************  DEV *******************************
 ********************************************************/

if (module.hot) {
  module.hot.accept();
}