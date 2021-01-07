import React from 'react';
import { makeStyles, Typography, Paper } from '@material-ui/core';
import GlobalTooltipWrapper from '../tooltip/GlobalTooltipWrapper';

const useStyles = makeStyles((theme) => ({
  tooltip: {
    maxWidth: 500,
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
  },
}));

type SettlementMapTooltipProps = {
  region: any;
  children: React.ReactElement;
};

const SettlementMapTooltip = (props: SettlementMapTooltipProps) => {
  const classes = useStyles();
  const { region } = props;

  const tooltip = (
    <Paper className={classes.tooltip}>
      <Typography variant="subtitle2">{`${region.name}, ${region.province.name}`}</Typography>
      <Typography variant="overline">Settlement</Typography>
      <Typography variant="caption">Click on this icon for more details</Typography>
    </Paper>
  );

  return (
    <GlobalTooltipWrapper tooltip={tooltip}>
      {props.children}
    </GlobalTooltipWrapper>
  )
};

export default SettlementMapTooltip;
