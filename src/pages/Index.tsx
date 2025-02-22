
import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Sun, CloudSun, IceCream } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [isHovering, setIsHovering] = useState("");

  const features = [
    {
      icon: <Heart className="w-6 h-6 text-kawaii-pink" />,
      title: "Express Yourself",
      description: "Write your thoughts in a beautiful, personalized journal.",
    },
    {
      icon: <Sun className="w-6 h-6 text-kawaii-yellow" />,
      title: "Daily Reflections",
      description: "Track your moods and celebrate daily moments of joy.",
    },
    {
      icon: <CloudSun className="w-6 h-6 text-kawaii-lavender" />,
      title: "Create Memories",
      description: "Attach photos and mementos to your journal entries.",
    },
    {
      icon: <IceCream className="w-6 h-6 text-kawaii-peach" />,
      title: "Stay Inspired",
      description: "Customize your journal with cute themes and stickers.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-kawaii-pink/20 to-kawaii-lavender/20">
      {/* Hero Section */}
      <section className="container px-4 py-24 mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto space-y-8"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full bg-kawaii-pink/20 text-pink-700">
            ✨ Your Daily Journal Adventure
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight">
            Make Every Day
            <span className="block text-pink-600">Magical</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Express yourself in a beautiful digital journal filled with kawaii vibes
            and summer memories.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="bg-kawaii-pink hover:bg-kawaii-pink/90 text-pink-700"
            >
              Start Journaling
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-kawaii-lavender text-purple-700 hover:bg-kawaii-lavender/20"
            >
              Learn More
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container px-4 py-16 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative p-6 bg-white rounded-2xl shadow-lg card-hover"
              onMouseEnter={() => setIsHovering(`feature-${index}`)}
              onMouseLeave={() => setIsHovering("")}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
              {isHovering === `feature-${index}` && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-3 h-3 bg-kawaii-pink rounded-full"
                />
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Decorative Elements */}
      <div className="fixed top-20 left-10 animate-float opacity-20">
        <div className="w-24 h-24 rounded-full bg-kawaii-yellow"></div>
      </div>
      <div className="fixed bottom-20 right-10 animate-float-delayed opacity-20">
        <div className="w-32 h-32 rounded-full bg-kawaii-pink"></div>
      </div>
      <div className="fixed top-40 right-20 animate-float-more-delayed opacity-20">
        <div className="w-16 h-16 rounded-full bg-kawaii-lavender"></div>
      </div>
    </div>
  );
};

export default Index;
