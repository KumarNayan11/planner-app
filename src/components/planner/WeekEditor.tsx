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
    try {
      setSaving(true);
      await updateDoc(doc(db, "weeks", week.id), {
        focus,
        reward,
        affirmation,
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="bg-[var(--green-light)] rounded-xl shadow-md p-5 space-y-4">
      <h2 className="text-lg font-semibold text-gray-700">
        This Week
      </h2>

      {/* Weekly Focus */}
      <input
        className="w-full border border-green-300 p-2 rounded-md
                   focus:outline-none focus:ring-2 focus:ring-green-400
                   bg-white"
        placeholder="Weekly focus"
        value={focus}
        onChange={(e) => setFocus(e.target.value)}
      />

      {/* Reward */}
      <input
        className="w-full border border-green-300 p-2 rounded-md
                   focus:outline-none focus:ring-2 focus:ring-green-400
                   bg-white"
        placeholder="Reward"
        value={reward}
        onChange={(e) => setReward(e.target.value)}
      />

      {/* Affirmation */}
      <input
        className="w-full border border-green-300 p-2 rounded-md
                   focus:outline-none focus:ring-2 focus:ring-green-400
                   bg-white"
        placeholder="Affirmation"
        value={affirmation}
        onChange={(e) => setAffirmation(e.target.value)}
      />

      {/* Save Button */}
      <button
        onClick={save}
        disabled={saving}
        className={`px-4 py-2 rounded-lg text-white font-medium transition
          ${
            saving
              ? "bg-[var(--green-main)] opacity-60 cursor-not-allowed"
              : "bg-[var(--green-main)] hover:opacity-90"
          }
        `}
      >
        {saving ? "Saving…" : "Save"}
      </button>
    </section>
  );
}
