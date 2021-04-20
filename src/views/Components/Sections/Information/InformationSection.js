import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import styles from "assets/jss/material-kit-react/views/componentsSections/completedStyle.js";

const useStyles = makeStyles(styles);

export default function InformationSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12}>
            <h2>Our Mission:</h2>
            <h4>
              We are here to help. Our goal is to ensure that nobody betting on sports 
              fixtures is taking odds that are anything less than than
              the best odds available. Therefore we have compiled
              lists of all of the bookmaker's odds in handy tables for you!
            </h4>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
