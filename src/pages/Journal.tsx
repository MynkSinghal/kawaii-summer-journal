
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { MoodSelector } from "@/components/journal/MoodSelector";
import { FileUploader } from "@/components/journal/FileUploader";
import { JournalHeader } from "@/components/journal/JournalHeader";

const Journal = () => {
  const [content, setContent] = useState("");
  const [selectedMood, setSelectedMood] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please login first");
        navigate("/auth");
      } else {
        setIsAuthenticated(true);
      }
    };
    
    checkAuth();
  }, [navigate]);

  const handleFileUpload = async (file: File, journalId: string) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('journalId', journalId);

      const { data, error } = await supabase.functions.invoke('upload-attachment', {
        body: formData,
      });

      if (error) {
        toast.error('Failed to upload file');
        throw error;
      }

      toast.success('File uploaded successfully!');
      return data.filePath;
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload file');
    }
  };

  const handleSubmit = async () => {
    if (!content || !selectedMood) {
      toast.error("Please write something and select a mood");
      return;
    }

    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data: journal, error } = await supabase
        .from('journals')
        .insert({
          content,
          mood: selectedMood,
          user_id: user.id
        })
        .select()
        .single();

      if (error) throw error;

      toast.success("Journal entry saved!");
      setContent("");
      setSelectedMood("");
      
      navigate("/calendar");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#9DB5FF] via-[#B6CCFE] to-[#E2E8FF] p-8">
      <Link to="/" className="absolute top-6 left-6">
        <Button variant="ghost" className="text-gray-700 hover:text-gray-900">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <JournalHeader />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/95 backdrop-blur-lg rounded-2xl p-6 shadow-lg mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Calendar className="w-5 h-5 text-blue-500" />
              <span className="text-gray-600 font-medium">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            <FileUploader onFileUpload={handleFileUpload} />
          </div>

          <textarea
            className="w-full h-40 p-4 rounded-xl border-2 border-blue-100 focus:border-blue-300 focus:ring-2 focus:ring-blue-200/20 resize-none bg-white/90 backdrop-blur-sm"
            placeholder="Write your thoughts here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <MoodSelector 
            selectedMood={selectedMood}
            onMoodSelect={setSelectedMood}
          />

          <div className="mt-6 flex justify-end">
            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Entry"}
            </Button>
          </div>
        </motion.div>

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
          className="fixed top-40 right-[10%] w-32 h-32 rounded-3xl bg-gradient-to-br from-kawaii-pink to-kawaii-peach shadow-xl opacity-90"
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
          className="fixed bottom-40 left-[10%] w-40 h-40 rounded-full bg-gradient-to-br from-kawaii-lavender to-kawaii-pink shadow-xl opacity-80"
        />
      </motion.div>
    </div>
  );
};

export default Journal;
