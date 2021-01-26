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


const getDate = () => {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1;
  var yyyy = today.getFullYear();
  if(dd<10) dd='0'+dd;
  if(mm<10) mm='0'+mm;
  today = yyyy + '-' + mm + '-' + dd;
  return today;
  }
  
  function shortenString(input){
    if (input.length > 75) return input.substring(0,73) + "...";
    else return input;
  }

  const useStyles = makeStyles({
    root: {
      maxWidth: 400,
    },
    media: {
      height: 150,
    },
  });

  export default function SportsNews(props) {
    const classes = useStyles();
    const [index, setIndex] = React.useState(props.index);
    const [sport, setSport] = React.useState(props.sport);
    const setProps = (props) => {
      setIndex(props.index);
      setSport(props.sport);
    }
    React.useEffect(() => 
      setProps(props),
      [props.sport, props.index]
    );
    
    var apiLink = 'http://newsapi.org/v2/everything?' +
      'q='+ sport + '&' +
      'from='+ getDate() + '&' +
      'sortBy=popularity&' +
      'apiKey=3972ca9c99a94669b922ab85acb7d4df';
    const [{ data, loading, error }, refetch] = useAxios(
      apiLink)
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error!</p>
      try{
      return (
        <GridItem>
                    <Card className={classes.root}>
                    <a href={data.articles[index].url}>
                      <CardActionArea title={data.articles[index].source.id}>
                        <CardMedia className={classes.media} image={data.articles[index].urlToImage} ></CardMedia>
                        <CardContent><Typography gutterBottom variant="body2" component="h2">
                          {shortenString(data.articles[index].title)}
                          </Typography>
                          <Typography variant="body2" color="textSecondary" component="p">
                            {"Source: " + data.articles[index].source.name}
                          </Typography>
                          </CardContent>
                        </CardActionArea>
                      </a>
                    </Card>
                    </GridItem>
              );
      }
      catch (e){
        return(<p>{"error in loading news, code: " + e}</p>);
      }
        }