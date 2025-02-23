
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, ArrowLeft, Download, PaperclipIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { toast } from "sonner";

interface Attachment {
  id: string;
  file_path: string;
  file_type: string;
  created_at: string;
}

interface JournalEntry {
  id: string;
  content: string;
  mood: string;
  created_at: string;
  attachments?: Attachment[];
}

const Calendar = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
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
        await fetchEntries(user.id);
      }
    };
    
    checkAuth();
  }, [navigate]);

  const fetchEntries = async (userId: string) => {
    const { data: journalData, error: journalError } = await supabase
      .from('journals')
      .select('*')
      .eq('user_id', userId);

    if (journalError) {
      toast.error('Failed to fetch journal entries');
      return;
    }

    // Fetch attachments for each journal entry
    const entriesWithAttachments = await Promise.all(
      journalData.map(async (entry) => {
        const { data: attachments } = await supabase
          .from('attachments')
          .select('*')
          .eq('journal_id', entry.id);
        
        return {
          ...entry,
          attachments: attachments || []
        };
      })
    );

    setEntries(entriesWithAttachments);
  };

  const handleFileDownload = async (filePath: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('journal_attachments')
        .download(filePath);

      if (error) throw error;

      const url = window.URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = filePath.split('/').pop() || 'download';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    } catch (error) {
      toast.error('Failed to download file');
      console.error(error);
    }
  };

  const datesWithEntries = entries.map(entry => 
    format(new Date(entry.created_at), 'yyyy-MM-dd')
  );

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#9DB5FF] via-[#B6CCFE] to-[#E2E8FF] p-4 md:p-8">
      <Link to="/journal" className="absolute top-6 left-6">
        <Button variant="ghost" className="text-gray-700 hover:text-gray-900">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Journal
        </Button>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Calendar Side */}
          <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
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

          {/* Entry Display Side */}
          <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
            {selectedEntry ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-semibold text-gray-800">
                    {format(new Date(selectedEntry.created_at), 'MMMM d, yyyy')}
                  </h3>
                  <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                    selectedEntry.mood === 'Happy' ? 'bg-kawaii-yellow/20 text-yellow-700' :
                    selectedEntry.mood === 'Excited' ? 'bg-orange-200/20 text-orange-700' :
                    'bg-blue-200/20 text-blue-700'
                  }`}>
                    {selectedEntry.mood}
                  </span>
                </div>
                
                <p className="text-gray-600 whitespace-pre-wrap text-lg leading-relaxed">
                  {selectedEntry.content}
                </p>

                {selectedEntry.attachments && selectedEntry.attachments.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold text-gray-700 mb-3">
                      Attachments
                    </h4>
                    <div className="space-y-2">
                      {selectedEntry.attachments.map((attachment) => (
                        <div 
                          key={attachment.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center space-x-2">
                            <PaperclipIcon className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">
                              {attachment.file_path.split('/').pop()}
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleFileDownload(attachment.file_path)}
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                Select a date with an entry to view details
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Calendar;
