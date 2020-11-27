import land_units_ovn from './ovn/land_units.json';
import land_units_ovn_chorfs from './ovn_chorfs/land_units.json';
import land_units_vanilla from './vanilla/land_units.json';

export const units = {
  ...land_units_ovn,
  ...land_units_ovn_chorfs,
  ...land_units_vanilla,
};
