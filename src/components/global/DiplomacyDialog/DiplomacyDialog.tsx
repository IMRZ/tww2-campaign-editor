import React, { useState } from 'react';
import {
  makeStyles,
  Dialog,
  DialogTitle,
  Typography,
  IconButton,
  Tabs,
  Tab
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { useStoreState, useStoreActions } from '../../../store';

import DiplomacyForce from './DiplomacyForce';
import DiplomacyEnable from './DiplomacyEnable';

const useStyles = makeStyles((theme) => ({
  close: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
}));

const DiplomacyDialog = () => {
  const classes = useStyles();

  const activeModal = useStoreState((state) => state.ui.activeModal);
  const closeActiveModal = useStoreActions((actions) => actions.ui.closeActiveModal);
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  const [tabIndex, setTabIndex] = React.useState(0);
  const onSelectTab = (e: any, index: number) => setTabIndex(index);

  React.useEffect(() => {
    if (activeModal === 'diplomacy') {
      setOpen(true);
    }
  }, [activeModal]);

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={closeModal}
      onExited={() => closeActiveModal()}
    >
      <DialogTitle disableTypography>
        <Typography variant="h6">Diplomacy</Typography>
        <IconButton className={classes.close} onClick={closeModal}>
          <Close />
        </IconButton>
      </DialogTitle>
      <Tabs variant="fullWidth" value={tabIndex} onChange={onSelectTab}>
        <Tab label="Force diplomacy" />
        <Tab label="Enable diplomacy" />
      </Tabs>
      {tabIndex === 0 && <DiplomacyForce closeModal={closeModal} />}
      {tabIndex === 1 && <DiplomacyEnable closeModal={closeModal} />}
    </Dialog>
  );
};

export default DiplomacyDialog;
