import { createContext, useContext, useState, ReactNode } from "react";

type ToastType = "success" | "error" | "info";

interface Toast {
  message: string;
  type?: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<Toast | null>(null);

  const showToast = (message: string, type: ToastType = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  };

  // Responsive position
  const isMobile = window.innerWidth < 640;

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div
          className={`
            fixed z-50
            ${isMobile ? "top-4 left-1/2 -translate-x-1/2" : "top-6 right-6"}
            px-6 py-3 rounded-lg shadow-lg
            text-white font-semibold
            ${toast.type === "success" ? "bg-green-600" : toast.type === "error" ? "bg-red-600" : "bg-cyan-600"}
            animate-fade-in
          `}
          style={{ minWidth: 200, maxWidth: 320 }}
        >
          {toast.message}
        </div>
      )}
      <style>{`
        .animate-fade-in {
          animation: fade-in 0.3s;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-20px);}
          to { opacity: 1; transform: translateY(0);}
        }
      `}</style>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}