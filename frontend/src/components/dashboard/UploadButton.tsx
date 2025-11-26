import { Upload } from "lucide-react";
import { useRef, useState } from "react";

interface UploadButtonProps {
  onFileSelect?: (file: File) => void;
}

export function UploadButton({ onFileSelect }: UploadButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      onFileSelect?.(file);
      console.log("Selected file:", file.name);
      // TODO: Implement file upload logic
    } else {
      alert("Please select a PDF file");
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type === "application/pdf") {
      onFileSelect?.(file);
      console.log("Dropped file:", file.name);
      // TODO: Implement file upload logic
    } else {
      alert("Please drop a PDF file");
    }
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,application/pdf"
        onChange={handleFileChange}
        className="hidden"
      />

      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative group cursor-pointer transition-all duration-300
          border-2 border-dashed rounded-2xl p-6 lg:p-8
          ${isDragging 
            ? 'border-cyan-400 bg-cyan-500/10' 
            : 'border-cyan-500/30 hover:border-cyan-500/50 hover:bg-cyan-500/5'
          }
        `}
      >
        <div className="flex flex-col items-center justify-center space-y-3 lg:space-y-4">
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <div className="relative bg-gradient-to-r from-cyan-500 to-sky-600 p-3 lg:p-4 rounded-full">
              <Upload className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-lg lg:text-xl font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
              Upload Document
            </h3>
            <p className="text-gray-400 text-sm px-4">
              <span className="hidden sm:inline">Click to browse or drag and drop your PDF file here</span>
              <span className="sm:hidden">Tap to select your PDF file</span>
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Only PDF files are supported
            </p>
          </div>

          <button className="px-4 lg:px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-sky-600 text-white text-sm lg:text-base font-medium hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all duration-300">
            Select File
          </button>
        </div>
      </div>
    </>
  );
}