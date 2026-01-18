import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";
import { Week } from "@/types/week";

const USER_ID = "local-user";

export async function getOrCreateCurrentWeek(): Promise<Week> {
  const today = new Date().toISOString().split("T")[0];

  const q = query(
    collection(db, "weeks"),
    where("userId", "==", USER_ID)
  );

  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    const doc = snapshot.docs[0];
    return { id: doc.id, ...(doc.data() as Week) };
  }

  const newWeek = {
    userId: USER_ID,
    startDate: today,
    endDate: today,
    focus: "",
    reward: "",
    affirmation: "",
    createdAt: new Date(),
  };

  const ref = await addDoc(collection(db, "weeks"), newWeek);

  return { id: ref.id, ...newWeek };
}
