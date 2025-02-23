
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const JournalHeader = () => {
  return (
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-3xl font-bold text-gray-800">Today's Journal</h1>
      <Link to="/calendar">
        <Button className="bg-white/90 hover:bg-white text-blue-600">
          <Calendar className="w-4 h-4 mr-2" /> View All Entries
        </Button>
      </Link>
    </div>
  );
};
