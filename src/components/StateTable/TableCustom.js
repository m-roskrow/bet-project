import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {v4 as uuidv4} from 'uuid';
import Tooltip from '@material-ui/core/Tooltip';
import BrandCards from "./BrandCards.js";
import MiniBrandCards from './MiniBrandCards.js';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function createData(team1, bestT1, team2, bestT2, date, sites, bestSites1, bestSites2, bestT1Key, bestT2Key, bestPercentage1, bestPercentage2) {
  return {
    team1,
    bestT1,
    team2,
    bestT2,
    date,
    sites,
    bestSites1,
    bestSites2,
    bestT1Key,
    bestT2Key,
    bestPercentage1,
    bestPercentage2,
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow hover={true} className={classes.root}>
        <TableCell >
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" align="left">{row.date}</TableCell>
        <TableCell align="center">{row.team1}</TableCell>
        <TableCell align="center"><BrandCards sportKey={row.bestT1Key} odd={row.bestPercentage1 + "   " + row.bestT1}></BrandCards></TableCell>
        <TableCell align="center">{row.team2}</TableCell>
        <TableCell align="center"><BrandCards sportKey={row.bestT2Key} odd={row.bestPercentage2 + "   " + row.bestT2}></BrandCards></TableCell>
      </TableRow>
      <TableRow hover={true}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Sites and Odds
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow hover={true}>
                    <TableCell>Site</TableCell>
                    <TableCell align="right">{row.team1} Odds</TableCell>
                    <TableCell align="right">{row.team2} Odds</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.sites.map((sitesRow) => (
                    <Tooltip key={uuidv4()} title={"Last Update: " + sitesRow.updateTime}>
                      <TableRow hover={true}>
                        <TableCell component="th" scope="row">
                          <div>
                          <MiniBrandCards sportKey={sitesRow.siteKey}></MiniBrandCards>
                          {"   " + sitesRow.site}
                          </div>
                        </TableCell>
                        <TableCell align="right">{sitesRow.oddsPercentage1 + "   " + sitesRow.odds1}
                          </TableCell>
                        <TableCell align="right">{sitesRow.oddsPercentage2 + "   " + sitesRow.odds2}</TableCell>
                      </TableRow>
                    </Tooltip>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    team1: PropTypes.string.isRequired,
    bestT1: PropTypes.string.isRequired,
    team2: PropTypes.string.isRequired,
    bestT2: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    sites: PropTypes.arrayOf(
      PropTypes.shape({
        site: PropTypes.string.isRequired,
        odds1: PropTypes.string.isRequired,
        odds2: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        updateTime: PropTypes.string.isRequired,
        siteKey: PropTypes.string.isRequired,
        oddsPercentage1: PropTypes.string.isRequired,
        oddsPercentage2: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};


/* function which generates the tabular data from the input data taken from the-odds-api*/
/* */
function updateRows(data, market, state, filter, oddsFormat) {
  
  const numGames = data.data.length;
  const output = [];
  const bestSitesArray1 = [];
  const bestSitesArray2 = [];
  for (var i = 0 ; i < numGames; i++){
    const homeTeam = data.data[i].home_team;
    var team1 = data.data[i].teams[0];
    var team2 = data.data[i].teams[1];
    if (team1 === homeTeam) team1 += " (H)";
    if (team2 === homeTeam) team2 += " (H)";
    const tempDate = new Date((data.data[i].commence_time));
    //TODO sort date formatting
    // TODO implement search filtering
    console.log(tempDate);
    const date = tempDate.toDateString();
    
    const numSites = data.data[i].sites_count;
    const sitesArray = [];
    var bestT1 = -999999;
    var bestT2 = -999999;
    var bestT1Arr = ["over", -1, 0];
    var bestT2Arr = ["under", -1, 0];
    var bestIndex1 = [];
    var bestIndex2 = [];
    var oddsPercentage1;
    var oddsPercentage2;
    for (var j = 0; j < numSites; j++){
      const siteKey = (data.data[i].sites[j].site_key);
      if (opStateCheck(siteKey, state)) {
        const siteName = data.data[i].sites[j].site_nice;
        const oddsType = market;
        var oddsT1;
        var oddsT2;
        var tempT1;
        var tempT2;
        /* populate inner odds table - catching errors on odd fetching in case not available for that sport type
        also includes handling to generate the highlighted "best" odds for each category
        TODO - look at spreads and totals - maybe include best odds for each position rather than best of first encountered*/
        switch(oddsType) {
          case ("h2h"):
            try {
              oddsT1 = data.data[i].sites[j].odds.h2h[0].toString();
              oddsT2 = data.data[i].sites[j].odds.h2h[1].toString();
              tempT1 = data.data[i].sites[j].odds.h2h[0];
              tempT2 = data.data[i].sites[j].odds.h2h[1];
              /* calculating best odds */
              if (tempT1 > bestT1){
                bestIndex1 = [j];
                bestT1 = tempT1;}
              else if (tempT1 === bestT1){
                bestIndex1.push(j);}
              if (tempT2 > bestT2){
                bestIndex2 = [j];
                bestT2 = tempT2;}
              else if (tempT2 === bestT2){
                bestIndex2.push(j);}
              oddsPercentage1 = convertToProb(oddsFormat, data.data[i].sites[j].odds.h2h[0]);
              oddsPercentage2 = convertToProb(oddsFormat, data.data[i].sites[j].odds.h2h[1]);
            }
            catch(err) {
              oddsT1 = "unavailable";
              oddsT2 = "unavailable"
            }
            break;
          case ("totals"):
            try {
              oddsT1 = data.data[i].sites[j].odds.totals.position[0] + " " + data.data[i].sites[j].odds.totals.points[0].toString() + ", " +  data.data[i].sites[j].odds.totals.odds[0].toString();
              oddsT2 = data.data[i].sites[j].odds.totals.position[1] + " " + data.data[i].sites[j].odds.totals.points[1].toString() + ", " +  data.data[i].sites[j].odds.totals.odds[1].toString();
              tempT1 = [data.data[i].sites[j].odds.totals.position[0], data.data[i].sites[j].odds.totals.points[0], data.data[i].sites[j].odds.totals.odds[0]];
              tempT2 = [data.data[i].sites[j].odds.totals.position[1], data.data[i].sites[j].odds.totals.points[1], data.data[i].sites[j].odds.totals.odds[1]];
              if (tempT1[1] === bestT1Arr[1] && tempT1[2] === bestT1Arr[2]){
                bestIndex1.push(j);
              }
              else if (bestT1Arr[1] === -1 || (tempT1[1] === bestT1Arr[1] && tempT1[2] > bestT1Arr[2])){
                bestIndex1 = [j];
                bestT1Arr = tempT1;
              }
              if (tempT2[1] === bestT2Arr[1] && tempT2[2] === bestT2Arr[2]){
                bestIndex2.push(j);
              }
              else if (bestT2Arr[1] === -1 || (tempT2[1] === bestT2Arr[1] && tempT2[2] > bestT2Arr[2])){
                bestIndex2 = [j];
                bestT2Arr = tempT2;
              }
              oddsPercentage1 = convertToProb(oddsFormat, data.data[i].sites[j].odds.totals.odds[0]);
              oddsPercentage2 = convertToProb(oddsFormat, data.data[i].sites[j].odds.totals.odds[1]);
            }
            catch(err) {
              console.log(err);
              oddsT1 = "unavailable";
              oddsT2 = "unavailable"
            }
            break;
          case ("outrights"):
            try {
              oddsT1 = data.data[i].sites[j].odds.outrights[0].toString();
              oddsT2 = data.data[i].sites[j].odds.outrights[1].toString();
            }
            catch(err) {
              oddsT1 = "unavailable";
              oddsT2 = "unavailable"
            }
            break;
          case ("spreads"):
            try {
              oddsT1 = data.data[i].sites[j].odds.spreads.points[0].toString() + ", " + data.data[i].sites[j].odds.spreads.odds[0].toString();
              oddsT2 = data.data[i].sites[j].odds.spreads.points[1].toString() + ", " + data.data[i].sites[j].odds.spreads.odds[1].toString();
              tempT1 = [data.data[i].sites[j].odds.spreads.points[0], data.data[i].sites[j].odds.spreads.odds[0]]
              tempT2 = [data.data[i].sites[j].odds.spreads.points[1], data.data[i].sites[j].odds.spreads.odds[1]]

              if (tempT1[0] === bestT1Arr[0] && tempT1[1] === bestT1Arr[1]){
                bestIndex1.push(j);
              }
              else if (bestT1Arr[1] === -1 || (tempT1[0] === bestT1Arr[0] && tempT1[1] > bestT1Arr[1])){
                bestIndex1 = [j];
                bestT1Arr = tempT1;
              }
              if (tempT2[0] === bestT2Arr[0] && tempT2[1] === bestT2Arr[1]){
                bestIndex2.push(j);
              }
              else if (bestT2Arr[1] === -1 || (tempT2[0] === bestT2Arr[0] && tempT2[1] > bestT2Arr[1])){
                bestIndex2 = [j];
                bestT2Arr = tempT2;
              }
              oddsPercentage1 = convertToProb(oddsFormat, data.data[i].sites[j].odds.spreads.odds[0]);
              oddsPercentage2 = convertToProb(oddsFormat, data.data[i].sites[j].odds.spreads.odds[1]);
            }
            catch(err) {
              oddsT1 = "unavailable";
              oddsT2 = "unavailable"
            }
            break;
          default:
            oddsT1 = "error in odds type";
            oddsT2 = "error in odds type";
        }
        
        
        const tempTime = data.data[i].sites[j].last_update;
        const updateTime = tempTime.substring(0, 10) + " " + tempTime.substring(11,19) + " GMT"
        /* check operator / state combination is supported */
        if (oddsT1 === -999999) oddsT1 = "unavailable";
        if (oddsT2 === -999999) oddsT2 = "unavailable";

        sitesArray.push({site: siteName, odds1: oddsT1, odds2: oddsT2, type: oddsType, updateTime: updateTime, siteKey: siteKey, oddsPercentage1: oddsPercentage1, oddsPercentage2: oddsPercentage2});
        }
      }
    var bestSiteNice1 = "";
    var bestSiteNice2 = "";
    for (var z = 0; z < bestIndex1.length; z++){
      if (z===0) bestSiteNice1 = (data.data[i].sites[bestIndex1[z]].site_nice) 
      else bestSiteNice1 = bestSiteNice1 + ", " + (data.data[i].sites[bestIndex1[z]].site_nice);
    }
    for (z = 0; z < bestIndex2.length; z++){
      if (z===0) bestSiteNice2 = (data.data[i].sites[bestIndex2[z]].site_nice) 
      else bestSiteNice2 = bestSiteNice2 + ", " + (data.data[i].sites[bestIndex2[z]].site_nice);
    }
    // handling for games where we do not support any of the odds providers
    if (bestIndex1.length === 0) {bestSiteNice1 = "N/A"; bestT1 = "no odds data";};
    if (bestIndex2.length === 0) {bestSiteNice2 = "N/A"; bestT2 = "no odds data";};
    bestSitesArray1.push(bestSiteNice1);
    bestSitesArray2.push(bestSiteNice2);
    var bestPercentage1;
    var bestPercentage2;
    // handling to represent odds in a legible way depending on type
    switch(market){
      case ("h2h"): 
        bestPercentage1 = convertToProb(oddsFormat, bestT1);
        bestT1 = bestT1.toString();
        bestPercentage2 = convertToProb(oddsFormat, bestT2);
        bestT2 = bestT2.toString();
        break;
      case ("totals"):
        bestPercentage1 = convertToProb(oddsFormat, bestT1Arr[2]);
        bestT1 = bestT1Arr[0] + " " + bestT1Arr[1].toString() + ": " + bestT1Arr[2].toString();
        bestPercentage2 = convertToProb(oddsFormat, bestT2Arr[2]);
        bestT2 = bestT2Arr[0] + " " + bestT2Arr[1].toString() + ": " + bestT2Arr[2].toString();
        break;
      case ("spreads"):
        bestPercentage1 = convertToProb(oddsFormat, bestT1Arr[1]);
        bestT1 = bestT1Arr[0] + ", " + bestT1Arr[1];
        bestPercentage2 = convertToProb(oddsFormat, bestT2Arr[1]);
        bestT2 = bestT2Arr[0] + ", " + bestT2Arr[1];
        break;
      default:
        bestT1 = bestT1.toString();
        bestT2 = bestT2.toString();
        break;
    }
    var bestT1Key;
    var bestT2Key;
    bestIndex1.length !== 0 ? bestT1Key = data.data[i].sites[bestIndex1[0]].site_key : bestT1Key = "noKey"
    bestIndex2.length !== 0 ? bestT2Key = data.data[i].sites[bestIndex2[0]].site_key : bestT2Key = "noKey"
    if (filterCheck (team1, team2, filter)) output.push(createData (team1, bestT1, team2, bestT2, date, sitesArray, bestSiteNice1, bestSiteNice2, bestT1Key, bestT2Key, bestPercentage1, bestPercentage2));
  }
  return output;
}

/* check if bet operator / state combo is supported in operators.json */
function opStateCheck(key, state){
  var opData = (require('./operators.json'));
  if (opData.operators[key] === undefined || !opData.operators[key].include) return false;
  else if (opData.operators[key].states.length === 0){
    console.log("err no states in state table for: " + key);
    return false
  }
  else if (opData.operators[key].states.includes(state)){
    return true
  }
  return false
}


//check if row viable for adding to table according to team filter (supplied from parent component StateTable.js)
function filterCheck(team1, team2, filter){
  // remove whitespace and decapitalise then check for filter match on start of string
  var newFilt = filter.replace(/ /g,'').toLowerCase();
  var filtLength = newFilt.length;
  var newT1 = team1.replace(/ /g,'').toLowerCase().substring(0,filtLength);
  var newT2 = team2.replace(/ /g,'').toLowerCase().substring(0,filtLength);
  if (newT1 === newFilt || newT2 === newFilt) return true;
  //check for searches of non-starting word
  else {
    var teamsArr = team1.split(" ").concat(team2.split(" "));
    var output = false;
    for (var i = 0; i<teamsArr.length; i++){
      if (teamsArr[i].toLowerCase().substring(0,filtLength) === newFilt) output = true; 
    }
    return output;
  };
}

// convert odds to percentage probability given by that operator
function convertToProb (oddsFormat, odd){
  if (oddsFormat === "american"){
    if (odd > 0){
      var temp = 1+(odd/100);
      temp = Math.round(100-((temp-1)/(temp) * 100));
      return (temp + "%");}
    else {
      var temp = (1-(100/odd));
      temp = Math.round(100-((temp-1)/(temp) * 100));
      return (temp + "%");}
  }
  else if (oddsFormat === "decimal") {
    var temp = Math.round(100-((odd-1)/(odd) * 100));
    return (temp + "%");
  }
  else return ("Odd Format not supported");
}

export default function TableCustom(props) {
  const [data, setData] = React.useState(props.data);
  const [state, setState] = React.useState(props.state);
  const [market, setMarket] = React.useState(props.market);
  const [filter, setFilter] = React.useState(props.filter);
  const [oddsFormat, setOddsFormat] = React.useState(props.oddsFormat);
  
  /*update props on change */
  const updateProps = (newProps) => 
        {setMarket(newProps.market); 
        setData(newProps.data); 
        setState(newProps.state);
        setFilter(newProps.filter);
        setOddsFormat(newProps.oddsFormat);}

  React.useEffect(() => 
      updateProps(props),
      [props.state, props.data, props.market, props.filter]
    );
    if (!data.success) {
      console.log(data);
      return (<h2 >Error in fetching odds data, please contact mroskrow@moneylineschecker.com if the problem persists</h2>)}
  const rows = updateRows(data, market, state, filter, oddsFormat);
  
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow hover={true}>
            <TableCell />
            <TableCell align="left">Date of Fixture</TableCell>
            <TableCell align="center">Team 1</TableCell>
            <TableCell align="center">T1 Best Odds</TableCell>
            <TableCell align="center">Team 2</TableCell>
            <TableCell align="center">T2 Best Odds</TableCell>            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={uuidv4()} row={row} />
            
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}