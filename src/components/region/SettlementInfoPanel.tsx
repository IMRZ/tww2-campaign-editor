import React from 'react';
import {
  makeStyles,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { Transform, NotInterested, Equalizer, LocationCity, HomeWork } from '@material-ui/icons';
import RegionTransferDialog from './RegionTransferDialog';
import RegionAbandonDialog from './RegionAbandonDialog';
import RegionCorruptionDialog from './RegionCorruptionDialog';
import SettlementLevelDialog from './SettlementLevelDialog';
import SettlementEditDialog from './SettlementEditDialog';
import RegionForeignSlotCreate from './RegionForeignSlotCreate';
import { useQueryData } from '../../use/util';
import { useFaction } from '../../use/common';

import { IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { useStoreActions } from '../../store';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    overflowX: 'hidden',
  },
  toolbar: {
    padding: theme.spacing(0, 2),
  },
  title: {
    flex: 1,
  },
}));

const SettlementInfoPanel = (props: any) => {
  const classes = useStyles();

  const regions = useQueryData('get_regions_init', {});
  const region: any = Object.values(regions.data).find((r: any) => r.cqi === props.cqi);

  const regionOwners = useQueryData('get_regions', {});
  const owningFaction = regionOwners.data[region.key];
  const faction = useFaction(owningFaction);

  const [regionTransferOpen, setRegionTransferOpen] = React.useState(false);
  const [regionAbandonOpen, setRegionAbandonOpen] = React.useState(false);
  const [regionCorruptionOpen, setRegionCorruptionOpen] = React.useState(false);
  const [settlementLevelOpen, setSettlementLevelOpen] = React.useState(false);
  const [settlementEditOpen, setSettlementEditOpen] = React.useState(false);
  const [foreignSlotCreateOpen, setForeignSlotCreateOpen] = React.useState(false);

  const fields = [
    ['Name', `${region.name}, ${region.province.name}`],
    ['Faction', faction ? faction.name : '--'],
    ['Logical position settlement (x, y)', `${region.settlement.x}, ${region.settlement.y}`],
    ['CQI', region.cqi],
  ];

  const actions = [
    [<Transform />, 'Transfer region', () => setRegionTransferOpen(true)],
    [<NotInterested />, 'Abandon region', () => setRegionAbandonOpen(true)],
    [<Equalizer />, 'Set province corruption', () => setRegionCorruptionOpen(true)],
    [<LocationCity />, 'Set settlement level', () => setSettlementLevelOpen(true)],
    [<LocationCity />, 'Edit settlement', () => setSettlementEditOpen(true)],
    [<HomeWork />, 'Create undercity/pirate cove', () => setForeignSlotCreateOpen(true)],
  ] as any[];

  const setSelectedObject = useStoreActions((actions) => actions.game.setSelectedObject);

  return (
    <div className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <Typography className={classes.title}>Settlement</Typography>
        <IconButton edge="end" onClick={() => setSelectedObject(null)}>
          <Close />
        </IconButton>
      </Toolbar>

      <List dense>
        {fields.map(([label, value]) => (
          <ListItem key={label}>
            <ListItemText primary={label} secondary={value} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List subheader={<ListSubheader disableSticky>Actions</ListSubheader>}>
        {actions.map(([icon, label, action]) => (
          <ListItem key={label} button onClick={action}>
            <ListItemIcon>
              {icon}
            </ListItemIcon>
            <ListItemText primary={label} />
          </ListItem>
        ))}
      </List>

      <RegionTransferDialog
        open={regionTransferOpen}
        regionKey={region.key}
        factionKey={owningFaction}
        onClose={() => setRegionTransferOpen(false)}
      />
      <RegionAbandonDialog
        open={regionAbandonOpen}
        regionKey={region.key}
        onClose={() => setRegionAbandonOpen(false)}
      />
      <RegionCorruptionDialog
        open={regionCorruptionOpen}
        regionKey={region.key}
        onClose={() => setRegionCorruptionOpen(false)}
      />
      <SettlementLevelDialog
        open={settlementLevelOpen}
        regionKey={region.key}
        onClose={() => setSettlementLevelOpen(false)}
      />
      <SettlementEditDialog
        open={settlementEditOpen}
        regionKey={region.key}
        onClose={() => setSettlementEditOpen(false)}
      />
      <RegionForeignSlotCreate
        open={foreignSlotCreateOpen}
        regionCqi={region.cqi}
        onClose={() => setForeignSlotCreateOpen(false)}
      />
    </div>
  )
};

export default SettlementInfoPanel;

