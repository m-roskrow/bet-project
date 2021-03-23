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

  function getData(sport, region, market, oddsFormat){
      return new Promise(function (resolve, reject) {
      let xhr = new XMLHttpRequest();
      var url = "https://fxe3hhzmk9.execute-api.us-east-2.amazonaws.com/beta/odd";
      xhr.open("POST", url);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
            resolve(JSON.parse(JSON.parse(JSON.parse(xhr.responseText).body)));
        } else {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        }
      };
      xhr.onerror = function () {
          reject({
              status: this.status,
              statusText: xhr.statusText
          });
      };
      var data2 = JSON.stringify({"sport": sport, "region": region, "market": market, "oddsFormat": oddsFormat});    
      xhr.send(data2);
      })
  }

  export default function OddsHighlights(props) {
    const classes = useStyles();
    const [sport, setSport] = React.useState(props.sport);
    const [data, setData] = React.useState({"success": false, "status": "Loading..."});
    const setProps = (props) => {
      setSport(props.sport);
    }
    React.useEffect(() => 
      setProps(props),
      [props.sport]
    );
    
    getData("basketball_nba", "us", "h2h", "american").then((value) => setData(value));
   
      
    return (
                
                <Card className={classes.root}>
                    <a href="something">
                        <CardActionArea title={sport}>
                            <CardMedia className={classes.media} image={example} ></CardMedia>
                            <CardContent><Typography gutterBottom variant="body1" component="h2">
                                hello
                                </Typography>
                                <Typography variant="body1" color="textSecondary" component="p">
                                {sport}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </a>
                </Card>
              );
      }
      
        