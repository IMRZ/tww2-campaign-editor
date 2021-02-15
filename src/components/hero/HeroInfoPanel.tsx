import React, { useState } from 'react';
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
import { Delete, SettingsBackupRestore, ControlCamera, RotateLeft, AddBox, AddCircle } from '@material-ui/icons';
import { useCommand } from '../../use/command';

import LordDeleteDialog from '../lord/LordDeleteDialog';
import LordAddAncillaryDialog from '../lord/LordAddAncillaryDialog';
import CharacterAddTraitDialog from '../character/CharacterAddTraitDialog';

import { useFaction } from '../../use/common';
import { useQueryData } from '../../use/util';
import { useStoreActions } from '../../store';

import { IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';

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

const HeroInfoPanel = (props: any) => {
  const classes = useStyles();
  const command = useCommand();
  const setSelectedObject = useStoreActions((actions) => actions.game.setSelectedObject);

  const characters = useQueryData('get_active_characters', {});
  const hero: any = characters.data.find((char: any) => char.cqi === props.cqi);
  const faction = useFaction(hero?.faction);

  const [selectedDeleteCqi, setSelectedDeleteCqi] = useState<number | undefined>();
  const onClickDelete = () => setSelectedDeleteCqi(hero.cqi);
  const onCloseDelete = () => setSelectedDeleteCqi(undefined);

  const [selectedAddAncillaryCqi, setSelectedAddAncillaryCqi] = useState<number | undefined>();
  const onClickAddAncillary = () => setSelectedAddAncillaryCqi(hero.cqi);
  const onCloseAddAncillary = () => setSelectedAddAncillaryCqi(undefined);

  const [selectedAddTraitCqi, setSelectedAddTraitCqi] = useState<number | undefined>();
  const onClickAddTrait = () => setSelectedAddTraitCqi(hero.cqi);
  const onCloseAddTrait = () => setSelectedAddTraitCqi(undefined);

  React.useEffect(() => {
    if (!hero) {
      setSelectedObject(null);
    }
  }, [hero, setSelectedObject]);

  if (!hero) {
    return null;
  }

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
    ['Add ancillary/item', <AddBox />, onClickAddAncillary],
    ['Add trait', <AddCircle />, onClickAddTrait],
  ] as [string, any, any][];

  return (
    <div className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <Typography className={classes.title}>Hero</Typography>
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
      <CharacterAddTraitDialog
        cqi={selectedAddTraitCqi}
        onClose={onCloseAddTrait}
      />
    </div>
  );
};

export default HeroInfoPanel;
