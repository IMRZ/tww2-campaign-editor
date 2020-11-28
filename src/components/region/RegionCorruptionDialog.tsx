import React from 'react';
import { useImmer } from 'use-immer';
import {
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  Button,
  Slider,
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

type RegionCorruptionDialogProps = {
  open: boolean;
  regionKey: string;
  onClose: () => void;
};

const RegionCorruptionDialog = (props: RegionCorruptionDialogProps) => {
  const classes = useStyles();

  const [state, updateState] = useImmer({
    wh_main_religion_chaos: 0,
    wh_main_religion_undeath: 0,
    wh2_main_religion_skaven: 0,
    wh_main_religion_untainted: 100,
  });

  const command = useCommand();

  const onSubmit = () => {
    props.onClose();

    const args = {
      region: props.regionKey,
      args: Object.entries(state).reduce((accumulator, [key, value]) => {
        accumulator.push(key, value / 100);
        return accumulator;
      }, [] as any[]),
    };

    command.forceReligionFactors(args);
  };

  const total = Object.values(state).reduce((a, b) => a + b, 0);

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={props.open}
      onClose={props.onClose}
    >
      <DialogTitle disableTypography>
        <Typography variant="h6">Set province corruption</Typography>
        <IconButton className={classes.close} onClick={props.onClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Typography>THIS ONLY WORKS ON TURN ONE!</Typography>

        <Grid container>
          <Grid item xs={3}>
            <Typography gutterBottom>Chaos</Typography>
          </Grid>
          <Grid item xs={9}>
            <Slider
              valueLabelDisplay="auto"
              marks
              step={10}
              min={0}
              max={100}
              value={state.wh_main_religion_chaos}
              onChange={(e, newValue) => {
                updateState((draft: any) => {
                  draft.wh_main_religion_chaos = newValue;
                })
              }}
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={3}>
            <Typography gutterBottom>Skaven</Typography>
          </Grid>
          <Grid item xs={9}>
            <Slider
              valueLabelDisplay="auto"
              marks
              step={10}
              min={0}
              max={100}
              value={state.wh2_main_religion_skaven}
              onChange={(e, newValue) => {
                updateState((draft: any) => {
                  draft.wh2_main_religion_skaven = newValue;
                })
              }}
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={3}>
            <Typography gutterBottom>Undead</Typography>
          </Grid>
          <Grid item xs={9}>
            <Slider
              valueLabelDisplay="auto"
              marks
              step={10}
              min={0}
              max={100}
              value={state.wh_main_religion_undeath}
              onChange={(e, newValue) => {
                updateState((draft: any) => {
                  draft.wh_main_religion_undeath = newValue;
                })
              }}
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={3}>
            <Typography gutterBottom>Untainted</Typography>
          </Grid>
          <Grid item xs={9}>
            <Slider
              valueLabelDisplay="auto"
              marks
              step={10}
              min={0}
              max={100}
              value={state.wh_main_religion_untainted}
              onChange={(e, newValue) => {
                updateState((draft: any) => {
                  draft.wh_main_religion_untainted = newValue;
                })
              }}
            />
          </Grid>
        </Grid>

        {total !== 100 && <Typography>Total must be 100! Current total: {total}</Typography>}
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button onClick={onSubmit} disabled={total !== 100}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegionCorruptionDialog;
