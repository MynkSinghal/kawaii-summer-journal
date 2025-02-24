
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PenLine, LogIn, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Index = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check current auth status
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 via-blue-400 to-orange-200 overflow-hidden">
      {/* Auth Buttons */}
      <div className="absolute top-6 right-6 flex gap-4">
        {user ? (
          <>
            <Button variant="outline" className="bg-white/80 backdrop-blur-lg">
              <User className="w-4 h-4 mr-2" /> {user.email}
            </Button>
            <Button 
              variant="outline" 
              className="bg-white/80 backdrop-blur-lg"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" /> Sign Out
            </Button>
          </>
        ) : (
          <>
            <Link to="/auth">
              <Button variant="outline" className="bg-white/80 backdrop-blur-lg">
                <LogIn className="w-4 h-4 mr-2" /> Sign In
              </Button>
            </Link>
            <Link to="/auth?signup=true">
              <Button variant="outline" className="bg-white/80 backdrop-blur-lg">
                <User className="w-4 h-4 mr-2" /> Sign Up
              </Button>
            </Link>
          </>
        )}
      </div>

      {/* Main Content */}
      <div className="container px-4 py-24 mx-auto text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="max-w-4xl mx-auto"
        >
          {/* Hero Text */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
            Your journal is closer than ever to your todos and calendar!
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
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <div className="flex space-x-2">
                  {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, i) => (
                    <div key={i} className="px-3 py-2 bg-white/10 backdrop-blur-md rounded-xl">
                      <div className="text-sm text-white/80">{day}</div>
                      <div className="font-bold text-white">{12 + i}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <PenLine className="w-5 h-5 text-white" />
                  <h3 className="text-xl font-semibold text-white">Today's Journal</h3>
                </div>
                <p className="text-white/80 mb-4">
                  How are you feeling today? Take a moment to reflect and capture your thoughts...
                </p>
                <Link to={user ? "/journal" : "/auth"}>
                  <Button className="bg-blue-500/90 hover:bg-blue-600/90 text-white backdrop-blur-lg">
                    Start Writing
                  </Button>
                </Link>
              </div>
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
        className="absolute top-40 right-[15%] w-32 h-32 rounded-3xl bg-gradient-to-br from-pink-200/30 to-pink-300/30 backdrop-blur-xl border border-white/20"
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
        className="absolute bottom-40 left-[15%] w-40 h-40 rounded-full bg-gradient-to-br from-purple-200/30 to-purple-300/30 backdrop-blur-xl border border-white/20"
      />
    </div>
  );
};

export default Index;
