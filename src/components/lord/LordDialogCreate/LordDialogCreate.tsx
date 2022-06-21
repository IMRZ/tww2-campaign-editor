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
import { Close } from '@material-ui/icons';
import { useCommand } from '../../../use/command';
import { useCampaignMap } from '../../../use/common';
import { useQueryData } from '../../../use/util';
import { useStoreState, useStoreActions } from '../../../store';

import FieldAutocomplete from '../../common/FieldAutocomplete';
import UnitAutocomplete from '../UnitAutocomplete/UnitAutocomplete';

// import agentTypes from '../../../data/tables/vanilla/agent_types.json';
import agentSubTypes from '../../../data/tables/vanilla/agent_subtypes.json';
import names from '../../../data/tables/vanilla/names.json';

// import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import PanelPresets from './PanelPresets';
import { useLocalStorage } from '@rehooks/local-storage';
import defaultPresets from './default-presets.json';

// const agentTypeOptions = agentTypes.map((type) => ({ value: type, label: type }));
const agentSubTypeOptions = agentSubTypes.map((type) => ({ value: type, label: type }));

const clanNameOptions = names
  .filter((name) => name.type === 'clan_name' && name.name !== ' ')
  .map((name) => ({ value: `names_name_${name.id}`, label: name.name, group: name.group }))
  .sort((a: any, b: any) => a.group.localeCompare(b.group));
const foreNameOptions = names
  .filter((name) => name.type === 'forename' && name.name !== ' ')
  .map((name) => ({ value: `names_name_${name.id}`, label: name.name, group: name.group }))
  .sort((a: any, b: any) => a.group.localeCompare(b.group));
const familyNameOptions = names
  .filter((name) => name.type === 'family_name' && name.name !== ' ')
  .map((name) => ({ value: `names_name_${name.id}`, label: name.name, group: name.group }))
  .sort((a: any, b: any) => a.group.localeCompare(b.group));

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

  dialogPaper: {
    minHeight: '90vh',
    maxHeight: '90vh',
  },

  content: {
    position: 'relative',
    height: '100%',
    padding: theme.spacing(1),
    overflow: 'hidden',
  },

  aside: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: '25%',
  },

  container: {
    flex: 1,
    padding: theme.spacing(2),
  },

  fields: {
    flex: 1,
  },
  units: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },

  unitList: {
    flex: 1,
  },

  addUnit: {
    padding: theme.spacing(2, 2),
  },
  presets: {
    flex: 1,
  },
  scroller: {
    height: '100%',
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      width: 6,
      backgroundColor: 'rgba(0, 0, 0, 0.12)',
      // backgroundColor: 'transparent',
    },
    '&::-webkit-scrollbar-thumb:vertical': {
      width: 6,
      backgroundColor: 'rgba(0, 0, 0, 0.12)',
    },
  },

  form: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: '25%',
  },

  cont2: {
    display: 'flex',
    flexDirection: 'row',
  }
}));

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

  const [presets] = useLocalStorage<any[]>('presets', defaultPresets);
  const [state, updateState] = useImmer(() => presets[0].state);

  const regions = useQueryData('get_regions_init', {});
  const regionOptions = Object.values(regions.data).map((regions: any) => ({
    value: regions.key,
    label: regions.name,
  }));

  const factions = useQueryData('get_factions_init', {});
  const factionOptions = Object.values(factions.data).map((faction: any) => ({
    value: faction.key,
    label: faction.name,
  }));

  const command = useCommand();
  const onClickCreate = () => {
    const { lat, lng } = data.latlng;
    const [y, x] = campaign.fromMapLatLng([lat, lng]).map((v) => Math.round(v));

    command
      .createForce({
        factionKey: state.factionKey.value,
        unitList: state.unitList.map((unit: any) => unit.value).join(','),
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

  const fields = (
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
      {/* <Grid md={4} item>
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
      </Grid> */}
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
          inputHelperText={`(Optional) Table lookup value: "${
            state.clanName ? state.clanName.value : ''
          }"`}
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
          inputHelperText={`Table lookup value: "${
            state.familyName ? state.familyName.value : ''
          }"`}
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
  );

  const formUnits = (
    <div className={classes.units}>
      <List
        dense
        subheader={
          <ListSubheader disableSticky>Units ({state.unitList.length}/19)</ListSubheader>
        }
      >
        {state.unitList.map((item: any, index: number) => (
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
                <Close />
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
  );

  return (
    <Dialog
      fullWidth
      maxWidth="lg"
      open={open}
      onClose={() => setOpen(false)}
      onExited={() => closeActiveModal()}
      classes={{ paper: classes.dialogPaper }}
    >
      <DialogTitle disableTypography>
        <Typography variant="h6">Create lord</Typography>
        <IconButton className={classes.close} onClick={() => setOpen(false)}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers className={classes.content}>
        {/* <FormProvider {...form}></FormProvider> */}

        <div className={classes.aside}>
          <div className={classes.scroller}>
            <PanelPresets
              state={state}
              onClickPreset={(state: any) => updateState((draft) => {
                return {...draft, ...state};
              })}
            />
          </div>
        </div>

        <div className={classes.form}>
          <div className={classes.scroller}>
            <div className={classes.cont2}>
              <div className={classes.container}>{fields}</div>
              {formUnits}
            </div>
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
