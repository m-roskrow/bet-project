import React from "react";
// core components
// sections for this page
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import StateSelect from "components/Select/StateSelect.js";
import StateTable from "components/StateTable/StateTable.js";
import OddsTypeSelect from "components/Select/OddsTypeSelect.js";
import OddsDisplayTypeSelect from "components/Select/OddsDisplayTypeSelect";
import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/bg7.jpg";

const useStyles = makeStyles(styles);

export default function NBAPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [currentState, setCurrentState] = React.useState("CO");
  const [oddsType, setOddsType] = React.useState("h2h");
  const [oddsDisplayType, setOddsDisplayType] = React.useState("american");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;
  
  const handleChange = (newValue) => {setCurrentState(newValue)};
  const handleChange2 = (newValue) => {setOddsType(newValue);};
  const handleChange3 = (newValue) => {setOddsDisplayType(newValue);};
  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="Odds Comparison"
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
          <GridItem >
              <div className={classes.brand}>
                <h1  className={classes.title}>NBA Matches</h1>
                <b></b>
              </div>
            </GridItem>
            <GridItem xs={12} sm={12} md={12} lg={12} xl ={12}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="info" className={classes.cardHeader} >
                    <GridContainer>
                      <GridItem xs={3} sm={3} md={3} lg={3} xl ={3}>
                      </GridItem>
                      <StateSelect onChange={handleChange} ></StateSelect>
                      <OddsTypeSelect onChange={handleChange2} oddsCode={0}></OddsTypeSelect>
                      <OddsDisplayTypeSelect onChange={handleChange3}></OddsDisplayTypeSelect>
                    </GridContainer>
                  </CardHeader>
                  <CardBody>
                    <StateTable state={currentState} 
                    sportType={0}
                    region={"us"}
                    sport={"basketball_nba"}
                    market={oddsType}
                    oddsFormat={oddsDisplayType}
                    apiKey={"51c2265d2d2df87c32348b2f6dbca729"}></StateTable>
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                      <p>All currently available states are selectable in the dropdown menu,
                        apologies if your state is not yet supported, we're working on it!
                      </p>
                      <p>We are fully licensed to operate in any states shown blah blah blah 
                        blah blah blah blah blah blah blah blah blahblah blah blah</p>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}