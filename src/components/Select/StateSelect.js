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
  
  export default function SimpleSelect(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState("NJ");
  
    const handleChange = (event) => {
      setValue(event.target.value);
      props.onChange(event.target.value);
    };
    return (
        <div>
          <GridItem xs={3} sm={3} md={3} lg={3} xl ={3}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label" classes={{root: classes.whiteColor}} >State</InputLabel>
            <Select
              classes={{root: classes.whiteColor, icon: classes.whiteColor}}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={value}
              onChange={handleChange}
            >
              <MenuItem value={"NJ"}>New Jersey</MenuItem>
              <MenuItem value={"PA"}>Pennsylvania</MenuItem>
              <MenuItem value={"CO"}>Colorado</MenuItem>
              <MenuItem value={"IL"}>Illinois</MenuItem>
              <MenuItem value={"IA"}>Iowa</MenuItem>
              <MenuItem value={"WV"}>West Virginia</MenuItem>
              <MenuItem value={"IN"}>Indiana</MenuItem>
              <MenuItem value={"TN"}>Tennessee</MenuItem>
            </Select>
          </FormControl>
          </GridItem>
        </div>
        );
}