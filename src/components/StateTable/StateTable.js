import React, {useState} from 'react';
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
import useAxios from 'axios-hooks';
import TableCustom from './TableCustom.js'

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  
  
  
  export default function StateTable(props) {
    
    const classes = useStyles();
    const [apiLink, setApiLink] = React.useState(props.apiLink);
    const [value, setValue] = React.useState("CO");
    const [{ data, loading, error }, refetch] = useAxios(
      apiLink
    )
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error!</p>
    const handleChange = (event) => {
      setValue(event.target.value);
    };
    return (
        <div>
       <p>Please click the arrow to the left of the fixture you wish to view odds for.</p>
          
        <TableCustom data={data}></TableCustom>
        </div>
        );
}