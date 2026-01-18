import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

const USER_ID = "local-user";

export async function getDayProgress(
  weekId: string,
  day: string
): Promise<number> {
  const q = query(
    collection(db, "tasks"),
    where("userId", "==", USER_ID),
    where("weekId", "==", weekId),
    where("day", "==", day)
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) return 0;

  const tasks = snapshot.docs.map((d) => d.data());
  const completed = tasks.filter((t) => t.completed).length;

  return Math.round((completed / tasks.length) * 100);
}
