import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Task } from "@/types/task";

const USER_ID = "local-user";

export async function getTasksForDay(weekId: string, day: string) {
  const q = query(
    collection(db, "tasks"),
    where("userId", "==", USER_ID),
    where("weekId", "==", weekId),
    where("day", "==", day)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map(
    (doc) => ({ id: doc.id, ...(doc.data() as Task) })
  );
}

export async function addTask(
  weekId: string,
  day: string,
  title: string
) {
  await addDoc(collection(db, "tasks"), {
    userId: USER_ID,
    weekId,
    day,
    title,
    completed: false,
    createdAt: new Date(),
  });
}

export async function toggleTask(taskId: string, completed: boolean) {
  await updateDoc(doc(db, "tasks", taskId), {
    completed,
  });
}
