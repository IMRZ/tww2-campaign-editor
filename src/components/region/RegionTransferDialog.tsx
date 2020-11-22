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
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
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

  const [selected, setSelected] = React.useState(props.factionKey);

  React.useEffect(() => {
    setSelected(props.factionKey);
  }, [props.open, props.factionKey]);

  const factions = useQueryData('get_factions_init', {});
  const factionOptions = Object.values(factions.data)
    .map((faction: any) => ({ key: faction.key, name: faction.name }));

  const command = useCommand();

  const onSubmit = () => {
    props.onClose();
    command.transferRegionToFaction(props.regionKey, selected);
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
        <select value={selected} onChange={(e) => setSelected(e.target.value)}>
          {factionOptions.map((faction: any) => (
            <option
              key={faction.key}
              value={faction.key}
            >
              {faction.name}
            </option>
          ))}
        </select>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button onClick={onSubmit}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegionTransferDialog;
