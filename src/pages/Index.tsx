
import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Mail, Clock, MapPin, Cloud, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 via-blue-400 to-orange-200 overflow-hidden">
      {/* Main Content */}
      <div className="container px-4 py-24 mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Hero Text */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
            Your journal is closer than ever to your todos and calendar
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            No need to break up with your apps, just connect them. Like to miss moments? Not with your journal in the menubar.
          </p>

          {/* Main UI Preview */}
          <motion.div 
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="relative mx-auto max-w-3xl"
          >
            <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex space-x-2">
                  {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, i) => (
                    <div key={i} className="px-3 py-2 bg-white rounded-xl shadow-sm">
                      <div className="text-sm text-gray-500">{day}</div>
                      <div className="font-bold">{12 + i}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="h-48 bg-white rounded-xl mb-4"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating 3D Elements */}
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
        className="absolute top-40 right-[15%] w-32 h-32 rounded-3xl bg-gradient-to-br from-pink-200 to-pink-300 shadow-xl"
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
        className="absolute bottom-40 left-[15%] w-40 h-40 rounded-full bg-gradient-to-br from-purple-200 to-purple-300 shadow-xl opacity-90"
      />

      {/* Info Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-lg max-w-2xl w-full mx-4"
      >
        <div className="flex items-center justify-center gap-3 text-gray-700">
          <Clock className="w-5 h-5" />
          <span className="text-xl font-medium">5:00 PM</span>
          <Cloud className="w-5 h-5" />
          <span className="text-xl">mostly clear in</span>
          <MapPin className="w-5 h-5" />
          <span className="text-xl">New Delhi</span>
        </div>
        <div className="flex items-center justify-center gap-3 mt-2 text-gray-600">
          <Mail className="w-5 h-5" />
          <span>2 emails</span>
          <span className="text-gray-400">•</span>
          <CalendarDays className="w-5 h-5" />
          <span>2 meetings today</span>
        </div>
      </motion.div>

      {/* App Dock */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800/80 backdrop-blur-xl rounded-full p-2 shadow-lg"
        style={{ width: 'fit-content' }}
      >
        {[1, 2, 3, 4].map((_, i) => (
          <div
            key={i}
            className="inline-block w-12 h-12 mx-1 rounded-full bg-white/10"
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Index;
