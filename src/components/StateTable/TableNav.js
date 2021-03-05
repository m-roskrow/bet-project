import React from "react";
// core components
// sections for this page
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import NavPills from "components/NavPills/NavPills.js";
import Button from "components/CustomButtons/Button.js";

// @material-ui/icons
import Football from "@material-ui/icons/SportsFootballOutlined";
import Basketball from "@material-ui/icons/SportsBasketballOutlined";
import Hockey from "@material-ui/icons/SportsHockeyOutlined";
import IconButton from '@material-ui/core/IconButton';
import styles from "assets/jss/material-kit-react/views/componentsSections/pillsStyle.js";
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        flexDirection: 'column',
        size: "large",
        fontSize: "large",
      },
    },
  }));

export default function TableNav(props){
    const [currentSport] = React.useState(props.currentSport);
    const classes = useStyles(styles);
    return(

        <div className={classes.root}>
            <IconButton href="/nfl-odds" aria-label="nfl" color={currentSport === 'nfl' ? "secondary" : "default"}><div><Football ></Football><Typography>NFL</Typography></div></IconButton>
            <IconButton href="/nba-odds" aria-label="nba" color={currentSport === 'nba' ? "secondary" : "default"}><div><Basketball></Basketball><Typography>NBA</Typography></div></IconButton>
            <IconButton href="/nhl-odds" aria-label="nhl" color={currentSport === 'nhl' ? "secondary" : "default"}><div><Hockey></Hockey><Typography>NHL</Typography></div></IconButton>
            <IconButton href="/ncaab-odds" aria-label="ncaab" color={currentSport === 'ncaab' ? "secondary" : "default"}><div><Basketball></Basketball><Typography>NCAAB</Typography></div></IconButton>
        </div>)}