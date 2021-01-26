import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function GameSearch(props) {
    const handleChange = (event) => {
        props.onChange(event.target.value);
      };
  return (
        
            <TextField id="filled-basic" label="Search" variant="filled" onChange={handleChange} />
        
  );
}