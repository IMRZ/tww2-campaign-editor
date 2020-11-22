import React, { useState } from 'react';
import { useImmer } from 'use-immer';
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
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { useCommand } from '../../use/command';
import { useCampaignMap } from '../../use/common';
import { useQueryData } from '../../use/util';
import { useStoreState, useStoreActions } from '../../store';

import FieldAutocomplete from '../common/FieldAutocomplete';

import agentTypes from '../../data/agent_types.json';
import agentSubTypes from '../../data/agent_sub_types.json';

const agentTypeOptions = agentTypes
  .map((type) => ({ value: type, label: type }));
const agentSubTypeOptions = agentSubTypes
  .map((type) => ({ value: type, label: type }));

const useStyles = makeStyles((theme) => ({
  close: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
}));

const initialState = {
  factionKey: { value: 'wh_main_emp_empire', label: 'Reikland' },
  agentType: { value: 'champion', label: 'champion' },
  agentSubtype: { value: 'wh2_pro08_neu_felix', label: 'wh2_pro08_neu_felix' },
};

const HeroDialogCreate = () => {
  const classes = useStyles();

  const activeModal = useStoreState((state) => state.ui.activeModal);
  const data = useStoreState((state) => state.ui.activeModalData);
  const closeActiveModal = useStoreActions((actions) => actions.ui.closeActiveModal);
  const [open, setOpen] = useState(false);

  const closeModal = () => setOpen(false);

  React.useEffect(() => {
    if (activeModal === 'hero') {
      setOpen(true);
    }
  }, [activeModal]);

  const campaign = useCampaignMap();

  const [state, updateState] = useImmer(() => initialState);

  const factions = useQueryData('get_factions_init', {});
  const factionOptions = Object.values(factions.data)
    .map((faction: any) => ({ value: faction.key, label: faction.name }));

  const command = useCommand();
  const onClickCreate = () => {
    const { lat, lng } = data.latlng;
    const [y, x] = campaign.fromMapLatLng([lat, lng]).map((v) => Math.round(v));

    command.spawnAgentAtPosition({
      faction: state.factionKey.value,
      agentType: state.agentType.value,
      agentSubtype: state.agentSubtype.value,
      x: x,
      y: y,
    })
      .then((r: any) => console.log(r))
      .catch((e: any) => console.log(e));

    closeModal();
  };

  if (!data) return null;

  const { lat, lng } = data.latlng;
  const [y, x] = campaign.fromMapLatLng([lat, lng]).map((v) => Math.round(v));

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
          <Grid md={6} item>
            <TextField
              label="Logical position x"
              variant="filled"
              fullWidth
              value={x}
              InputLabelProps={{ shrink: true }}
              disabled
            />
          </Grid>
          <Grid md={6} item>
            <TextField
              label="Logical position y"
              variant="filled"
              fullWidth
              value={y}
              InputLabelProps={{ shrink: true }}
              disabled
            />
          </Grid>
          <Grid md={12} item>
            <FieldAutocomplete
              inputLabel="Faction"
              inputHelperText={`Key: "${state.factionKey ? state.factionKey.value : ''}"`}
              value={state.factionKey}
              options={factionOptions}
              onChange={(e) => {
                updateState((draft: any) => {
                  draft.factionKey = e ?? { value: '', label: '' };
                });
              }}
            />
          </Grid>
          <Grid md={12} item>
            <FieldAutocomplete
              inputLabel="Agent type"
              inputHelperText={`Key: "${state.agentType ? state.agentType.value : ''}"`}
              value={state.agentType}
              options={agentTypeOptions}
              onChange={(e) => {
                updateState((draft: any) => {
                  draft.agentType = e ?? { value: '', label: '' };
                });
              }}
            />
          </Grid>
          <Grid md={12} item>
            <FieldAutocomplete
              inputLabel="Agent subtype"
              inputHelperText={`Key: "${state.agentSubtype ? state.agentSubtype.value : ''}"`}
              value={state.agentSubtype}
              options={agentSubTypeOptions}
              onChange={(e) => {
                updateState((draft: any) => {
                  draft.agentSubtype = e ?? { value: '', label: '' };
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

export default HeroDialogCreate;
