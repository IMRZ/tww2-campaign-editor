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
import { Delete, SettingsBackupRestore, ControlCamera, RotateLeft } from '@material-ui/icons';
import { useCommand } from '../../use/command';

import ArmyDeleteDialog from '../lord/LordDeleteDialog';
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

const HeroInfoPanel = (props: any) => {
  const classes = useStyles();
  const command = useCommand();
  const setSelectedObject = useStoreActions((actions) => actions.game.setSelectedObject);

  const characters = useQueryData('get_active_characters', {});
  const hero: any = characters.data.find((char: any) => char.cqi === props.cqi);
  const faction = useFaction(hero?.faction);

  const [selectedDeleteCqi, setSelectedDeleteCqi] = useState<number | undefined>();

  React.useEffect(() => {
    if (!hero) {
      setSelectedObject(null);
    }
  }, [hero, setSelectedObject]);

  if (!hero) {
    return null;
  }

  const onClickDelete = () => {
    setSelectedDeleteCqi(hero.cqi);
  };
  const onCloseDelete = () => {
    setSelectedDeleteCqi(undefined);
  };

  const onClickReplenish = () => {
    const args = { cqi: hero.cqi };
    command.replenishActionPoints(args)
      .then((r: any) => console.log(r))
      .catch((e: any) => console.log(e));
  };

  const onClickReset = () => {
    const args = { cqi: hero.cqi };
    command.forceResetSkills(args)
      .then((r: any) => console.log(r))
      .catch((e: any) => console.log(e));
  };

  const onClickCamera = () => {
    const args = { cqi: hero.cqi };
    command.setCameraPosition(args)
      .then((r: any) => console.log(r))
      .catch((e: any) => console.log(e));
  };

  const fields = [
    ['Name', `${hero.localisedForename} ${hero.localisedSurname}`],
    ['Faction', faction.name],
    ['Type/Subtype', `${hero.type}/${hero.subtype}`],
    ['Logical position (x, y)', `${hero.x}, ${hero.y}`],
    ['CQI', `${hero.cqi}`],
  ];

  const actions = [
    ['Kill character', <Delete />, onClickDelete],
    ['Replenish action points', <RotateLeft />, onClickReplenish],
    ['Reset skill points', <SettingsBackupRestore />, onClickReset],
    ['Set camera position', <ControlCamera />, onClickCamera],
  ] as [string, any, any][];

  return (
    <div className={classes.root}>
      <List dense subheader={<ListSubheader disableSticky>Hero</ListSubheader>}>
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

      <ArmyDeleteDialog
        cqi={selectedDeleteCqi}
        onClose={onCloseDelete}
      />
    </div>
  );
};

export default HeroInfoPanel;
