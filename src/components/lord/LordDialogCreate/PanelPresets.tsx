import React, { useState } from 'react';
import {
  makeStyles,
  TextField,
  Button,
  IconButton,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { useLocalStorage } from '@rehooks/local-storage';
import defaultPresets from './default-presets.json';

const useStyles = makeStyles((theme) => ({
  inputWrapper: {
    display: 'flex',
    flexDirection: 'row',
    padding: theme.spacing(1, 2)
  }
}));

const PanelPresets = (props: any) => {
  const classes = useStyles();

  const [presets, setPresets] = useLocalStorage<any[]>('presets', defaultPresets);

  const onClickSavePreset = () => {
    setPresets([...presets, { label: presetLabel, state: props.state }]);
    setPresetLabel('');
  };

  const onClickDelete = (index: number) => {
    const copyPresets = [...presets];
    copyPresets.splice(index, 1);
    setPresets(copyPresets);
  };

  const [presetLabel, setPresetLabel] = useState('');

  return (
    <div>
      <List subheader={<ListSubheader disableSticky>Presets</ListSubheader>}>
        {presets.map((preset, index) => (
          <ListItem key={index} button onClick={() => props.onClickPreset(preset.state)}>
            <ListItemText primary={preset.label} />
            <ListItemSecondaryAction>
              <IconButton onClick={() => onClickDelete(index)}>
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <div className={classes.inputWrapper}>
        <TextField
          label="Preset label"
          variant="standard"
          fullWidth
          value={presetLabel}
          onChange={(e) => setPresetLabel(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <Button
          onClick={onClickSavePreset}
          disabled={presetLabel.length === 0}
        >
          save
        </Button>
      </div>
    </div>
  );
};

export default PanelPresets;
