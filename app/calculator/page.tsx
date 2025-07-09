"use client";

import { Zap } from "lucide-react";
import { useState } from "react";

export default function BattleCalculator() {
  const [monsterHP, setMonsterHP] = useState(10);
  const [attackerDMG, setAttackerDMG] = useState(0);

  function resetValues() {
    setMonsterHP(10);
    setAttackerDMG(0);
  }

  const damageExceedsHP = attackerDMG > monsterHP;

  return (
    <div className="flex flex-col items-center justify-center m-15">
      <main className="max-w-2xl flex flex-col">
        <div className="mb-4">
          {damageExceedsHP ? (
            <div className="bg-error text-error-content rounded shadow-lg h-15 flex flex-row items-center justify-center space-x-2">
              <Zap className="h-5 w-5 animate-bounce" />
              <span className=" block font-semibold">LETHAL DAMAGE!</span>
              <Zap className="h-5 w-5 animate-bounce" />
            </div>
          ) : (
            <div className="bg-accent text-accent-content rounded shadow-lg h-15 flex flex-row items-center justify-center">
              <span className="font-medium">
                Remaining HP: {monsterHP - attackerDMG}
              </span>
            </div>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-2">Monster HP</label>
          <input
            type="number"
            className="input input-lg"
            required
            min="0"
            onChange={(e) => setMonsterHP(Number(e.target.value))}
            value={monsterHP.toString()}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Attacker Damage</label>
          <input
            type="number"
            className="input input-lg"
            required
            min="1"
            onChange={(e) => setAttackerDMG(Number(e.target.value))}
            value={attackerDMG.toString()}
          />
        </div>
        <button
          onClick={resetValues}
          className="btn btn-primary btn-wide self-center"
        >
          Reset
        </button>
      </main>
    </div>
  );
}
