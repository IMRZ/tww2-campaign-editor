import React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import FieldAutocomplete from '../common/FieldAutocomplete';
import { useCommand } from '../../use/command';
import character_traits from '../../data/tables/vanilla/character_traits.json';

const characterTraitOptions = character_traits.map((trait: any) => ({
  label: trait,
  value: trait,
}));

type CharacterAddTraitDialogProps = {
  cqi?: number;
  onClose: () => void;
};

const CharacterAddTraitDialog = (props: CharacterAddTraitDialogProps) => {
  const command = useCommand();

  const [trait, setTrait] = React.useState(characterTraitOptions[0]);

  const onConfirm = () => {
    props.onClose();
    const args = {
      cqi: props.cqi,
      trait: trait.value,
      traitPoints: 3,
    };
    command.forceAddTrait(args)
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
      <DialogTitle>Add trait</DialogTitle>
      <DialogContent>
        <FieldAutocomplete
          inputLabel="Trait"
          inputHelperText={`Key: "${trait ? trait.value : ''}"`}
          value={trait}
          options={characterTraitOptions}
          groupBy={(option) => option.group}
          disableClearable
          onChange={(v) => setTrait(v)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button disabled={!trait} onClick={onConfirm}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CharacterAddTraitDialog;
