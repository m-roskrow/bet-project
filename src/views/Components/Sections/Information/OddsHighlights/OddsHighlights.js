import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem";
import {v4 as uuidv4} from 'uuid';
import HighlightsCard from "./HighlightsCard.js";

  const useStyles = makeStyles({
    root: {
      maxWidth: window.innerWidth/3,
    },
    media: {
      height: 600,
    },
    rowC: {
      display:"flex", flex_direction:"row"
    }
  });

  function getData(sport, region, market, oddsFormat, updated){
      return new Promise(function (resolve, reject) {
      if (updated){
        reject({status: "Undeeded Update", statusText: "already updated"})
      }
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

  function genCards (sport, classes, operators) {
    var data = require("./example.json")
    if (!data.success) {
      console.log(data);
      
      return (<p>Error fetching Odds data, please try refreshing. Contact mroskrow@moneylineschecker.com if the problem persists.</p>);
    }
    else if (data.data.length === 0) {
      return (<p>No current {sport} games.</p>)
    }
    else {
      var cards = [];
      for (var i = 0; (i < data.data.length && i < 4); i++){
        cards.push(genCard(data.data[i].sites, data.data[i].teams, sport, operators));
      }
      return cards
    }
  }

  function genCard (sites, teams, sport, operators) {
    var operators = require ("components/StateTable/operators.json");
    if (sites.length === 0) return <p>Sorry, we have no supported odds data for {teams[0]} vs {teams[1]}</p>
    else {
      return(<HighlightsCard 
        sites = {sites}
        teams = {teams}
        operators = {operators} 
        sport = {sport} 
        oddsFormat= {"american"} 
        key={uuidv4()}></HighlightsCard>)
    }
  }

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
    
    //getData("basketball_nba", "us", "h2h", "american", hasUpdated).then((value) => {setData(value); setUpdated(true)});
    return (
          <GridItem className={classes.rowC} >{genCards(sport, classes, require ("components/StateTable/operators.json"))}</GridItem>
              );
      }
      
        