import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Question from "@material-ui/icons/Help";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import NavPills from "components/NavPills/NavPills.js";

import styles from "assets/jss/material-kit-react/views/componentsSections/pillsStyle.js";

const useStyles = makeStyles(styles);

export default function FAQs() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <div id="navigation-pills">
          <div className={classes.title}>
            <h3>FAQs</h3>
          </div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12} lg={6}>
              <NavPills
                color="primary"
                horizontal={{
                  tabsGrid: { xs: 12, sm: 4, md: 4 },
                  contentGrid: { xs: 12, sm: 8, md: 8 }
                }}
                tabs={[
                  {
                    tabButton: "How Frequently Are Odds Updated?",
                    tabIcon: Question,
                    tabContent: (
                      <span>
                        <p>
                        Odds are updated approximately every 5 minutes pre-match
                         (average latency of 2.5 minutes).
                        </p>
                        <br />
                        <p>
                        Odds update more frequently several hours before games go live,
                         with update intervals decreasing to under 1 minute when games are live.
                        </p>
                        <br />
                        <p>
                        For outrights markets (for example Super Bowl Futures), 
                        odds update every 30 minutes, and under 1 minute when live.
                        </p>
                        <br />
                        <p>
                        Our odds values are all sourced from <a href="https://the-odds-api.com/"> The Odds </a> </p>
        
                      </span>
                    )
                  },
                  {
                    tabButton: "Why Aren't My Odds Updating?",
                    tabIcon: Question,
                    tabContent: (
                      <span>
                        <p>
                          The Odds Tables refresh every time a new sport, state, market or odd type is selected
                        </p>
                        <br />
                        <p>
                          If refreshing the page does not update the odds, they probably haven't changed.
                        </p>
                      </span>
                    )
                  },
                  {
                    tabButton: "Question 3",
                    tabIcon: Question,
                    tabContent: (
                      <span>
                        <p>
                          Some other FAQ text here
                        </p>
                        <br />
                        <p>
                          blah blah blah
                        </p>
                      </span>
                    )
                  }
                ]}
              />
            </GridItem>
          </GridContainer>
          </div>
          </div>
          </div>
          );
        }