import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
      maxWidth: 100,
    },
    media: {
      height: 96,
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

  export default function BrandCards(props) {
    const classes = useStyles();  
    
    const [odd, setOdd] = React.useState(props.odd);
    const [data, setData] = React.useState(getData(props.sportKey));    

    return(
        <Card className={classes.root}>
            <a href={"example.com"}>
                <CardActionArea title={data.siteNice}>
                    <CardMedia className={classes.media} image={data.logoLocation}  title={data.siteNice}></CardMedia>
                    <CardContent><Typography gutterBottom variant="body2" component="h2">{odd}</Typography></CardContent>
                </CardActionArea>
            </a>
        </Card>
    )
  }