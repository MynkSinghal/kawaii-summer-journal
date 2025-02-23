
import { Image, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileUploaderProps {
  onFileUpload: (file: File, journalId: string) => Promise<void>;
}

export const FileUploader = ({ onFileUpload }: FileUploaderProps) => {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="file"
        id="image-upload"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFileUpload(file, "temp-id");
        }}
      />
      <input
        type="file"
        id="document-upload"
        accept=".pdf,.doc,.docx"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFileUpload(file, "temp-id");
        }}
      />
      <Button 
        variant="outline" 
        size="sm" 
        className="bg-white/80"
        onClick={() => document.getElementById('image-upload')?.click()}
      >
        <Image className="w-4 h-4" />
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        className="bg-white/80"
        onClick={() => document.getElementById('document-upload')?.click()}
      >
        <FileText className="w-4 h-4" />
      </Button>
    </div>
  );
};
