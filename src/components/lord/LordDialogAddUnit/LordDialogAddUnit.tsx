import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Button,
} from '@material-ui/core';
import { useCommand } from './command';
import FieldAutocomplete from '../../common/FieldAutocomplete';
import { landUnits } from '../../../data/tables';

type LordDialogAddUnitProps = {
  cqi?: number;
  onClose: () => void;
};

const LordDialogAddUnit = (props: LordDialogAddUnitProps) => {
  const { grantUnitToCharacter } = useCommand();

  const [unit, setUnit] = useState(() => ({ value: '', label: '' }));

  const onAdd = () => {
    const args = {
      cqi: String(props.cqi),
      unit: unit.value,
    };

    grantUnitToCharacter(args)
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
      <DialogTitle>Add unit to army</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={10}>
            <FieldAutocomplete
              inputLabel="Unit"
              inputHelperText={`Key: "${unit.value}"`}
              value={unit}
              options={landUnits}
              onChange={(e) => {
                setUnit(e ?? { value: '', label: '' });
              }}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Button size="large" onClick={onAdd}>Add</Button>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default LordDialogAddUnit;
