import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import GridItem from "components/Grid/GridItem";


const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    outline_style: "solid",
    border: 2,
    borderStyle: 'solid',
    borderColor: "#5c6bc0",
    height: 200,
    display:"flex", flex_direction:"row",
    background: 'white',
    color: "#5c6bc0",
  },
  media: {
    height: 500,
  },
  rowC: {
    display:"flex", flex_direction:"row"
  }
});

// convert odds to percentage probability given by that operator
function convertToProb (oddsFormat, odd){
  if (oddsFormat === "american"){
    if (odd > 0){
      var temp = 1+(odd/100);
      temp = Math.round(100-((temp-1)/(temp) * 100));
      return (temp);}
    else {
      var temp = (1-(100/odd));
      temp = Math.round(100-((temp-1)/(temp) * 100));
      return (temp);}
  }
  else if (oddsFormat === "decimal") {
    var temp = Math.round(100-((odd-1)/(odd) * 100));
    return (temp);
  }
  else return ("Odd Format not supported");
}

// uses checkSite to check each website against the operators list and returns a new list of allowed operators
function filterSites (operators, sites){
  var newSites = []
  for (var i = 0; i < sites.length; i++){
    if (checkSite(operators, sites[i].site_key)) newSites.push(sites[i]); 
  }  
  return newSites;
}

// returns @Boolean of whether website is permitted given a site_key and the operators json
function checkSite (operators, siteKey){
  if (operators.operators[siteKey] === undefined) return false
  else if (operators.operators[siteKey].include) return true
  else return false
}

//TODO add non-h2h support
// generate best two odds and return in format:
// {{"team1: {"site_key": , "site": ,"value": },
// {"team2: {"site_key": , "site": ,"value": }}
function genTopTwo (operators, sites){
  sites = filterSites (operators, sites);
  var best = {
    "team1": {"site_key": sites[0].site_key, "site": sites[0].site_nice, "value": sites[0].odds.h2h[0]}, 
    "team2": {"site_key": sites[0].site_key, "site": sites[0].site_nice, "value": sites[0].odds.h2h[1]}};
  for (var i = 1; i < sites.length; i++){
    if (sites[i].odds.h2h[0] > best.team1.value){
      best.team1 = {"site_key": sites[i].site_key, "site": sites[i].site_nice, "value": sites[i].odds.h2h[0]}
    }
    if (sites[i].odds.h2h[1] > best.team2.value){
      best.team2 = {"site_key": sites[i].site_key, "site": sites[i].site_nice, "value": sites[i].odds.h2h[1]}
    }
  }
  return best
}

function genHighlights(sport, sites, operators, teams, classes){
  const best = genTopTwo(operators, sites)
  var arb = false;
  console.log("team1: " + convertToProb('decimal', best.team1.value) + "team2: " +  convertToProb('decimal', best.team2.value))
  if ((convertToProb('decimal', best.team1.value ) + convertToProb('decimal', best.team2.value)) > 100){
    arb = true
  }
  return (
    <div>
      {arb ? "Arbitrage Available": ""}
      <div className = {classes.rowC}>
        <GridItem xs = {6}> <Typography>{teams[0]} </Typography></GridItem>
        <GridItem xs = {6}> <Typography>{teams[1]} </Typography></GridItem>
      </div>
      <br></br>
      <div className = {classes.rowC}>
        <GridItem xs = {6}>{best.team1.site}</GridItem>
        <GridItem xs = {6}>{best.team2.site}</GridItem>
      </div>
      <div className = {classes.rowC}>
        <GridItem xs = {6}>{best.team1.value}</GridItem>
        <GridItem xs = {6}>{best.team2.value}</GridItem>
      </div>
    </div>
  )
}

export default function HighlightsCard(props) {
    const classes = useStyles();
    const [sport, setSport] = React.useState(props.sport);
    const [sites, setSites] = React.useState(props.sites);
    const [operators, setOperators] = React.useState(props.operators);
    const [teams, setTeams] = React.useState(props.teams);
    const [oddsFormat, setOddsFormat] = React.useState(props.oddsFormat);
    const setProps = (props) => {
      setSport(props.sport);
      setSites(props.sites);
      setOperators(props.operators);
      setTeams(props.teams);
      setOddsFormat(props.oddsFormat)
    }
    React.useEffect(() => 
      setProps(props),
      [props.sport, props.sites, props.operators, props.teams, props.oddsFormat]
    );
    console.log(sites)
    console.log(filterSites(operators, sites))
    //getData("basketball_nba", "us", "h2h", "american", hasUpdated).then((value) => {setData(value); setUpdated(true)});
    return(<div><Card  className= {classes.root}>
        <CardActionArea title={sport}>
          <CardContent>
              {genHighlights(sport, sites, operators, teams, classes)}
          </CardContent>
        </CardActionArea>
    </Card></div>);
      }
