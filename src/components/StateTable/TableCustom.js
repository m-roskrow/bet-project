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

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function createData(team1, team2, date, numSites, sites) {
  return {
    team1,
    team2,
    date,
    numSites,
    sites
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell >
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.team1}
        </TableCell>
        <TableCell align="left">{row.team2}</TableCell>
        <TableCell align="right">{row.date}</TableCell>
        <TableCell align="right">{row.numSites}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Sites and Odds
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Site</TableCell>
                    <TableCell align="right">{row.team1} Odds</TableCell>
                    <TableCell align="right">{row.team2} Odds</TableCell>
                    <TableCell align="right">Type</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.sites.map((sitesRow) => (
                    <TableRow key={sitesRow.site}>
                      <TableCell component="th" scope="row">
                        {sitesRow.site}
                      </TableCell>
                      <TableCell align="right">{sitesRow.odds1}</TableCell>
                      <TableCell align="right">{sitesRow.odds2}</TableCell>
                      <TableCell align="right">{sitesRow.type}</TableCell>
                      
                    </TableRow>
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
    team2: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    sites: PropTypes.arrayOf(
      PropTypes.shape({
        site: PropTypes.string.isRequired,
        odds1: PropTypes.string.isRequired,
        odds2: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
      }),
    ).isRequired,
    numSites: PropTypes.number.isRequired,
  }).isRequired,
};


/* EXPANDED ARROWS NOT WORKING, NEED TO UPDATE HOME TEAMS HANDLING AND NEED TO ADD OTHER ODD TYPE SUPPORT*/
/* TODO - add different odd types support
        - add proper home team support 
        - add proper date representation 
        - add number of odd types column
        - add odd sorting functionality for both ascending and descending / highlight best odds for each team*/
function updateRows(data, market) {
  
  const numGames = data[0].data.length;
  const output = [];
  for (var i = 0 ; i < numGames; i++){
    const homeTeam = data[0].data[i].home_team;
    var team1 = data[0].data[i].teams[0];
    var team2 = data[0].data[i].teams[1];
    if (team1 === homeTeam) team1 += " (H)";
    if (team2 === homeTeam) team2 += " (H)";
    const tempDate = data[0].data[i].commence_time;
    const date = tempDate.substring(0,10);
    const numSites = data[0].data[i].sites_count;
    
    const sitesArray = [];
    for (var j = 0; j < numSites; j++){
      const siteName = data[0].data[i].sites[j].site_nice;
      const oddsType = market;
      var oddsT1;
      var oddsT2;
      /* populate inner odds table - catching errors on odd fetching in case not available for that sport type*/
      switch(oddsType) {
        case ("h2h"):
          try {
            oddsT1 = data[0].data[i].sites[j].odds.h2h[0].toString();
            oddsT2 = data[0].data[i].sites[j].odds.h2h[1].toString();
          }
          catch(err) {
            oddsT1 = "unavailable";
            oddsT2 = "unavailable"
          }
          break;
        case ("totals"):
          try {
            oddsT1 = data[0].data[i].sites[j].odds.totals.position[0] + " " + data[0].data[i].sites[j].odds.totals.points[0].toString() + ", " +  data[0].data[i].sites[j].odds.totals.odds[0].toString();
            oddsT2 = data[0].data[i].sites[j].odds.totals.position[1] + " " + data[0].data[i].sites[j].odds.totals.points[1].toString() + ", " +  data[0].data[i].sites[j].odds.totals.odds[1].toString();
          }
          catch(err) {
            console.log(err);
            oddsT1 = "unavailable";
            oddsT2 = "unavailable"
          }
          break;
        case ("outrights"):
          try {
            oddsT1 = data[0].data[i].sites[j].odds.outrights[0].toString();
            oddsT2 = data[0].data[i].sites[j].odds.outrights[1].toString();
          }
          catch(err) {
            oddsT1 = "unavailable";
            oddsT2 = "unavailable"
          }
          break;
        case ("spreads"):
          try {
            oddsT1 = data[0].data[i].sites[j].odds.spreads.points[0].toString() + ", " + data[0].data[i].sites[j].odds.spreads.odds[0].toString();
            oddsT2 = data[0].data[i].sites[j].odds.spreads.points[1].toString() + ", " + data[0].data[i].sites[j].odds.spreads.odds[1].toString();
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
      
      
      const tempTime = data[0].data[i].sites[j].last_update;
      const updateTime = tempTime.substring(0, 10) + " " + tempTime.substring(11,19) + " GMT"
      sitesArray.push({site: siteName, odds1: oddsT1, odds2: oddsT2, type: oddsType});
    }
    output.push(createData (team1, team2, date, numSites, sitesArray))
  }
  
  return output;
}

export default function TableCustom(props) {
  const data = React.useState(props.data);
  const [market, setMarket] = React.useState(props.market);
  React.useEffect(() => 
      setMarket(props.market),
      [props.market]
    );
  const rows = updateRows(data, market);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="left">Team 1</TableCell>
            <TableCell align="left">Team 2</TableCell>
            <TableCell align="right">Date of Fixture</TableCell>
            <TableCell align="right">Number of Sites</TableCell>
            
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