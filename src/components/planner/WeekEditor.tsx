"use client";

import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Week } from "@/types/week";

export default function WeekEditor({ week }: { week: Week }) {
  const [focus, setFocus] = useState(week.focus);
  const [reward, setReward] = useState(week.reward);
  const [affirmation, setAffirmation] = useState(week.affirmation);
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    await updateDoc(doc(db, "weeks", week.id), {
      focus,
      reward,
      affirmation,
    });
    setSaving(false);
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-3">
      <h2 className="font-semibold">This Week</h2>

      <input
        className="w-full border p-2 rounded"
        placeholder="Weekly focus"
        value={focus}
        onChange={(e) => setFocus(e.target.value)}
      />

      <input
        className="w-full border p-2 rounded"
        placeholder="Reward"
        value={reward}
        onChange={(e) => setReward(e.target.value)}
      />

      <input
        className="w-full border p-2 rounded"
        placeholder="Affirmation"
        value={affirmation}
        onChange={(e) => setAffirmation(e.target.value)}
      />

      <button
        onClick={save}
        disabled={saving}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        {saving ? "Saving..." : "Save"}
      </button>
    </div>
  );
}
