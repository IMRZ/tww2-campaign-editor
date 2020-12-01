import React, { useState } from 'react';
import { useImmer } from 'use-immer';
import {
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  FormControlLabel,
  TextField,
  Switch,
  Button,
  Typography,
  IconButton,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core';
import { Close, Delete } from '@material-ui/icons';
import { useCommand } from '../../use/command';
import { useCampaignMap } from '../../use/common';
import { useQueryData } from '../../use/util';
import { useStoreState, useStoreActions } from '../../store';

import FieldAutocomplete from '../common/FieldAutocomplete';
import UnitAutocomplete from './UnitAutocomplete/UnitAutocomplete';

import agentTypes from '../../data/tables/vanilla/agent_types.json';
import agentSubTypes from '../../data/tables/vanilla/agent_sub_types.json';
import names from '../../data/tables/vanilla/names.json';

const agentTypeOptions = agentTypes
  .map((type) => ({ value: type, label: type }));
const agentSubTypeOptions = agentSubTypes
  .map((type) => ({ value: type, label: type }));

const clanNameOptions = names
  .filter((name) => name.type === 'clan_name' && name.name !== ' ')
  .map((name) => ({ value: `names_name_${name.id}`, label: name.name, group: name.group }));
const foreNameOptions = names
  .filter((name) => name.type === 'forename' && name.name !== ' ')
  .map((name) => ({ value: `names_name_${name.id}`, label: name.name, group: name.group }));
const familyNameOptions = names
  .filter((name) => name.type === 'family_name' && name.name !== ' ')
  .map((name) => ({ value: `names_name_${name.id}`, label: name.name, group: name.group }));

const useStyles = makeStyles((theme) => ({
  switch: {
    display: 'flex',
    alignItems: 'center',
  },
  close: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
  col: {
    '& > *': {
      marginBottom: theme.spacing(2),
    },
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
  },
  fields: {
    flex: 0.5,
  },
  units: {
    flex: 0.5,
    paddingLeft: theme.spacing(2),
  },
  addUnit: {
    padding: theme.spacing(0, 2),
  },
}));

const initialState = {
  factionKey: { value: 'wh_main_emp_empire', label: 'Reikland' },
  regionKey: { value: 'wh_main_reikland_altdorf', label: 'Altdorf' },
  unitList: [
    { value: "wh_main_emp_inf_halberdiers", label: "Halberdiers" },
    { value: "wh_main_emp_inf_halberdiers", label: "Halberdiers" },
    { value: "wh_main_emp_inf_halberdiers", label: "Halberdiers" },
    { value: "wh_main_emp_inf_halberdiers", label: "Halberdiers" },
    { value: "wh2_dlc13_emp_inf_huntsmen_ror_0", label: "The White Wolves (Huntsmen)" },
    { value: "wh2_dlc13_emp_inf_huntsmen_ror_0", label: "The White Wolves (Huntsmen)" },
    { value: "wh2_dlc13_huntmarshall_veh_obsinite_gyrocopter_0", label: "Obsinite Gyrocopter" },
    { value: "wh2_dlc13_huntmarshall_veh_obsinite_gyrocopter_0", label: "Obsinite Gyrocopter" },
    { value: "wh_dlc04_emp_art_sunmaker_0", label: "The Sunmaker (Helstorm Rocket Battery)" },
    { value: "wh_dlc04_emp_art_sunmaker_0", label: "The Sunmaker (Helstorm Rocket Battery)" },
  ],
  agentType: { value: 'general', label: 'general' },
  agentSubtype: { value: 'wh2_dlc13_emp_cha_markus_wulfhart_0', label: 'wh2_dlc13_emp_cha_markus_wulfhart_0' },
  foreName: { value: 'names_name_2147343956', label: 'Markus' },
  clanName: { value: 'names_name_2147352711', label: 'Huntsmarshal' },
  familyName: { value: 'names_name_2147343965', label: 'Wolfhart' },
  makeFactionLeader: false,
};

const LordDialogCreate = () => {
  const classes = useStyles();

  const activeModal = useStoreState((state) => state.ui.activeModal);
  const data = useStoreState((state) => state.ui.activeModalData);
  const closeActiveModal = useStoreActions((actions) => actions.ui.closeActiveModal);
  const [open, setOpen] = useState(false);

  React.useEffect(() => {
    if (activeModal === 'lord') {
      setOpen(true);
    }
  }, [activeModal]);

  const campaign = useCampaignMap();

  const [state, updateState] = useImmer(() => initialState);

  const regions = useQueryData('get_regions_init', {});
  const regionOptions = Object.values(regions.data)
    .map((regions: any) => ({ value: regions.key, label: regions.name }));

  const factions = useQueryData('get_factions_init', {});
  const factionOptions = Object.values(factions.data)
    .map((faction: any) => ({ value: faction.key, label: faction.name }));

  const command = useCommand();
  const onClickCreate = () => {
    const { lat, lng } = data.latlng;
    const [y, x] = campaign.fromMapLatLng([lat, lng]).map((v) => Math.round(v));

    command
      .createForce({
        factionKey: state.factionKey.value,
        unitList: state.unitList.map((unit) => unit.value).join(','),
        regionKey: state.regionKey.value,
        agentType: state.agentType.value,
        agentSubtype: state.agentSubtype.value,
        foreName: state.foreName.value,
        clanName: state.clanName.value,
        familyName: state.familyName.value,
        makeFactionLeader: state.makeFactionLeader,
        x: x,
        y: y,
      })
      .then((r: any) => console.log(r))
      .catch((e: any) => console.log(e));
    setOpen(false); // TODO: common function
  };

  if (!data) return null;

  const { lat, lng } = data.latlng;
  const [y, x] = campaign.fromMapLatLng([lat, lng]).map((v) => Math.round(v));

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={open}
      onClose={() => setOpen(false)}
      onExited={() => closeActiveModal()}
    >
      <DialogTitle disableTypography>
        <Typography variant="h6">Create lord</Typography>
        <IconButton className={classes.close} onClick={() => setOpen(false)}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers className={classes.content}>
        <Grid container spacing={2} className={classes.fields}>
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
              inputLabel="Region"
              inputHelperText={`Key: "${state.regionKey ? state.regionKey.value : ''}"`}
              value={state.regionKey}
              options={regionOptions}
              onChange={(e) => {
                updateState((draft: any) => {
                  draft.regionKey = e ?? { value: '', label: '' };
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
              disabled
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

          <Grid md={12} item>
            <FieldAutocomplete
              inputLabel="Title"
              inputHelperText={`(Optional) Table lookup value: "${state.clanName ? state.clanName.value : ''}"`}
              value={state.clanName}
              options={clanNameOptions}
              groupBy={(option) => option.group}
              onChange={(e) => {
                updateState((draft: any) => {
                  draft.clanName = e ?? { value: '', label: '' };
                });
              }}
            />
          </Grid>
          <Grid md={12} item>
            <FieldAutocomplete
              inputLabel="Forename"
              inputHelperText={`Table lookup value: "${state.foreName ? state.foreName.value : ''}"`}
              value={state.foreName}
              options={foreNameOptions}
              groupBy={(option) => option.group}
              onChange={(e) => {
                updateState((draft: any) => {
                  draft.foreName = e ?? { value: '', label: '' };
                });
              }}
            />
          </Grid>
          <Grid md={12} item>
            <FieldAutocomplete
              inputLabel="Family name"
              inputHelperText={`Table lookup value: "${state.familyName ? state.familyName.value : ''}"`}
              value={state.familyName}
              options={familyNameOptions}
              groupBy={(option) => option.group}
              onChange={(e) => {
                updateState((draft: any) => {
                  draft.familyName = e ?? { value: '', label: '' };
                });
              }}
            />
          </Grid>

          <Grid md={12} item className={classes.switch}>
            <FormControlLabel
              label="Make faction leader"
              control={
                <Switch
                  color="primary"
                  name="makeFactionLeader"
                  checked={state.makeFactionLeader}
                  onChange={(e) => {
                    updateState((draft: any) => {
                      draft.makeFactionLeader = e.target.checked;
                    });
                  }}
                />
              }
            />
          </Grid>
        </Grid>

        <div className={classes.units}>
          <List
            dense
            subheader={
              <ListSubheader disableSticky>Units ({state.unitList.length}/19)</ListSubheader>
            }
          >
            {state.unitList.map((item, index) => (
              <ListItem key={index}>
                <ListItemText primary={item.label} secondary={item.value} />
                <ListItemSecondaryAction>
                  <IconButton
                    onClick={() => {
                      updateState((draft: any) => {
                        draft.unitList.splice(index, 1);
                      });
                    }}
                  >
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
          <div className={classes.addUnit}>
            <UnitAutocomplete
              onChange={(e) => {
                if (e && state.unitList.length < 19) {
                  updateState((draft: any) => {
                    draft.unitList.push(e);
                  });
                }
              }}
              disabled={state.unitList.length >= 19}
            />
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClickCreate}>Create</Button>
      </DialogActions>
    </Dialog>
  );
};

export default LordDialogCreate;
