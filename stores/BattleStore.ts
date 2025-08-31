import { create } from "zustand";

interface BattleState {
  monsterHP: number;
  attackerDMG: number;
  setMonsterHP: (hp: number) => void;
  setAttackerDMG: (dmg: number) => void;
  resetValues: () => void;
}

export const useBattleStore = create<BattleState>()((set) => ({
  monsterHP: 10,
  attackerDMG: 0,
  setMonsterHP: (hp: number) => set({ monsterHP: hp }),
  setAttackerDMG: (dmg: number) => set({ attackerDMG: dmg }),
  resetValues: () => set({ monsterHP: 10, attackerDMG: 0 }),
}));
