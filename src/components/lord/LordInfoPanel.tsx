import React, { useState } from 'react';
import {
  makeStyles,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@material-ui/core';
import { Delete, SettingsBackupRestore, ControlCamera, RotateLeft, AddBox } from '@material-ui/icons';
import { useCommand } from '../../use/command';

import LordDeleteDialog from './LordDeleteDialog';
import LordAddAncillaryDialog from './LordAddAncillaryDialog';

import { useFaction } from '../../use/common';
import { useQueryData } from '../../use/util';
import { useStoreActions } from '../../store';

const useStyles = makeStyles((theme) => ({
  root: {
    overflowX: 'hidden',
    '& > *': {
      marginBottom: theme.spacing(2),
    },
  }
}));

const LordInfoPanel = (props: any) => {
  const classes = useStyles();
  const command = useCommand();
  const setSelectedObject = useStoreActions((actions) => actions.game.setSelectedObject);

  const characters = useQueryData('get_active_characters', {});
  const lord: any = characters.data.find((char: any) => char.cqi === props.cqi);
  const faction = useFaction(lord?.faction);

  const [selectedDeleteCqi, setSelectedDeleteCqi] = useState<number | undefined>();
  const onClickDelete = () => setSelectedDeleteCqi(lord.cqi);
  const onCloseDelete = () => setSelectedDeleteCqi(undefined);

  const [selectedAddAncillaryCqi, setSelectedAddAncillaryCqi] = useState<number | undefined>();
  const onClickAddAncillary = () => setSelectedAddAncillaryCqi(lord.cqi);
  const onCloseAddAncillary = () => setSelectedAddAncillaryCqi(undefined);

  React.useEffect(() => {
    if (!lord) {
      setSelectedObject(null);
    }
  }, [lord, setSelectedObject]);

  if (!lord) {
    return null;
  }

  const onClickReplenish = () => {
    const args = { cqi: lord.cqi };
    command.replenishActionPoints(args)
      .then((r: any) => console.log(r))
      .catch((e: any) => console.log(e));
  };

  const onClickReset = () => {
    const args = { cqi: lord.cqi };
    command.forceResetSkills(args)
      .then((r: any) => console.log(r))
      .catch((e: any) => console.log(e));
  };

  const onClickCamera = () => {
    const args = { cqi: lord.cqi };
    command.setCameraPosition(args)
      .then((r: any) => console.log(r))
      .catch((e: any) => console.log(e));
  };

  const fields = [
    ['Name', `${lord.localisedForename} ${lord.localisedSurname}`],
    ['Faction', faction.name],
    ['Type/Subtype', `${lord.type}/${lord.subtype}`],
    ['Logical position (x, y)', `${lord.x}, ${lord.y}`],
    ['CQI', `${lord.cqi}`],
  ];

  const actions = [
    ['Kill character', <Delete />, onClickDelete],
    ['Replenish action points', <RotateLeft />, onClickReplenish],
    ['Reset skill points', <SettingsBackupRestore />, onClickReset],
    ['Set camera position', <ControlCamera />, onClickCamera],
    ['Add ancillary/item', <AddBox />, onClickAddAncillary],
  ] as [string, any, any][];

  return (
    <div className={classes.root}>
      <List dense subheader={<ListSubheader disableSticky>Lord</ListSubheader>}>
        {fields.map(([label, value]) => (
          <ListItem key={label}>
            <ListItemText primary={label} secondary={value} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List subheader={<ListSubheader disableSticky>Actions</ListSubheader>}>
        {actions.map(([label, icon, onClick]) => (
          <ListItem key={label} button onClick={onClick}>
            <ListItemIcon>
              {icon}
            </ListItemIcon>
            <ListItemText primary={label} />
          </ListItem>
        ))}
      </List>

      <LordDeleteDialog
        cqi={selectedDeleteCqi}
        onClose={onCloseDelete}
      />
      <LordAddAncillaryDialog
         cqi={selectedAddAncillaryCqi}
         onClose={onCloseAddAncillary}
      />
    </div>
  );
};

export default LordInfoPanel;
