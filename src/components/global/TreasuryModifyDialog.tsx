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
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Close, Search } from '@material-ui/icons';
import { useCommand } from '../../use/command';
import { useQueryData } from '../../use/util';
import { useStoreState, useStoreActions } from '../../store';

const useStyles = makeStyles((theme) => ({
  close: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
}));

const HeroDialogCreate = () => {
  const classes = useStyles();

  const activeModal = useStoreState((state) => state.ui.activeModal);
  const closeActiveModal = useStoreActions((actions) => actions.ui.closeActiveModal);
  const [open, setOpen] = useState(false);

  const closeModal = () => setOpen(false);

  React.useEffect(() => {
    if (activeModal === 'treasury_mod') {
      setOpen(true);
    }
  }, [activeModal]);

  const factions = useQueryData('get_factions_init', {});
  const factionOptions = Object.values(factions.data).map((faction: any) => ({
    value: faction.key,
    label: faction.name,
  }));

  const [selectedFaction, setSelectedFaction] = React.useState(factionOptions[0]);
  const [amount, setAmount] = React.useState('100000');

  const command = useCommand();
  const onClickModify = () => {
    command.treasuryMod({
      faction: selectedFaction.value,
      amount: ~~Number(amount),
    });
    closeModal();
  };

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={closeModal}
      onExited={() => closeActiveModal()}
    >
      <DialogTitle disableTypography>
        <Typography variant="h6">Modify treasury by amount</Typography>
        <IconButton className={classes.close} onClick={closeModal}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12}>
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
          <Grid item xs={12}>
          <TextField
            label="Amount"
            type="number"
            variant="filled"
            fullWidth
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClickModify}>Modify</Button>
      </DialogActions>
    </Dialog>
  );
};

export default HeroDialogCreate;
