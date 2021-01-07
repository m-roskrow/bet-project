import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Football from "@material-ui/icons/SportsFootballOutlined";
import Basketball from "@material-ui/icons/SportsBasketballOutlined";
import Hockey from "@material-ui/icons/SportsHockeyOutlined";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import NavPills from "components/NavPills/NavPills.js";
import Button from "components/CustomButtons/Button.js";


import styles from "assets/jss/material-kit-react/views/componentsSections/pillsStyle.js";

const useStyles = makeStyles(styles);

export default function SectionPills() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <div id="navigation-pills">
          <div className={classes.title}>
            <h3>Currently Supported Sports Leagues</h3>
          </div>
          <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12} lg={12} xl ={12}>
              <NavPills
                color="primary"
                tabs={[
                  {
                    tabButton: "NFL",
                    tabIcon: Football,
                    tabContent: (
                      <span>
                        <p>The National Football League (USA)</p>
                        <Button
                            round
                            href="/nfl-odds"
                            color="primary"
                            className={classes.navLink}
                        >
                            NFL ODDS TABLE
                        </Button>
                      </span>
                    )
                  },
                  {
                    tabButton: "NBA",
                    tabIcon: Basketball,
                    tabContent: (
                      <span>
                        <p>The National Basketball Association (USA)</p>
                        <Button
                            round
                            href="/nba-odds"
                            color="primary"
                            className={classes.navLink}
                        >
                            NBA ODDS TABLE
                        </Button>
                      </span>
                      
                    )
                  },
                  {
                    tabButton: "NHL",
                    tabIcon: Hockey,
                    tabContent: (
                      <span>
                        <p>The National Hockey League (USA)</p>
                        <Button
                            round
                            href="/nhl-odds"
                            color="primary"
                            className={classes.navLink}
                        >
                            NHL ODDS TABLE
                        </Button>
                      </span>
                    )
                  },
                  {
                    tabButton: "NCAA",
                    tabIcon: Basketball,
                    tabContent: (
                      <span>
                        <p> National Collegiate Athletic Association. College Basketball League (USA)</p>
                        <Button
                            round
                            href="/ncaa-odds"
                            color="primary"
                            className={classes.navLink}
                        >
                            NCAA ODDS TABLE
                        </Button>
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