import React, { Fragment } from 'react';
import './App.css';
import {
  Route,
  Switch,
  Link,
  BrowserRouter as Router,
} from 'react-router-dom';
import ConcertList from "./ConcertList.js"
import Detail from './Detail.js';
import SignUp from './SignUp.js'
import Saved from './Saved.js'
import AboutUs from './AboutUs.js'
import HomePage from './HomePage.js'
import Header from './Header.js';
import Footer from './Footer.js';

export default class App extends React.Component {
  state = {
    app: true
  }
  render() {
    return (
      <Router>
        <div id="app-div">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Fragment>
              <Route exact path="/signup" component={SignUp} />
              <Header />
              // this should be managed in css
              <div style={{width: '100%', height: '75px' }} ></div>
              <Footer />
              <Route exact path="/saved" component={Saved} />
              <Route exact path="/concerts" component={ConcertList} />
              <Route exact path="/concert/:id" component={Detail} />
              <Route exact path="/about" component={AboutUs} />
              <div style={{width: '100%', height: '75px' }} ></div>
            </Fragment>
          </Switch>
        </div>
      </Router>
    )
    }
}
