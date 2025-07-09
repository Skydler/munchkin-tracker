import { Player } from "@/types/munchkin";
import { app } from "./app";
import {
  getFirestore,
  onSnapshot,
  query,
  collection,
  doc,
  updateDoc,
  increment,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

const db = getFirestore(app);
const MUNCHKING_PLAYERS_COLLECTION = "munchkin_players";

export async function setPlayersSnapshot(
  setPlayers: (newPlayers: Player[]) => void,
) {
  const q = query(collection(db, MUNCHKING_PLAYERS_COLLECTION));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const players = snapshot.docs.map((doc) => {
      const data = doc.data() as Omit<Player, "id">;
      return {
        id: doc.id,
        ...data,
      };
    });
    // Sort players by name in ascending order
    players.sort((a, b) => a.name.localeCompare(b.name));
    setPlayers(players);
  });

  return unsubscribe;
}

export async function incrementLevel(playerId: string) {
  const playerRef = doc(db, MUNCHKING_PLAYERS_COLLECTION, playerId);
  await updateDoc(playerRef, { level: increment(1) });
}

export async function decrementLevel(playerId: string) {
  const playerRef = doc(db, MUNCHKING_PLAYERS_COLLECTION, playerId);
  await updateDoc(playerRef, { level: increment(-1) });
}

export async function addPlayer(player: Omit<Player, "id">) {
  await addDoc(collection(db, MUNCHKING_PLAYERS_COLLECTION), player);
}

export async function removePlayerDB(playerId: string) {
  await deleteDoc(doc(db, MUNCHKING_PLAYERS_COLLECTION, playerId));
}

export async function updatePlayerName(playerId: string, newName: string) {
  const playerRef = doc(db, MUNCHKING_PLAYERS_COLLECTION, playerId);
  await updateDoc(playerRef, { name: newName });
}

export async function setGender(playerId: string, newGender: string) {
  const playerRef = doc(db, MUNCHKING_PLAYERS_COLLECTION, playerId);
  await updateDoc(playerRef, { gender: newGender });
}
