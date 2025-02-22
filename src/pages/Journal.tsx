
import { motion } from "framer-motion";
import { PenLine, Image, Calendar, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

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

const Journal = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-400 to-orange-200 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">My Journal</h1>
          <Button
            className="bg-white/90 hover:bg-white/80 text-blue-600"
          >
            <Plus className="w-4 h-4 mr-2" /> New Entry
          </Button>
        </div>

        {/* Journal Entry Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-lg mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Calendar className="w-5 h-5 text-blue-500" />
              <span className="text-gray-600 font-medium">April 15, 2024</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="bg-white/80">
                <PenLine className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="bg-white/80">
                <Image className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <textarea
            className="w-full h-40 p-4 rounded-xl border-2 border-blue-100 focus:border-blue-300 focus:ring-2 focus:ring-blue-200/20 resize-none bg-white/80 backdrop-blur-sm"
            placeholder="Write your thoughts here..."
          />

          {/* Mood Selection */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">How are you feeling?</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {moods.map((mood, index) => (
                <button
                  key={index}
                  className={`p-3 rounded-xl transition-all ${mood.color} hover:scale-105`}
                >
                  {mood.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Save Entry
            </Button>
          </div>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="fixed top-40 right-[10%] w-32 h-32 rounded-3xl bg-gradient-to-br from-pink-200 to-pink-300 shadow-xl"
          style={{ transform: "perspective(1000px) rotateX(20deg)" }}
        />
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
          className="fixed bottom-40 left-[10%] w-40 h-40 rounded-full bg-gradient-to-br from-purple-200 to-purple-300 shadow-xl opacity-90"
        />
      </motion.div>
    </div>
  );
};

export default Journal;
