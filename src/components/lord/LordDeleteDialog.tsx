import React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import { useCommand } from '../../use/command';

type LordDeleteDialogProps = {
  cqi?: number;
  onClose: () => void;
};

const LordDeleteDialog = (props: LordDeleteDialogProps) => {
  const { killCharacter } = useCommand();

  const onConfirm = () => {
    props.onClose();
    const args = { cqi: props.cqi };
    killCharacter(args)
      .then((r: any) => console.log(r))
      .catch((e: any) => console.log(e));
  };

  const onCancel = () => {
    props.onClose();
  };

  return (
    <Dialog
      open={!!props.cqi}
      onClose={props.onClose}
    >
      <DialogTitle>Kill character/army?</DialogTitle>
      <DialogContent>
        Are you sure you want to kill this character/army?
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onConfirm}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};

export default LordDeleteDialog;
