import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './components/main/Layout';
import NewsFeed from './components/home/NewsFeed';
import IndexPage from './components/home/IndexPage';
import Signup from './components/signup/Signup';
import Signin from './components/signin/Signin';
import { Route,IndexRoute, browserHistory } from 'react-router';
import ReactStormpath, { HomeRoute,Router, LoginRoute, LogoutRoute,AuthenticatedRoute } from 'react-stormpath';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import store from './redux/store';

const app = document.getElementById('app');

ReactStormpath.init({
  // Optional: Set if you want to use your own dispatcher or configure one such as 'redux'.
  // When no dispatcher is set, the default is 'flux'.
  dispatcher: {
    // Optional: Can either be 'flux' or 'redux'. Defaults to 'flux'.
    type: 'redux',

    // Required when you use type 'redux'.
    // The store that you wish to dispatch events to.
    store: store
  },

  // Optional: If your are running our framework integration
  // (e.g. express-stormpath) on a different domain, or you have
  // changed the default endpoints in the framework integration.
  // Values shown are the defaults.
  endpoints: {
    baseUri: `https://stevenstrader.apps.stormpath.io`, // E.g. https://api.example.com
    login: '/signin',
    register: '/signup',
    verifyEmail: '/verify',
    forgotPassword: '/forgot',
    changePassword: '/change',
    logout: '/logout'
  }
});
ReactDOM.render(
  <Router history={browserHistory}>
    <HomeRoute path='/' component={Layout} >
    <IndexRoute component={IndexPage} />
    <LoginRoute path='/signin' component={Signin} />
    <LogoutRoute path='/logout' />
    <Route path='/signup' component={Signup}/>
  
    </HomeRoute>
  </Router>,
  app
);



