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
    <section className="bg-blue-50 rounded-xl shadow-lg p-6 space-y-6 border border-blue-100">
      <h2 className="text-xl font-semibold text-gray-800">
        This Week
      </h2>

      {/* Weekly Focus */}
      <input
        className="w-full border border-gray-300 p-3 rounded-lg
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                   bg-white text-gray-900 placeholder-gray-500"
        placeholder="Weekly focus"
        value={focus}
        onChange={(e) => setFocus(e.target.value)}
        aria-label="Enter your weekly focus"
      />

      {/* Reward */}
      <input
        className="w-full border border-gray-300 p-3 rounded-lg
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                   bg-white text-gray-900 placeholder-gray-500"
        placeholder="Reward"
        value={reward}
        onChange={(e) => setReward(e.target.value)}
        aria-label="Enter your reward for completing the week"
      />

      {/* Affirmation */}
      <input
        className="w-full border border-gray-300 p-3 rounded-lg
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                   bg-white text-gray-900 placeholder-gray-500"
        placeholder="Affirmation"
        value={affirmation}
        onChange={(e) => setAffirmation(e.target.value)}
        aria-label="Enter your weekly affirmation"
      />

      {/* Save Button */}
      <button
        onClick={save}
        disabled={saving}
        className={`px-5 py-3 rounded-lg text-white font-medium transition-all duration-200
          border border-green-700
          ${
            saving
              ? "bg-green-400 opacity-60 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          }
        `}
        aria-label={saving ? "Saving changes..." : "Save weekly settings"}
        aria-disabled={saving}
      >
        {saving ? "Saving…" : "Save"}
      </button>
    </section>
  );
}