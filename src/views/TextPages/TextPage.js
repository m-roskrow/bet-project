import React from "react";
// nodejs library that concatenates classes
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import {v4 as uuidv4} from 'uuid';

function createPage(classes, title) {
  var data = (require('./textContent.json'));
  data = data[title];
  const output = [];
  output.push(createTitle(classes, data.title, data.title_desc));
  for (var i=0; i<(data.body).length; i++){
    output.push(createBody(classes, data.body_headers[i], data.body[i]));
  }
  return output
}

/* create title and body from input data */
function createTitle(classes, title, titleDesc) {
  return (<GridContainer className={classes.title} justify="center" key={uuidv4()}>
  <GridItem xs={12}>
    <br />
    <br />
    <h2 >{title}</h2>
    <h4 >{titleDesc}</h4>
  </GridItem>
</GridContainer>)
}
/* create title and body from input data */
function createBody(classes, header, body) {
  return (<GridContainer className={classes.title} justify="center" key={uuidv4()}>
  <GridItem xs={12}>
    <br />
    <br />
    <h3 >{header}</h3>
    <h5 >{body}</h5>
  </GridItem>
</GridContainer>)
}

const useStyles = makeStyles(styles);
export default function TextPage(props) {
  const classes = useStyles();
  const [title] = React.useState(props.title);
  return (
    <div className={classes.section}>
      {createPage(classes, title)}
    </div>
  );
}
