import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Image } from 'react'

const useStyles = makeStyles({
    root: {
      maxWidth: 200,
      maxHeight: 200,
    },
    media: {
      height: 96
    },
  });

// return string of file location of brand image given the brand's "key"
function getData(key){
    var opData = (require('./operators.json'));
    if (opData.operators[key] === undefined || !opData.operators[key].include) return '{}';
    else {
    return(opData.operators[key])
    };
  }

  export default function MiniBrandCards(props) {
    const [data, setData] = React.useState(getData(props.sportKey));    

    return(
        <img 
  style={{width: 30, height: 30, borderRadius: 60/ 2}} 
  src= {data.logoLocation}
  alt= "error"
/>
    )
  }