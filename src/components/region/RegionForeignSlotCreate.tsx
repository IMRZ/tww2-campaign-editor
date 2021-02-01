import React from 'react';
import {
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  Button,
  TextField,
  Grid,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Close, Search } from '@material-ui/icons';
import { useQueryData } from '../../use/util';
import { useCommand } from '../../use/command';
import FieldAutocomplete from '../common/FieldAutocomplete';
import slotSets from '../../data/tables/vanilla/slot_sets.json';

const slotSetOptions = Object.values(slotSets).map((item) => ({ value: item, label: item }));

const useStyles = makeStyles((theme) => ({
  close: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
}));

type RegionTransferDialogProps = {
  open: boolean;
  regionCqi: string;
  onClose: () => void;
};

const RegionForeignSlotCreate = (props: RegionTransferDialogProps) => {
  const classes = useStyles();

  const factions = useQueryData('get_factions_init', {});
  const factionOptions = Object.values(factions.data).map((faction: any) => ({
    value: faction.cqi,
    label: faction.name,
  }));

  const [selectedFaction, setSelectedFaction] = React.useState(factionOptions[0]);
  const [selectedSlotSet, setSelectedSlotSet] = React.useState(slotSetOptions[0]);

  const command = useCommand();

  const onSubmit = () => {
    props.onClose();

    console.log({
      regionCqi: props.regionCqi,
      factionCqi: selectedFaction.value,
      slotSet: selectedSlotSet.value,
    });

    command.addForeignSlotSetToRegionForFaction({
      regionCqi: props.regionCqi,
      factionCqi: selectedFaction.value,
      slotSet: selectedSlotSet.value,
    });
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={props.open} onClose={props.onClose}>
      <DialogTitle disableTypography>
        <Typography variant="h6">Create undercity/pirate cove in region</Typography>
        <IconButton className={classes.close} onClick={props.onClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid md={12} item>
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
        <Grid container spacing={2}>
          <Grid md={12} item>
            <FieldAutocomplete
              inputLabel="Slot set"
              value={selectedSlotSet}
              options={slotSetOptions}
              onChange={(v) => setSelectedSlotSet(v)}
              disableClearable
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button onClick={onSubmit}>Create</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegionForeignSlotCreate;
