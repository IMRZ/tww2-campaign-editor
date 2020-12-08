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
  Select,
  MenuItem,
  Grid,
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

type SettlementLevelDialogProps = {
  open: boolean;
  regionKey: string;
  onClose: () => void;
};

const SettlementLevelDialog = (props: SettlementLevelDialogProps) => {
  const classes = useStyles();

  const [level, setLevel] = React.useState(5);

  const command = useCommand();

  const onSubmit = () => {
    props.onClose();

    command.setSettlementLevel({
      region: props.regionKey,
      level,
    });
  };

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={props.open}
      onClose={props.onClose}
    >
      <DialogTitle disableTypography>
        <Typography variant="h6">Set settlement level</Typography>
        <IconButton className={classes.close} onClick={props.onClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container>
          <Grid item xs={12}>
            <Select fullWidth value={level} onChange={(e) => setLevel(e.target.value as number)}>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button onClick={onSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SettlementLevelDialog;
