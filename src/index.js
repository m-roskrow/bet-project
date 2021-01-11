import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.9.0";

// pages for this product
import Components from "views/Components/Components.js";
import LandingPage from "views/LandingPage/LandingPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import NFLPage from "views/SportsPages/NFLPage.js";
import NBAPage from "views/SportsPages/NBAPage.js";
import NHLPage from "views/SportsPages/NHLPage.js";
import NCAABPage from "views/SportsPages/NCAABPage.js";
import AboutUs from "views/About/AboutUs.js";

var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/landing-page" component={LandingPage} />
      <Route path="/profile-page" component={ProfilePage} />
      <Route path="/login-page" component={LoginPage} />
      <Route exact path="/" component={Components} />
      <Route path="/nfl-odds" component={NFLPage} />
      <Route path="/nba-odds" component={NBAPage} />
      <Route path="/nhl-odds" component={NHLPage} />
      <Route path="/ncaab-odds" component={NCAABPage} />
      <Route path="/about-us" component={AboutUs} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
