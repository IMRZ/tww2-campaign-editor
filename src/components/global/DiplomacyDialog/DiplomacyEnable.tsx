import React, { useState } from 'react';
import { Grid, TextField, DialogContent, DialogActions, Button, Switch, FormControlLabel } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Search } from '@material-ui/icons';
import { useCommand } from '../../../use/command';
import { useQueryData } from '../../../use/util';

const DiplomacyForce = (props: any) => {
  const factions = useQueryData('get_factions_init', {});
  const factionOptions = Object.values(factions.data).map((faction: any) => ({
    value: faction.key,
    label: faction.name,
  }));

  factionOptions.unshift({
    value: 'all',
    label: 'All',
  });

  const [enabled, setEnabled] = useState(false);
  const [proposingFaction, setProposingFaction] = useState(factionOptions[0]);
  const [targetFaction, setTargetFaction] = useState(factionOptions[0]);

  const command = useCommand();
  const onClickSubmit = () => {
    command.enableAllDiplomacy({
      source: proposingFaction.value === 'all' ? 'all' : `faction:${proposingFaction.value}`,
      target: targetFaction.value === 'all' ? 'all' : `faction:${proposingFaction.value}`,
      enable: enabled,
    });
    props.closeModal();
  };

  return (
    <>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControlLabel
              label="Enabled"
              control={
                <Switch
                  color="primary"
                  checked={enabled}
                  onChange={(e) => setEnabled(e.target.checked)}
                />
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              selectOnFocus
              disableClearable
              autoHighlight
              value={proposingFaction}
              options={factionOptions}
              renderOption={(option) => option.label}
              getOptionSelected={(option, value) => option.value === value.value}
              getOptionLabel={(option: any) => option.label}
              onChange={(event, newValue: any) => setProposingFaction(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Proposing faction"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: <Search />,
                  }}
                  variant="filled"
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              selectOnFocus
              disableClearable
              autoHighlight
              value={targetFaction}
              options={factionOptions}
              renderOption={(option) => option.label}
              getOptionSelected={(option, value) => option.value === value.value}
              getOptionLabel={(option: any) => option.label}
              onChange={(event, newValue: any) => setTargetFaction(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Target faction"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: <Search />,
                  }}
                  variant="filled"
                />
              )}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClickSubmit}>Submit</Button>
      </DialogActions>
    </>
  );
};

export default DiplomacyForce;
