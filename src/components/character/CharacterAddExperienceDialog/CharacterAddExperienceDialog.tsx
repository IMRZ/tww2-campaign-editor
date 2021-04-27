import React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@material-ui/core';
import { useCommand } from './command';

type CharacterAddExperienceDialogProps = {
  cqi?: number;
  onClose: () => void;
};

const CharacterAddExperienceDialog = (props: CharacterAddExperienceDialogProps) => {
  const command = useCommand();

  const [points, setPoints] = React.useState('2000');

  const onConfirm = () => {
    props.onClose();
    const args = {
      cqi: `${props.cqi}`,
      points: ~~Number(points),
    };
    command.addAgentExperience(args)
      .then((r: any) => console.log(r))
      .catch((e: any) => console.log(e));
  };

  const onCancel = () => {
    props.onClose();
  };

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={!!props.cqi}
      onClose={props.onClose}

    >
      <DialogTitle>Add experience</DialogTitle>
      <DialogContent>
        <TextField
          label="Experience points"
          type="number"
          variant="filled"
          fullWidth
          value={points}
          onChange={(e) => setPoints(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onConfirm}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CharacterAddExperienceDialog;
