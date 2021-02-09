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
import SportsNews from "./News/SportsNews.js"
import OddsHighlights from "./OddsHighlights/OddsHighlights.js"
import styles from "assets/jss/material-kit-react/views/componentsSections/pillsStyle.js";
import Typography from '@material-ui/core/Typography';


const createNewsCards = (sport, indexStart) => {  
  return (<p>news not currently working</p>)
  /*return(<GridContainer justify="space-evenly" spacing={1}>
    <GridItem xs={3}>
      <SportsNews sport={sport} index={indexStart}></SportsNews>
    </GridItem><GridItem xs={3}>
      <SportsNews sport={sport} index={indexStart+1}></SportsNews>
    </GridItem><GridItem xs={3}>
      <SportsNews sport={sport} index={indexStart+2}></SportsNews>
    </GridItem><GridItem xs={3}>
      <SportsNews sport={sport} index={indexStart+3}></SportsNews>
    </GridItem>
  </GridContainer>)*/
}

const useStyles = makeStyles(styles);

export default function Sports() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <div id="navigation-pills">
          <div className={classes.title}>
            <Typography variant = "h2" align="center">News And Odds</Typography>
          </div>
          <GridContainer justify="space-evenly">
          <GridItem  xs={12} sm={12} md={12} lg={12} xl ={12}>
              <NavPills
                
                color="primary"
                tabs={[
                  {
                    tabButton: "NFL",
                    tabIcon: Football,
                    tabContent: (
                      <div>
                      <GridContainer>
                        <GridItem xs={10}>
                          <h3>The National Football League (USA)</h3>
                        </GridItem>
                        <GridItem xs={2}>
                          <Button
                              round
                              href="/nfl-odds"
                              color="rose"
                              className={classes.navLink}
                          >
                              FULL ODDS TABLE
                          </Button>
                          </GridItem>
                        </GridContainer>
                        {createNewsCards("NFL", 0)}
                        </div>
                    )
                  },
                  {
                    tabButton: "NBA",
                    tabIcon: Basketball,
                    tabContent: (
                      <div>
                      <GridContainer>
                        <GridItem xs={10}>
                          <h3>The National Basketball Association (USA)</h3>
                        </GridItem>
                        <GridItem xs={2}>
                          <Button
                              round
                              href="/nba-odds"
                              color="rose"
                              className={classes.navLink}
                          >
                              FULL ODDS TABLE
                          </Button>
                        </GridItem>
                        </GridContainer>
                        {createNewsCards("NBA", 0)}
                        </div>
                    )
                  },
                  {
                    tabButton: "NHL",
                    tabIcon: Hockey,
                    tabContent: (
                      <div>
                      <GridContainer>
                        <GridItem xs={10}>
                          <h3>The National Hockey League (USA)</h3>
                        </GridItem>
                        <GridItem xs={2}>
                          <Button
                              round
                              href="/nhl-odds"
                              color="rose"
                              className={classes.navLink}
                          >
                              FULL ODDS TABLE
                          </Button>
                        </GridItem>
                        </GridContainer>
                        {createNewsCards("NHL", 0)}
                        </div>
                    )
                  },
                  {
                    tabButton: "NCAAB",
                    tabIcon: Basketball,
                    tabContent: (
                      <div>
                      <GridContainer>
                        <GridItem xs={10}>
                          <h3>The National Collegiate Athletics Association (Basketball - USA)</h3>
                        </GridItem>
                        <GridItem xs={2}>
                          <Button
                              round
                              href="/ncaab-odds"
                              color="rose"
                              className={classes.navLink}
                          >
                              FULL ODDS TABLE
                          </Button>
                        </GridItem>
                        </GridContainer>
                        {createNewsCards("college basketball", 0)}
                        </div>
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