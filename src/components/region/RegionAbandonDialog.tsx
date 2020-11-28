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
import { useCommand } from '../../use/command';

const useStyles = makeStyles((theme) => ({
  close: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
}));

type RegionAbandonDialogProps = {
  open: boolean;
  regionKey: string;
  onClose: () => void;
};

const RegionAbandonDialog = (props: RegionAbandonDialogProps) => {
  const classes = useStyles();

  const command = useCommand();

  const onSubmit = () => {
    props.onClose();
    command.setRegionAbandoned(props.regionKey);
  };

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={props.open}
      onClose={props.onClose}
    >
      <DialogTitle disableTypography>
        <Typography variant="h6">Abandon region</Typography>
        <IconButton className={classes.close} onClick={props.onClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        Are you sure you want to abandon this region?
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button onClick={onSubmit}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegionAbandonDialog;
