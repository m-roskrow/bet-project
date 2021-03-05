import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import GridItem from "components/Grid/GridItem";
import GridContainer from "components/Grid/GridContainer";
import example from "assets/img/profile.jpg"

  const useStyles = makeStyles({
    root: {
      maxWidth: window.innerWidth/3,
    },
    media: {
      height: 150,
    },
  });

  export default function OddsHighlights(props) {
    const classes = useStyles();
    const [sport, setSport] = React.useState(props.sport);
    const setProps = (props) => {
      setSport(props.sport);
    }
    React.useEffect(() => 
      setProps(props),
      [props.sport]
    );
    
   
      
    return (

                <Card className={classes.root}>
                    <a href="something">
                        <CardActionArea title={sport}>
                            <CardMedia className={classes.media} image={example} ></CardMedia>
                            <CardContent><Typography gutterBottom variant="body1" component="h2">
                                hello
                                </Typography>
                                <Typography variant="body" color="textSecondary" component="p">
                                there
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </a>
                </Card>
              );
      }
      
        