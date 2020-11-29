import React, { useState } from 'react';
import {
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
  Button,
  Typography,
  IconButton,
  Select,
  MenuItem,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Close, Search } from '@material-ui/icons';
import { useCommand } from '../../use/command';
import { useQueryData } from '../../use/util';
import { useStoreState, useStoreActions } from '../../store';

const useStyles = makeStyles((theme) => ({
  close: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
}));

const DiplomacyDialog = () => {
  const classes = useStyles();

  const activeModal = useStoreState((state) => state.ui.activeModal);
  const closeActiveModal = useStoreActions((actions) => actions.ui.closeActiveModal);
  const [open, setOpen] = useState(false);

  const closeModal = () => setOpen(false);

  React.useEffect(() => {
    if (activeModal === 'diplomacy') {
      setOpen(true);
    }
  }, [activeModal]);

  const factions = useQueryData('get_factions_init', {});
  const factionOptions = Object.values(factions.data).map((faction: any) => ({
    value: faction.key,
    label: faction.name,
  }));

  const [selectedAction, setSelectedAction] = React.useState(0);
  const [proposingFaction, setProposingFaction] = React.useState(factionOptions[0]);
  const [targetFaction, setTargetFaction] = React.useState(factionOptions[1]);

  const diplomacyOptions = [
    ['Force make peace', (proposingFaction, targetFaction) => command.forceMakePeace({ proposingFaction, targetFaction })],
    ['Force declare war', (proposingFaction, targetFaction) => command.forceDeclareWar({ proposingFaction, targetFaction })],
    ['Force defensive alliance', (proposingFaction, targetFaction) => command.forceAlliance({ proposingFaction, targetFaction, militaryAlliance: false })],
    ['Force military alliance', (proposingFaction, targetFaction) => command.forceAlliance({ proposingFaction, targetFaction, militaryAlliance: true })],
    ['Force make vassal', (proposingFaction, targetFaction) => command.forceMakeVassal({ proposingFaction, targetFaction })],
    ['Force grant military access', (proposingFaction, targetFaction) => command.forceGrantMilitaryAccess({ proposingFaction, targetFaction })],
    ['Force make trade agreement', (proposingFaction, targetFaction) => command.forceMakeTradeAgreement({ proposingFaction, targetFaction })],
    ['Force confederation', (proposingFaction, targetFaction) => command.forceConfederation({ proposingFaction, targetFaction })],
  ] as [string, (a: string, b: string) => void][];

  const command = useCommand();
  const onClickModify = () => {
    const action = diplomacyOptions[selectedAction][1];
    action(proposingFaction.value, targetFaction.value);
    closeModal();
  };

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={closeModal}
      onExited={() => closeActiveModal()}
    >
      <DialogTitle disableTypography>
        <Typography variant="h6">Diplomacy</Typography>
        <IconButton className={classes.close} onClick={closeModal}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Select
              value={selectedAction}
              onChange={(e) => setSelectedAction(e.target.value as number)}
            >
              {diplomacyOptions.map(([label, fn], index) => (
                <MenuItem key={index} value={index}>{label}</MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              selectOnFocus
              disableClearable
              autoHighlight
              value={proposingFaction}
              options={factionOptions}
              renderOption={(option) => option.label}
              getOptionSelected={(option, value) => option.value === value.value}
              getOptionLabel={(option: any) => option.label}
              onChange={(event, newValue: any) => setProposingFaction(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Proposing faction"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: <Search />,
                  }}
                  variant="filled"
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              selectOnFocus
              disableClearable
              autoHighlight
              value={targetFaction}
              options={factionOptions}
              renderOption={(option) => option.label}
              getOptionSelected={(option, value) => option.value === value.value}
              getOptionLabel={(option: any) => option.label}
              onChange={(event, newValue: any) => setTargetFaction(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Target faction"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: <Search />,
                  }}
                  variant="filled"
                />
              )}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClickModify}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DiplomacyDialog;
