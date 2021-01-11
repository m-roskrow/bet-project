import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import GridItem from "components/Grid/GridItem.js";
const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 100,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    whiteColor: {
      color: "white"
    }
  }));
  
  export default function OddsTypeSelect(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState("h2h");
    const oddsCode = React.useState(props.oddsCode);
    var menuOptions = [{value: "h2h"}, {value: "outrights"}, {value: "totals"}, {value: "spreads"}]
    if (oddsCode === 0) {
        menuOptions = [{value: "h2h"}, {value: "outrights"}, {value: "totals"}, {value: "spreads"}]
        console.log("Hi")
    }
    const handleChange = (event) => {
        setValue(event.target.value);
        props.onChange(event.target.value);
    };
    return (
        <div>
          
          <GridItem xs={3} sm={3} md={3} lg={3} xl ={3}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label" classes={{root: classes.whiteColor}} >Odds Type</InputLabel>
            <Select
              classes={{root: classes.whiteColor, icon: classes.whiteColor}}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={value}
              onChange={handleChange}
              options = {menuOptions}
            >
              {menuOptions.map((option) => (<MenuItem value = {option.value} key={option.value}>{option.value}</MenuItem>))}
            </Select>
          </FormControl>
          </GridItem>
          
        </div>
        );
}