import React from 'react';
import { TextField } from '@material-ui/core';
import { Autocomplete, createFilterOptions } from '@material-ui/lab';
import { Search } from '@material-ui/icons';

import { units } from '../../../data/tables';

const options = Object.entries(units).map(([value, label]) => ({ value, label }));
const filter = createFilterOptions<any>();

type FieldAutocompleteProps = {
  onChange: (value: any) => void;
  disabled: boolean;
};

const UnitAutocomplete = (props: FieldAutocompleteProps) => {
  const [value, setValue] = React.useState('');
  const [inputValue, setInputValue] = React.useState('');

  const clear = () => {
    setValue('');
    setInputValue('');
  };

  return (
    <Autocomplete
      freeSolo
      autoHighlight
      clearOnBlur
      disabled={props.disabled}
      value={value}
      inputValue={inputValue}
      options={options}
      renderOption={(option) => option.label}
      getOptionLabel={(option: any) => {
        if (typeof option === 'string') {
          return option;
        }
        if (option.inputValue) {
          return option.inputValue;
        }

        return option.label;
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

          if (params.inputValue !== '') {
            filtered.push({
              inputValue: params.inputValue,
              label: `Add "${params.inputValue}"`,
            });
          }

          return filtered;
      }}
      onChange={(event, newValue: any) => {
        if (typeof newValue === 'string') {
          props.onChange(newValue);
          clear();
        } else if (newValue && newValue.inputValue) {
          props.onChange({ value: newValue.inputValue, label: newValue.inputValue });
          clear();
        } else {
          props.onChange(newValue);
          clear();
        }
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Add unit"
          variant="filled"
          InputProps={{
            ...params.InputProps,
            startAdornment: <Search />,
          }}
        />
      )}
    />
  );
};

export default UnitAutocomplete;
