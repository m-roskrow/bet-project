import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import useAxios from 'axios-hooks';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import GridItem from "components/Grid/GridItem";
import GridContainer from "components/Grid/GridContainer";

  const useStyles = makeStyles({
    root: {
      maxWidth: 400,
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
        <div>
        <GridContainer>
            <GridItem xs={12} justify="center">
                <Typography variant = "h4" align="center">Highlighted Odds</Typography>
            </GridItem>
        </GridContainer>
        <GridContainer>
                
        </GridContainer>
        <GridContainer>
            <GridItem xs={4}>
                <Card className={classes.root}>
                    <a href="something">
                        <CardActionArea title={sport}>
                            <CardMedia className={classes.media} image={""} ></CardMedia>
                            <CardContent><Typography gutterBottom variant="body2" component="h2">
                                hello
                                </Typography>
                                <Typography variant="body3" color="textSecondary" component="p">
                                there
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </a>
                </Card>
            </GridItem>
        </GridContainer>
        </div>
              );
      }
      
        