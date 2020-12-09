import React from 'react';
import {
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  Button,
  List,
  ListItem,
  ListItemText,
  Link,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { useCommand } from '../../use/command';

import FieldAutocomplete from '../common/FieldAutocomplete';
import buildingLevels from '../../data/tables/vanilla/building_levels.json';

const buildings = buildingLevels.map((item) => ({ value: item, label: item }));

const useStyles = makeStyles((theme) => ({
  close: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
}));

type SettlementLevelDialogProps = {
  open: boolean;
  regionKey: string;
  onClose: () => void;
};

const SettlementEditDialog = (props: SettlementLevelDialogProps) => {
  const classes = useStyles();

  const onSubmit = () => {
    props.onClose();
  };

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={props.open}
      onClose={props.onClose}
    >
      <DialogTitle disableTypography>
        <Typography variant="h6">Edit settlement</Typography>
        <IconButton className={classes.close} onClick={props.onClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Typography>Full list of building levels available <Link rel="noopener noreferrer" target="_blank" href="https://github.com/IMRZ/tww2-campaign-editor/blob/main/src/data/tables/vanilla/building_levels.json">here</Link></Typography>
        <Content region={props.regionKey} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onSubmit}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
};

const Content = React.memo((props: any) => {
  const command = useCommand();

  const [slots, setSlots] = React.useState<any[]>([]);

  React.useEffect(() => {
    command.getSettlementSlots({ region: props.region }).then((r: any) => {
      setSlots(r.result.map((it: any) => ({ type: it.type, building: it.building ?? null })));
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onChange = (e: any, index: number) => {
    const args = {
      region: props.region,
      index,
      building: e?.value ?? null,
    };

    command.setSettlementSlot(args).then(() => {
      command.getSettlementSlots({ region: props.region })
        .then((r: any) => {
          setSlots(r.result.map((it: any) => ({ type: it.type, building: it.building ?? null })));
        })
        .catch((e: any) => {
          console.log(e)
        });
    });
  };

  return (
    <List>
      {slots.map((slot: any, index: number) => (
        <ListItem key={index}>
          <ListItemText
            primary={index + 1}
            secondary={slot.type}
          />
          <div style={{ width: '80%' }}>
            <FieldAutocomplete
              inputLabel="Building"
              value={slot.building ? { value: slot.building, label: slot.building } : null}
              options={buildings}
              onChange={(e) => onChange(e, index)}
              limit={100}
            />
          </div>
        </ListItem>
      ))}
    </List>
  );
});

export default SettlementEditDialog;
