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
import { PersonAdd, Delete, SettingsBackupRestore, ControlCamera, RotateLeft, AddBox, AddCircle } from '@material-ui/icons';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { useCommand } from '../../use/command';

import LordDialogAddUnit from './LordDialogAddUnit';
import LordDeleteDialog from './LordDeleteDialog';
import LordAddAncillaryDialog from './LordAddAncillaryDialog';
import CharacterAddTraitDialog from '../character/CharacterAddTraitDialog';
import CharacterAddExperienceDialog from '../character/CharacterAddExperienceDialog';

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

const LordInfoPanel = (props: any) => {
  const classes = useStyles();
  const command = useCommand();
  const setSelectedObject = useStoreActions((actions) => actions.game.setSelectedObject);

  const characters = useQueryData('get_active_characters', {});
  const lord: any = characters.data.find((char: any) => char.cqi === props.cqi);
  const faction = useFaction(lord?.faction);

  const [selecteAddCqi, setSelectedAddCqi] = useState<number | undefined>();
  const onClickAdd = () => setSelectedAddCqi(lord.cqi);
  const onCloseAdd = () => setSelectedAddCqi(undefined);

  const [selectedDeleteCqi, setSelectedDeleteCqi] = useState<number | undefined>();
  const onClickDelete = () => setSelectedDeleteCqi(lord.cqi);
  const onCloseDelete = () => setSelectedDeleteCqi(undefined);

  const [selectedAddAncillaryCqi, setSelectedAddAncillaryCqi] = useState<number | undefined>();
  const onClickAddAncillary = () => setSelectedAddAncillaryCqi(lord.cqi);
  const onCloseAddAncillary = () => setSelectedAddAncillaryCqi(undefined);

  const [selectedAddTraitCqi, setSelectedAddTraitCqi] = useState<number | undefined>();
  const onClickAddTrait = () => setSelectedAddTraitCqi(lord.cqi);
  const onCloseAddTrait = () => setSelectedAddTraitCqi(undefined);

  const [experienceCqi, setExperienceCqi] = useState<number | undefined>();
  const onClickAddExp = () => setExperienceCqi(lord.cqi);
  const onCloseAddExp = () => setExperienceCqi(undefined);

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
    ['Add experience', <KeyboardArrowUpIcon />, onClickAddExp],
    ['Add unit to army', <PersonAdd />, onClickAdd],
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
        <Typography className={classes.title}>Lord</Typography>
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

      <LordDialogAddUnit
        cqi={selecteAddCqi}
        onClose={onCloseAdd}
      />
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
      <CharacterAddExperienceDialog
        cqi={experienceCqi}
        onClose={onCloseAddExp}
      />
    </div>
  );
};

export default LordInfoPanel;
