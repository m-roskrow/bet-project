import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";
// sections for this page
import HeaderLinks from "components/Header/HeaderLinks.js";
import InformationSection from "./Sections/Information/InformationSection.js";
import FAQs from "./Sections/Information/FAQs.js";
import Sports from "./Sections/Information/Sports.js";
import styles from "assets/jss/material-kit-react/views/components.js";
import { Info } from "@material-ui/icons";

const useStyles = makeStyles(styles);

function getRandomImage() {
  //"assets/img/eggball1.jpg"
  var jsonData = require("assets/img/page-assets/image-info.json");
  var random = Math.floor(Math.random() * jsonData.images.length);
  return {
    "img": require ("assets/img/page-assets/" + jsonData.images[random].name), 
    "credit": jsonData.images[random].credit, 
    "link": jsonData.images[random].credit_link
}
}

export default function Components(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const image = getRandomImage();
  return (
    <div>
      <Header
        brand="Money Lines Checker"
        rightLinks={<HeaderLinks />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        {...rest}
      />
      <Parallax image={image.img}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h1 className={classes.title}>Money Lines Checker</h1>
                <h3 className={classes.subtitle}>
                  Ensuring you get the best odds available on your sports betting
                </h3>
                <br></br>
               <p>{<a href={image.link}>Credit: {image.credit}</a>}</p>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      <div className={classNames(classes.main, classes.mainRaised)}>
        <Sports>  </Sports>
        <InformationSection></InformationSection>
        <FAQs></FAQs>
      </div>
      <Footer />
    </div>
  );
}
