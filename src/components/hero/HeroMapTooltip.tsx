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

type HeroMapTooltipProps = {
  char: any;
  children: React.ReactElement;
};

const HeroMapTooltip = (props: HeroMapTooltipProps) => {
  const classes = useStyles();
  const { char } = props;

  const tooltip = (
    <Paper className={classes.tooltip}>
      <Typography variant="subtitle2">{`${char.localisedForename} ${char.localisedSurname}`}</Typography>
      <Typography variant="overline">Hero</Typography>
      <Typography variant="caption">Click on this icon for more details</Typography>
    </Paper>
  );

  return (
    <GlobalTooltipWrapper tooltip={tooltip}>
      {props.children}
    </GlobalTooltipWrapper>
  )
};

export default HeroMapTooltip;
