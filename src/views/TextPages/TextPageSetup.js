import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from 'react-router-dom'
// @material-ui/icons
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import styles from "assets/jss/material-kit-react/views/landingPage.js";
import TextPage from "./TextPage.js";
// Sections for this page

const useStyles = makeStyles(styles);

export default function TextPageSetup(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const title = useLocation();
  return (
    <div>
      <Header
        brand="Money Lines Checker"
        rightLinks={<HeaderLinks />}
        fixed
        color="white"
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        {...rest}
      />
     
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <TextPage title={title.pathname.substring(1)}></TextPage>
          
        </div>
      </div>
      <Footer />
    </div>
  );
}
