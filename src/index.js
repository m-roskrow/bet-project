import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.9.0";

// pages for this product
import Components from "views/Components/Components.js";

import NFLPage from "views/SportsPages/NFLPage.js";
import NBAPage from "views/SportsPages/NBAPage.js";
import NHLPage from "views/SportsPages/NHLPage.js";
import NCAABPage from "views/SportsPages/NCAABPage.js";
import AboutUs from "views/About/AboutUs.js";
import TextPageSetup from "views/TextPages/TextPageSetup";

var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route exact path="/" component={Components} />
      <Route path="/nfl-odds" component={NFLPage} />
      <Route path="/nba-odds" component={NBAPage} />
      <Route path="/nhl-odds" component={NHLPage} />
      <Route path="/ncaab-odds" component={NCAABPage} />
      <Route path="/about-us" component={AboutUs} />
      <Route path="/legal" component={TextPageSetup} />
      <Route path="/help" component={TextPageSetup} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
