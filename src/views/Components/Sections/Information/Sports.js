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



// old news section using NewsAPI
/*const createNewsCards = (sport, indexStart) => {  
  
  return(<GridContainer justify="space-evenly" spacing={1}>
    <GridItem xs={3}>
      <SportsNews sport={sport} index={indexStart}></SportsNews>
    </GridItem><GridItem xs={3}>
      <SportsNews sport={sport} index={indexStart+1}></SportsNews>
    </GridItem><GridItem xs={3}>
      <SportsNews sport={sport} index={indexStart+2}></SportsNews>
    </GridItem><GridItem xs={3}>
      <SportsNews sport={sport} index={indexStart+3}></SportsNews>
    </GridItem>
  </GridContainer>)
}*/

const createOddsHighlights = (sport) => {
  return (<OddsHighlights sport={sport}></OddsHighlights>);
}

const useStyles = makeStyles(styles);

export default function Sports() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <div id="navigation-pills">
          <div className={classes.title}>
            <Typography variant = "h2" align="center">Upcoming Games</Typography>
            <Typography variant = "body2" align="center">Click to see the best Moneyline odds for the next 4 games of your chosen sport. Games with Arbitrage possibilities are highlighted.</Typography>
          </div>
          <GridContainer justify="space-evenly" align="center">
          <GridItem  xs={12}>
              <NavPills
                color="primary"
                tabs={[
                  {
                    tabButton: "NFL",
                    tabIcon: Football,
                    tabContent: (
                      <div>
                        <GridItem xs={10}>
                          <h3>The National Football League (USA)</h3>
                        </GridItem>
                        {createOddsHighlights("nfl")}
                        </div>
                    )
                  },
                  {
                    tabButton: "NBA",
                    tabIcon: Basketball,
                    tabContent: (
                      <div>
                        <GridItem xs={10}>
                          <h3>The National Basketball Association (USA)</h3>
                        </GridItem>
                        {createOddsHighlights("NBA")}
                        </div>
                    )
                  },
                  {
                    tabButton: "NHL",
                    tabIcon: Hockey,
                    tabContent: (
                      <div>
                      
                        <GridItem xs={10}>
                          <h3>The National Hockey League (USA)</h3>
                        </GridItem>
              
                        {createOddsHighlights("NHL")}
                        </div>
                    )
                  },
                  {
                    tabButton: "NCAAB",
                    tabIcon: Basketball,
                    tabContent: (
                      <div>
                      
                        <GridItem xs={10}>
                          <h3>The National Collegiate Athletics Association (Basketball - USA)</h3>
                        </GridItem>
                        
                        {createOddsHighlights("college basketball")}
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