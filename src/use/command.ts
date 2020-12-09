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
      forceDeclareWar(args: any) {
        const type = 'force_declare_war';
        return queueCommand({ ...args, type });
      },
      forceMakePeace(args: any) {
        const type = 'force_make_peace';
        return queueCommand({ ...args, type });
      },
      forceMakeVassal(args: any) {
        const type = 'force_make_vassal';
        return queueCommand({ ...args, type });
      },
      forceAlliance(args: any) {
        const type = 'force_alliance';
        return queueCommand({ ...args, type });
      },
      forceGrantMilitaryAccess(args: any) {
        const type = 'force_grant_military_access';
        return queueCommand({ ...args, type });
      },
      forceMakeTradeAgreement(args: any) {
        const type = 'force_make_trade_agreement';
        return queueCommand({ ...args, type });
      },
      forceConfederation(args: any) {
        const type = 'force_confederation';
        return queueCommand({ ...args, type });
      },
      forceResetSkills(args: any) {
        const type = 'force_reset_skills';
        return queueCommand({ ...args, type });
      },
      enableAllDiplomacy(args: any) {
        const type = 'enable_all_diplomacy';
        return queueCommand({ ...args, type });
      },
      setSettlementLevel(args: any) {
        const type = 'set_settlement_level';
        return queueCommand({ ...args, type });
      },
      getSettlementSlots(args: any) {
        const type = 'get_settlement_slots';
        return queueCommand({ ...args, type });
      },
      setSettlementSlot(args: any) {
        const type = 'set_settlement_slot';
        return queueCommand({ ...args, type });
      },
    };
  }, [queueCommand]);
}
