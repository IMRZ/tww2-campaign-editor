import React from 'react';
import { TextField } from '@material-ui/core';
import { Autocomplete, createFilterOptions } from '@material-ui/lab';
import { Search } from '@material-ui/icons';

const filter = createFilterOptions<any>();

type FieldAutocompleteProps = {
  value: any;
  options: any[];
  onChange: (value: any) => void;
  inputLabel?: string;
  inputPlaceholder?: string;
  inputHelperText?: string;
};

const FieldAutocomplete = (props: FieldAutocompleteProps) => {
  return (
    <Autocomplete
      freeSolo
      selectOnFocus
      autoHighlight
      clearOnBlur
      value={props.value}
      options={props.options}
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
        } else if (newValue && newValue.inputValue) {
          props.onChange({ value: newValue.inputValue, label: newValue.inputValue });
        } else {
          props.onChange(newValue);
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={props.inputLabel}
          placeholder={props.inputPlaceholder}
          helperText={props.inputHelperText}
          InputProps={{
            ...params.InputProps,
            startAdornment: <Search />,
          }}

          variant="filled"
        />
      )}
    />
  );
};

export default FieldAutocomplete;
