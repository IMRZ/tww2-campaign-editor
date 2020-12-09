import land_units_ovn from './ovn/land_units.json';
import land_units_ovn_chorfs from './ovn_chorfs/land_units.json';
import land_units_vanilla from './vanilla/land_units.json';

const landUnitsOvn = Object.entries(land_units_ovn).map(([key, value]) => {
  return {
    value: key,
    label: value,
    group: 'OvN Lost Factions',
  }
});

const landUnitsOvnChorfs = Object.entries(land_units_ovn_chorfs).map(([key, value]) => {
  return {
    value: key,
    label: value,
    group: 'OvN Lost Factions'
  }
});

const landUnitsVanilla = Object.entries(land_units_vanilla).map(([key, value]) => {
  return {
    value: key,
    label: value,
    group: 'Vanilla'
  }
});

export const landUnits = [
  ...landUnitsOvn,
  ...landUnitsOvnChorfs,
  ...landUnitsVanilla
].sort((a: any, b: any) => a.group.localeCompare(b.group));
