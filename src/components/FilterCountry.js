import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function FilterCountry({ countries }) {
  return (
    <div style={{ width: 300 }}>
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={countries ? countries.map((option) => option.title) : null}
        renderInput={(params) => (
          <TextField
            {...params}
            label="freeSolo"
            margin="normal"
            variant="outlined"
          />
        )}
      />
    </div>
  );
}
