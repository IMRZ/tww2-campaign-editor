import React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Switch,
} from '@material-ui/core';
import { useCommand } from './command';

type CharacterSetImmortalDialogProps = {
  cqi?: number;
  onClose: () => void;
};

const CharacterSetImmortalDialog = (props: CharacterSetImmortalDialogProps) => {
  const { setCharacterImmortality } = useCommand();

  const [isImmortal, setIsImmortal] = React.useState(true);

  const onConfirm = () => {
    props.onClose();
    const args = {
      cqi: props.cqi!,
      isImmortal: isImmortal,
    };
    setCharacterImmortality(args)
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
      <DialogTitle>Set immortality</DialogTitle>
      <DialogContent>
      <FormControlLabel
          label="Is immortal"
          control={
            <Switch
              color="primary"
              checked={isImmortal}
              onChange={(e) => {
                setIsImmortal(e.target.checked)
              }}
            />
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onConfirm}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CharacterSetImmortalDialog;
