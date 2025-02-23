
import { Button } from "@/components/ui/button";

interface MoodSelectorProps {
  selectedMood: string;
  onMoodSelect: (mood: string) => void;
}

const moods = [
  { name: "Happy", color: "bg-kawaii-yellow/20 text-yellow-700" },
  { name: "Excited", color: "bg-orange-200/20 text-orange-700" },
  { name: "Grateful", color: "bg-green-200/20 text-green-700" },
  { name: "Calm", color: "bg-blue-200/20 text-blue-700" },
  { name: "Tired", color: "bg-purple-200/20 text-purple-700" },
  { name: "Sad", color: "bg-gray-200/20 text-gray-700" },
  { name: "Anxious", color: "bg-red-200/20 text-red-700" },
  { name: "Frustrated", color: "bg-pink-200/20 text-pink-700" }
];

export const MoodSelector = ({ selectedMood, onMoodSelect }: MoodSelectorProps) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">How are you feeling?</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {moods.map((mood) => (
          <button
            key={mood.name}
            className={`p-3 rounded-xl transition-all ${
              selectedMood === mood.name 
                ? `${mood.color} scale-105 ring-2 ring-blue-400` 
                : mood.color + ' hover:scale-105'
            }`}
            onClick={() => onMoodSelect(mood.name)}
          >
            {mood.name}
          </button>
        ))}
      </div>
    </div>
  );
};
