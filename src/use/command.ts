import { useMemo } from 'react';
import { useStoreActions } from '../store';

export function useCommand() {
  const queueCommand = useStoreActions((actions) => actions.game.queueCommand);

  return useMemo(() => {
    return {
      getGameInfo() {
        const type = 'get_game_info';
        return queueCommand({ type });
      },
      teleport(cqi: number, x: number, y: number) {
        const type = 'teleport';
        return queueCommand({ type, cqi, x, y });
      },
      transferRegionToFaction(region: string, faction: string) {
        const type = 'transfer_region_to_faction';
        return queueCommand({ type, region, faction });
      },
      setRegionAbandoned(region: string) {
        const type = 'set_region_abandoned';
        return queueCommand({ type, region });
      },
      createForce(args: any) {
        const type = 'create_force';
        return queueCommand({ ...args, type });
      },
      killCharacter(args: any) {
        const type = 'kill_character';
        return queueCommand({ ...args, type });
      },
      replenishActionPoints(args: any) {
        const type = 'replenish_action_points';
        return queueCommand({ ...args, type });
      },
      treasuryMod(args: any) {
        const type = 'treasury_mod';
        return queueCommand({ ...args, type });
      },
      setPublicOrderOfProvinceForRegion(args: any) {
        const type = 'set_public_order_of_province_for_region';
        return queueCommand({ ...args, type });
      },
      applyDilemmaDiplomaticBonus(args: any) {
        const type = 'apply_dilemma_diplomatic_bonus';
        return queueCommand({ ...args, type });
      },
      setCameraPosition(args: any) {
        const type = 'set_camera_position';
        return queueCommand({ ...args, type });
      },
      toggleShroud() {
        const type = 'toggle_shroud';
        return queueCommand({ type });
      },
      spawnUniqueAgent(args: any) {
        const type = 'spawn_unique_agent';
        return queueCommand({ ...args, type });
      },
      spawnAgentAtPosition(args: any) {
        const type = 'spawn_agent_at_position';
        return queueCommand({ ...args, type });
      },
      forceReligionFactors(args: any) {
        const type = 'force_religion_factors';
        return queueCommand({ ...args, type });
      },
    };
  }, [queueCommand]);
}
