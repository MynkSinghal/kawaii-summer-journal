
import { motion } from "framer-motion";
import { PenLine, Image, Smile, Calendar, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const Journal = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-kawaii-pink/10 to-kawaii-lavender/10 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">My Journal</h1>
          <Button
            className="bg-kawaii-pink hover:bg-kawaii-pink/90 text-pink-700"
          >
            <Plus className="w-4 h-4 mr-2" /> New Entry
          </Button>
        </div>

        {/* Journal Entry Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-lg mb-8 card-hover"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Calendar className="w-5 h-5 text-kawaii-lavender" />
              <span className="text-gray-600">April 15, 2024</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="text-gray-600">
                <PenLine className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="text-gray-600">
                <Image className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="text-gray-600">
                <Smile className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <textarea
            className="w-full h-40 p-4 rounded-lg border-2 border-kawaii-lavender/20 focus:border-kawaii-lavender focus:ring-2 focus:ring-kawaii-lavender/20 resize-none"
            placeholder="Write your thoughts here..."
          />

          <div className="mt-4 flex justify-end">
            <Button
              className="bg-kawaii-lavender hover:bg-kawaii-lavender/90 text-purple-700"
            >
              Save Entry
            </Button>
          </div>
        </motion.div>

        {/* Mood Tracker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-6 shadow-lg mb-8"
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Today's Mood</h2>
          <div className="grid grid-cols-5 gap-4">
            {["😊", "🥰", "😴", "😢", "😎"].map((emoji, index) => (
              <button
                key={index}
                className="text-3xl p-4 rounded-lg hover:bg-kawaii-pink/10 transition-colors"
              >
                {emoji}
              </button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Journal;
