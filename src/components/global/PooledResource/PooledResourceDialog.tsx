import React, { useState } from 'react';
import {
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
  Button,
  Typography,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Close, Search } from '@material-ui/icons';
import { useCommand } from './command';
import { useQueryData } from '../../../use/util';
import { useStoreState, useStoreActions } from '../../../store';

import factors from './factors.json';

const useStyles = makeStyles((theme) => ({
  close: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
}));

const TreasuryModifyDialog = () => {
  const classes = useStyles();

  const activeModal = useStoreState((state) => state.ui.activeModal);
  const closeActiveModal = useStoreActions((actions) => actions.ui.closeActiveModal);
  const [open, setOpen] = useState(false);

  const closeModal = () => setOpen(false);

  React.useEffect(() => {
    if (activeModal === 'pooled_resource') {
      setOpen(true);
    }
  }, [activeModal]);

  const factions = useQueryData('get_factions_init', {});
  const factionOptions = Object.values(factions.data).map((faction: any) => ({
    value: faction.key,
    label: faction.name,
  }));

  const [selectedFaction, setSelectedFaction] = React.useState(() => factionOptions[0]);
  const [selectedFactor, setSelectedFactor] = React.useState(() => Object.keys(factors)[1]);
  const [amount, setAmount] = React.useState(1);

  const { factionAddPooledResource } = useCommand();
  const onClickSubmit = () => {
    const args = {
      factionKey: selectedFaction.value,
      resource: 'emp_imperial_authority',
      factor: selectedFactor,
      amount: Number(amount),
    };

    factionAddPooledResource(args)
      .then((r: any) => console.log(r))
      .catch((e: any) => console.log(e));
  };

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={open}
      onClose={closeModal}
      onExited={() => closeActiveModal()}
    >
      <DialogTitle disableTypography>
        <Typography variant="h6">Modify pooled resource</Typography>
        <IconButton className={classes.close} onClick={closeModal}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">Imperial Authority</Typography>
          </Grid>
          <Grid item xs={4}>
            <Autocomplete
              selectOnFocus
              disableClearable
              autoHighlight
              value={selectedFaction}
              options={factionOptions}
              renderOption={(option) => option.label}
              getOptionSelected={(option, value) => option.value === value.value}
              getOptionLabel={(option: any) => option.label}
              onChange={(event, newValue: any) => setSelectedFaction(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Faction"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: <Search />,
                  }}
                  variant="filled"
                />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl variant="filled" fullWidth>
              <InputLabel>Factor</InputLabel>
              <Select
                value={selectedFactor}
                onChange={(e) => setSelectedFactor(e.target.value as any)}
                fullWidth
              >
                {Object.entries(factors).map(([key, label]) => (
                  <MenuItem key={key} value={key}>{label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <TextField
              label="Amount"
              type="number"
              variant="filled"
              value={amount}
              onChange={(e) => setAmount((e.target.value || '0') as any)}
            />
          </Grid>
          <Grid item xs={2}>
            <Button size="large" onClick={onClickSubmit}>Modify</Button>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TreasuryModifyDialog;
