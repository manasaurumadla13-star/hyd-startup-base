import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-bg2 border border-border-strong rounded-2xl p-8 w-full max-w-[460px] shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface border border-border-strong text-text-secondary flex items-center justify-center hover:text-text-primary transition-all"
            >
              <X size={18} />
            </button>
            <h2 className="font-display font-extrabold text-2xl mb-6 tracking-tight">{title}</h2>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function InputField(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full bg-surface border border-border-strong rounded-xl px-4 py-3 text-[0.9rem] font-sans outline-none focus:border-accent transition-all mb-4 text-text-primary placeholder:text-text-muted"
    />
  );
}

export function SelectField({ children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className="w-full bg-surface border border-border-strong rounded-xl px-4 py-3 text-[0.9rem] font-sans outline-none focus:border-accent transition-all mb-4 text-text-primary"
    >
      {children}
    </select>
  );
}

export function TextAreaField(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className="w-full bg-surface border border-border-strong rounded-xl px-4 py-3 text-[0.9rem] font-sans outline-none focus:border-accent transition-all mb-4 text-text-primary placeholder:text-text-muted min-h-[100px]"
    />
  );
}

export function PrimaryButton({ children, loading, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className="w-full bg-accent text-white py-3 5 rounded-xl text-[0.95rem] font-bold hover:bg-accent2 transition-all shadow-lg shadow-accent/20 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading && (
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          ⟳
        </motion.span>
      )}
      {children}
    </button>
  );
}
