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
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Close, Search } from '@material-ui/icons';
import { useQueryData } from '../../use/util';
import { useCommand } from '../../use/command';

const useStyles = makeStyles((theme) => ({
  close: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
}));

type RegionTransferDialogProps = {
  open: boolean;
  regionKey: string;
  factionKey: string;
  onClose: () => void;
};

const RegionTransferDialog = (props: RegionTransferDialogProps) => {
  const classes = useStyles();

  const factions = useQueryData('get_factions_init', {});
  const factionOptions = Object.values(factions.data)
    .map((faction: any) => ({ value: faction.key, label: faction.name }));

  const [selected, setSelected] = React.useState(factionOptions.find((v) => v.value === props.factionKey) ?? factionOptions[0]);

  const command = useCommand();

  const onSubmit = () => {
    props.onClose();
    command.transferRegionToFaction(props.regionKey, selected.value);
  };

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={props.open}
      onClose={props.onClose}
    >
      <DialogTitle disableTypography>
        <Typography variant="h6">Transfer region</Typography>
        <IconButton className={classes.close} onClick={props.onClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Autocomplete
          selectOnFocus
          disableClearable
          autoHighlight
          value={selected}
          options={factionOptions}
          renderOption={(option) => option.label}
          getOptionSelected={(option, value) => option.value === value.value}
          getOptionLabel={(option: any) => option.label}
          onChange={(event, newValue: any) => setSelected(newValue)}
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
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button onClick={onSubmit}>Transfer</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegionTransferDialog;
