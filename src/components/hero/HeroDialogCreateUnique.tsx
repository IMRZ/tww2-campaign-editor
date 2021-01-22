import React, { useState } from 'react';
import { useImmer } from 'use-immer';
import {
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Button,
  Typography,
  IconButton,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { useCommand } from '../../use/command';
import { useQueryData } from '../../use/util';
import { useStoreState, useStoreActions } from '../../store';
import FieldAutocomplete from '../common/FieldAutocomplete';

import uniqueAgents from '../../data/tables/vanilla/unique_agents.json';

const uniqueAgentsOptions = uniqueAgents
  .map((type) => ({ value: type, label: type }));

const useStyles = makeStyles((theme) => ({
  close: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
}));

const HeroDialogCreateUnique = () => {
  const classes = useStyles();

  const activeModal = useStoreState((state) => state.ui.activeModal);
  const data = useStoreState((state) => state.ui.activeModalData);
  const closeActiveModal = useStoreActions((actions) => actions.ui.closeActiveModal);
  const [open, setOpen] = useState(false);

  const closeModal = () => setOpen(false);

  React.useEffect(() => {
    if (activeModal === 'hero-unique') {
      setOpen(true);
    }
  }, [activeModal]);

  const factions = useQueryData('get_factions_init', {});
  const factionOptions = Object.values(factions.data)
    .map((faction: any) => ({ value: faction.cqi, label: faction.name }));

  const [state, updateState] = useImmer(() => ({
    factionCqi: factionOptions[0],
    agentKey: { value: 'wh2_dlc16_wef_coeddil', label: 'wh2_dlc16_wef_coeddil' },
  }));

  const command = useCommand();
  const onClickCreate = () => {
    command.spawnUniqueAgent({
      factionCqi: state.factionCqi.value,
      agentKey: state.agentKey.value,
    })
      .then((r: any) => console.log(r))
      .catch((e: any) => console.log(e));

    closeModal();
  };

  if (!data) return null;

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={closeModal}
      onExited={() => closeActiveModal()}
    >
      <DialogTitle disableTypography>
        <Typography variant="h6">Create hero</Typography>
        <IconButton className={classes.close} onClick={closeModal}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid md={12} item>
            <FieldAutocomplete
              inputLabel="Faction"
              inputHelperText={`CQI: "${state.factionCqi ? state.factionCqi.value : ''}"`}
              value={state.factionCqi}
              options={factionOptions}
              onChange={(e) => {
                updateState((draft: any) => {
                  draft.factionCqi = e ?? { value: '', label: '' };
                });
              }}
            />
          </Grid>
          <Grid md={12} item>
            <FieldAutocomplete
              inputLabel="Agent type"
              inputHelperText={`Key: "${state.agentKey ? state.agentKey.value : ''}"`}
              value={state.agentKey}
              options={uniqueAgentsOptions}
              onChange={(e) => {
                updateState((draft: any) => {
                  draft.agentKey = e ?? { value: '', label: '' };
                });
              }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClickCreate}>Create</Button>
      </DialogActions>
    </Dialog>
  );
};

export default HeroDialogCreateUnique;
