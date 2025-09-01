import { Player, Rule } from "@/types/munchkin";
import { app } from "./app";
import {
  getFirestore,
  onSnapshot,
  query,
  collection,
  doc,
  updateDoc,
  addDoc,
  deleteDoc,
  orderBy,
  runTransaction,
  getDocs,
} from "firebase/firestore";

const db = getFirestore(app);
const MUNCHKIN_PLAYERS_COLLECTION = "munchkin_players";
const MUNCHKIN_RULES_COLLECTION = "munchkin_rules";

export function setPlayersSnapshot(setPlayers: (newPlayers: Player[]) => void) {
  const q = query(collection(db, MUNCHKIN_PLAYERS_COLLECTION), orderBy("name"));
  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      const players = snapshot.docs.map((doc) => {
        const data = doc.data() as Omit<Player, "id">;
        return {
          id: doc.id,
          ...data,
        };
      });
      setPlayers(players);
    },
    (error) => {
      console.error("Snapshot error:", error);
    },
  );

  return unsubscribe;
}

export async function incrementLevel(playerId: string) {
  const playerRef = doc(db, MUNCHKIN_PLAYERS_COLLECTION, playerId);
  try {
    await runTransaction(db, async (transaction) => {
      const playerDoc = await transaction.get(playerRef);
      if (!playerDoc.exists()) {
        throw "Document does not exist!";
      }

      const newLevel = playerDoc.data().level + 1;
      if (newLevel > 10) {
        return;
      }
      transaction.update(playerRef, { level: newLevel });
    });
  } catch (e) {
    console.log("Transaction failed: ", e);
  }
}

export async function decrementLevel(playerId: string) {
  const playerRef = doc(db, MUNCHKIN_PLAYERS_COLLECTION, playerId);
  try {
    await runTransaction(db, async (transaction) => {
      const playerDoc = await transaction.get(playerRef);
      if (!playerDoc.exists()) {
        throw "Document does not exist!";
      }

      const newLevel = playerDoc.data().level - 1;
      if (newLevel < 1) {
        return;
      }
      transaction.update(playerRef, { level: newLevel });
    });
  } catch (e) {
    console.log("Transaction failed: ", e);
  }
}

export async function addPlayer(player: Omit<Player, "id">) {
  await addDoc(collection(db, MUNCHKIN_PLAYERS_COLLECTION), player);
}

export async function removePlayerDB(playerId: string) {
  await deleteDoc(doc(db, MUNCHKIN_PLAYERS_COLLECTION, playerId));
}

export async function updatePlayerName(playerId: string, newName: string) {
  const playerRef = doc(db, MUNCHKIN_PLAYERS_COLLECTION, playerId);
  await updateDoc(playerRef, { name: newName });
}

export async function setGender(playerId: string, newGender: string) {
  const playerRef = doc(db, MUNCHKIN_PLAYERS_COLLECTION, playerId);
  await updateDoc(playerRef, { gender: newGender });
}

export async function getRulesOnce(): Promise<Rule[]> {
  const q = query(
    collection(db, MUNCHKIN_RULES_COLLECTION),
    orderBy("createdAt", "desc"),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => {
    const data = doc.data() as Omit<Rule, "id">;
    return {
      id: doc.id,
      ...data,
    };
  });
}

export async function addRule(rule: Omit<Rule, "id">) {
  return await addDoc(collection(db, MUNCHKIN_RULES_COLLECTION), rule);
}

export async function updateRule(ruleId: string, updatedFields: Partial<Rule>) {
  const ruleRef = doc(db, MUNCHKIN_RULES_COLLECTION, ruleId);
  await updateDoc(ruleRef, updatedFields);
}

export async function deleteRule(ruleId: string) {
  await deleteDoc(doc(db, MUNCHKIN_RULES_COLLECTION, ruleId));
}
