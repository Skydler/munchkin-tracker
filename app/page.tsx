"use client";

import {
  addPlayer,
  decrementLevel,
  incrementLevel,
  removePlayerDB,
  setGender,
  setPlayersSnapshot,
  updatePlayerName,
} from "@/services/firebase/db";
import { Player } from "@/types/munchkin";
import { Edit3, Trash2, Users } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [editingPlayerId, setEditingPlayerId] = useState<null | string>(null);
  const [editingPlayerName, setEditingPlayerName] = useState("");
  // const audioPlayer = useAudioPlayer(alarmSoundEffect);
  // audioPlayer.volume = 0.3;

  useEffect(() => {
    setPlayersSnapshot(setPlayers);
  }, []);

  const addLevel = (id: string) => {
    const player = players.find((p) => p.id === id);
    if (!player) return;

    if (player.level >= 10) {
      // console.error("Max Level Reached", "This player is already at max level.");
      return;
    }
    incrementLevel(id);
  };

  const removeLevel = (id: string) => {
    const player = players.find((p) => p.id === id);
    if (!player) return;
    if (player.level <= 1) {
      // Alert.alert("Min Level Reached", "This player is already at min level.");
      return;
    }
    decrementLevel(id);
  };

  const createPlayer = () => {
    if (newPlayerName.trim()) {
      const newPlayer = {
        name: newPlayerName.trim(),
        gender: "M",
        level: 1,
      };
      addPlayer(newPlayer);
      setNewPlayerName("");
    } else {
      // Alert.alert("Error", "Player name cannot be empty.");
    }
  };

  const removePlayer = (id: string) => {
    removePlayerDB(id);
  };

  const startEditingName = (player: Player) => {
    setEditingPlayerId(player.id);
    setEditingPlayerName(player.name);
  };

  const saveEditingName = (id: string) => {
    if (editingPlayerName.trim()) {
      updatePlayerName(id, editingPlayerName.trim());
      setEditingPlayerId(null);
      setEditingPlayerName("");
    } else {
      // Alert.alert("Error", "Player name cannot be empty.");
    }
  };

  const cancelEditingName = () => {
    setEditingPlayerId(null);
    setEditingPlayerName("");
  };
  return (
    <div className="flex flex-col items-center justify-center mt-15">
      <main className="w-full max-w-2xl mx-auto">
        <div className="space-y-3 md:space-y-4 mb-8">
          {players.map((player) => (
            <div key={player.id} className="card bg-base-200 shadow-md">
              <div className="card-body p-3 md:p-4">
                <div className="flex items-center gap-3 md:gap-4">
                  {/* Delete Button */}
                  <button
                    onClick={() => removePlayer(player.id)}
                    className="btn btn-error btn-sm h-8 w-8 md:h-10 md:w-10 p-0 flex-shrink-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>

                  {/* Munchkin Indicator */}
                  <button
                    className="btn btn-accent btn-sm h-8 w-8 md:h-10 md:w-10 p-0 flex-shrink-0:"
                    onClick={() =>
                      setGender(player.id, player.gender === "M" ? "F" : "M")
                    }
                  >
                    {player.gender}
                  </button>

                  {/* Player Name */}
                  <div className="flex-1 min-w-0">
                    {editingPlayerId === player.id ? (
                      <input
                        type="text"
                        value={editingPlayerName}
                        onChange={(e) => setEditingPlayerName(e.target.value)}
                        onBlur={() => saveEditingName(player.id)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            saveEditingName(player.id);
                          } else if (e.key === "Escape") {
                            cancelEditingName();
                          }
                        }}
                        className="input input-bordered input-sm md:input-md w-full text-base md:text-lg font-semibold"
                        autoFocus
                      />
                    ) : (
                      <button
                        onClick={() => startEditingName(player)}
                        className="flex items-center gap-2 text-left w-full group hover:bg-base-300 p-2 rounded transition-colors"
                      >
                        <span className="text-base md:text-lg font-semibold text-base-content truncate">
                          {player.name}
                        </span>
                        <Edit3 className="h-4 w-4 text-base-content/50 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                      </button>
                    )}
                  </div>

                  {/* Level Controls */}
                  <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
                    <button
                      onClick={() => removeLevel(player.id)}
                      disabled={player.level <= 1}
                      className="btn btn-outline btn-sm h-8 w-8 md:h-10 md:w-10 p-0 text-lg md:text-xl font-bold"
                    >
                      −
                    </button>

                    <div className="min-w-[2rem] md:min-w-[2.5rem] text-center">
                      <span className="text-lg md:text-xl font-bold text-base-content">
                        {player.level}
                      </span>
                    </div>

                    <button
                      onClick={() => addLevel(player.id)}
                      disabled={player.level >= 10}
                      className="btn btn-neutral btn-sm h-8 w-8 md:h-10 md:w-10 p-0 text-lg md:text-xl font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Player */}
        <div className="card bg-base-300 shadow-lg">
          <div className="card-body p-4 md:p-6">
            <div className="text-center mb-4">
              <h2 className="card-title justify-center text-lg md:text-xl">
                <Users className="h-5 w-5" />
                Add New Player
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Player Name"
                value={newPlayerName}
                onChange={(e) => setNewPlayerName(e.target.value)}
                className="input input-bordered flex-1 h-12 p-4"
              />
              <button
                onClick={createPlayer}
                disabled={!newPlayerName.trim()}
                className="btn btn-success h-12 px-6 font-semibold"
              >
                Add Player +
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
