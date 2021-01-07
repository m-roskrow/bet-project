import React from "react";
// core components
// sections for this page
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import StateSelect from "components/Select/StateSelect.js";
import StateTable from "components/StateTable/StateTable.js";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/bg7.jpg";

const useStyles = makeStyles(styles);

export default function NFLPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [currentState, setCurrentState] = React.useState("CO");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;
  const handleChange = (event) => {setCurrentState(event.target.value)};
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
            <GridItem xs={12} sm={12} md={12} lg={12} xl ={12}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="info" className={classes.cardHeader} >
                    <StateSelect title={"NFL Fixtures"} onChange={handleChange}></StateSelect>
                  </CardHeader>
                  <CardBody>
                    <StateTable state={currentState} apiLink={"https://api.the-odds-api.com/v3/odds/?sport=americanfootball_nfl&region=us&mkt=h2h&dateFormat=iso&apiKey=51c2265d2d2df87c32348b2f6dbca729"}></StateTable>
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                      <p>All currently available states are selectable in the dropdown menu,
                        apologies if your state is not yet supported, we're working on it!. 
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
