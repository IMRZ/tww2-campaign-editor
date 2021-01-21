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
import ancillaries from '../../data/tables/vanilla/ancillaries.json';

const ancillaryOptions = Object.values(ancillaries)
  .map((ancillary: any) => ({
    label: ancillary.name,
    value: ancillary.key,
    group: ancillary.category,
  }))
  .sort((a, b) => a.group.localeCompare(b.group))

type LordAddAncillaryDialogProps = {
  cqi?: number;
  onClose: () => void;
};

const LordAddAncillaryDialog = (props: LordAddAncillaryDialogProps) => {
  const command = useCommand();

  const [ancillary, setAncillary] = React.useState(ancillaryOptions[0]);

  const onConfirm = () => {
    props.onClose();
    const args = {
      cqi: props.cqi,
      ancillaryKey: ancillary.value,
      forceEquip: true,
      suppressEventFeed: false,
    };
    command.forceAddAncillary(args)
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
      <DialogTitle>Add ancillary/item</DialogTitle>
      <DialogContent>
        <FieldAutocomplete
          inputLabel="Ancillary/item"
          inputHelperText={`Key: "${ancillary ? ancillary.value : ''}"`}
          value={ancillary}
          options={ancillaryOptions}
          groupBy={(option) => option.group}
          onChange={(v) => setAncillary(v)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button disabled={!ancillary} onClick={onConfirm}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};

export default LordAddAncillaryDialog;
