
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface JournalEntry {
  id: string;
  content: string;
  mood: string;
  created_at: string;
}

const Calendar = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);

  useEffect(() => {
    const fetchEntries = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) return;

      const { data: journalData } = await supabase
        .from('journals')
        .select('*')
        .eq('user_id', data.user.id);

      if (journalData) {
        setEntries(journalData);
      }
    };

    fetchEntries();
  }, []);

  const datesWithEntries = entries.map(entry => 
    new Date(entry.created_at).toISOString().split('T')[0]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-kawaii-pink via-kawaii-lavender to-kawaii-yellow p-8">
      {/* Back Button */}
      <Link to="/journal" className="absolute top-6 left-6">
        <Button variant="ghost" className="text-gray-700 hover:text-gray-900">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Journal
        </Button>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex flex-col md:flex-row gap-8">
          {/* Calendar Side */}
          <div className="md:w-1/2">
            <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={(newDate) => {
                  if (newDate) {
                    setDate(newDate);
                    const entry = entries.find(e => 
                      format(new Date(e.created_at), 'yyyy-MM-dd') === 
                      format(newDate, 'yyyy-MM-dd')
                    );
                    setSelectedEntry(entry || null);
                  }
                }}
                className="rounded-md border-0"
                modifiers={{
                  hasEntry: (date) => 
                    datesWithEntries.includes(format(date, 'yyyy-MM-dd'))
                }}
                modifiersStyles={{
                  hasEntry: {
                    backgroundColor: '#93c5fd',
                    color: 'white'
                  }
                }}
              />
            </div>
          </div>

          {/* Entry Display Side */}
          <div className="md:w-1/2">
            <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-6 shadow-lg h-full">
              {selectedEntry ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {format(new Date(selectedEntry.created_at), 'MMMM d, yyyy')}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      selectedEntry.mood === 'Happy' ? 'bg-kawaii-yellow/20 text-yellow-700' :
                      selectedEntry.mood === 'Excited' ? 'bg-orange-200/20 text-orange-700' :
                      'bg-blue-200/20 text-blue-700'
                    }`}>
                      {selectedEntry.mood}
                    </span>
                  </div>
                  <p className="text-gray-600 whitespace-pre-wrap">
                    {selectedEntry.content}
                  </p>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500">
                  Select a date with an entry to view details
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Calendar;
