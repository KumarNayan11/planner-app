import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Habit } from "@/types/habit";

const USER_ID = "local-user";

export async function getHabits(weekId: string): Promise<Habit[]> {
  const q = query(
    collection(db, "habits"),
    where("userId", "==", USER_ID),
    where("weekId", "==", weekId)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((d) => {
  const data = d.data() as Omit<Habit, "id">;
  return {
    id: d.id,
    ...data,
  };
});
}

export async function addHabit(weekId: string, name: string) {
  await addDoc(collection(db, "habits"), {
    userId: USER_ID,
    weekId,
    name,
    days: [],
  });
}

export async function toggleHabitDay(
  habitId: string,
  day: string,
  days: string[]
) {
  const updated = days.includes(day)
    ? days.filter((d) => d !== day)
    : [...days, day];

  await updateDoc(doc(db, "habits", habitId), {
    days: updated,
  });
}
