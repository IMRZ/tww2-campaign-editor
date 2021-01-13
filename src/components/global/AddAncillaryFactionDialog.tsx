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
import ancillaries from '../../data/tables/vanilla/ancillaries.json';

const ancillaryOptions = Object.values(ancillaries)
  .filter((ancillary: any) => ancillary.transferrable)
  .map((ancillary: any) => ({
    label: ancillary.name,
    value: ancillary.key,
    group: ancillary.category,
  }))
  .sort((a, b) => a.group.localeCompare(b.group))

const useStyles = makeStyles((theme) => ({
  close: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
}));

const AddAncillaryFactionDialog = () => {
  const classes = useStyles();

  const activeModal = useStoreState((state) => state.ui.activeModal);
  const closeActiveModal = useStoreActions((actions) => actions.ui.closeActiveModal);
  const [open, setOpen] = useState(false);

  const closeModal = () => setOpen(false);

  React.useEffect(() => {
    if (activeModal === 'add_ancillary_faction') {
      setOpen(true);
    }
  }, [activeModal]);

  const factions = useQueryData('get_factions_init', {});
  const factionOptions = Object.values(factions.data).map((faction: any) => ({
    value: faction.key,
    label: faction.name,
  }));

  const [selectedFaction, setSelectedFaction] = React.useState(factionOptions[0]);
  const [ancillary, setAncillary] = React.useState(ancillaryOptions[0]);

  const command = useCommand();
  const onClickModify = () => {
    command.addAncillaryToFaction({
      factionKey: selectedFaction.value,
      ancillaryKey: ancillary.value,
      suppressEventFeed: false,
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
        <Typography variant="h6">Add ancillary/item to faction</Typography>
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
            <Autocomplete
              selectOnFocus
              disableClearable
              autoHighlight
              value={ancillary}
              options={ancillaryOptions}
              groupBy={(option) => option.group}
              renderOption={(option) => option.label}
              getOptionSelected={(option, value) => option.value === value.value}
              getOptionLabel={(option: any) => option.label}
              onChange={(event, newValue: any) => setAncillary(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Ancillary"
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
        <Button onClick={onClickModify}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddAncillaryFactionDialog;
