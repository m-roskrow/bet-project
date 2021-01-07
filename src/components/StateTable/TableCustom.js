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

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function createData(homeTeam, awayTeam, date, numSites, sites) {
  return {
    homeTeam,
    awayTeam,
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
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.homeTeam}
        </TableCell>
        <TableCell align="left">{row.awayTeam}</TableCell>
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
                    <TableCell align="right">Odds</TableCell>
                    <TableCell align="right">Type</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.sites.map((sitesRow) => (
                    <TableRow key={sitesRow.site}>
                      <TableCell component="th" scope="row">
                        {sitesRow.site}
                      </TableCell>
                      <TableCell align="right">{sitesRow.odds}</TableCell>
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
    homeTeam: PropTypes.string.isRequired,
    awayTeam: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    sites: PropTypes.arrayOf(
      PropTypes.shape({
        site: PropTypes.string.isRequired,
        odds: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
      }),
    ).isRequired,
    numSites: PropTypes.number.isRequired,
  }).isRequired,
};


/* EXPANDED ARROWS NOT WORKING, NEED TO UPDATE HOME TEAMS HANDLING AND NEED TO ADD OTHER ODD TYPE SUPPORT*/
function updateRows(data) {
  
  const numGames = data[0].data.length;
  console.log(numGames);
  const output = new Array;
  for (var i = 0 ; i < numGames; i++){
    const homeTeam = data[0].data[i].home_team;
    const awayTeam = data[0].data[i].teams[1];
    const date = data[0].data[i].commence_time;
    const numSites = data[0].data[i].sites.length;
    const sitesArray = new Array;
    for (var j = 0; j < numSites; j++){
      const siteName = data[0].data[i].sites[j].site_nice;
      const odds = data[0].data[i].sites[j].odds.h2h[0] + "-" + data[0].data[i].sites[j].odds.h2h[1]
      const oddsType = "h2h"
      sitesArray.push([siteName, odds, oddsType])
    }
    output.push(createData (homeTeam, awayTeam, date, numSites, sitesArray))
  }
  
  return output;
}

export default function TableCustom(props) {
  const data = React.useState(props.data);
  const rows = updateRows(data);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="left">Home Team</TableCell>
            <TableCell align="left">Away Team</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Number of Sites</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.homeTeam} row={row} />
            
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}