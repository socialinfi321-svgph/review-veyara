import React from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';

export const ProgressIndicator = ({ total, current }: { total: number; current: number }) => {
  return (
    <div className="flex items-center justify-center space-x-2 py-4">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center">
          <div
            className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
              i <= current ? 'bg-[#83C5BE]' : 'bg-white/20'
            }`}
          />
          {i < total - 1 && (
            <div
              className={`w-4 h-[1.5px] mx-1 transition-colors duration-300 ${
                i < current ? 'bg-[#83C5BE]' : 'bg-white/20'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export const ExperienceCard: React.FC<{
  title: string;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
}> = ({
  title,
  subtitle,
  children,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="w-full max-w-md mx-auto px-6 pt-8 pb-4 flex flex-col items-center"
    >
      <h2 className="text-2xl font-bold text-white text-center mb-2 leading-tight">{title}</h2>
      {subtitle && (
        <div className="text-center mb-6">
          {typeof subtitle === 'string' ? (
            <p className="text-xs text-white/70">{subtitle}</p>
          ) : (
            subtitle
          )}
        </div>
      )}
      <div className="w-full mt-4">{children}</div>
    </motion.div>
  );
};

export const OptionButton: React.FC<{
  icon?: string;
  label: string;
  selected: boolean;
  onClick: () => void;
  large?: boolean;
}> = ({
  icon,
  label,
  selected,
  onClick,
  large = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={`relative w-full flex ${
        large ? 'flex-col items-center justify-center p-5 space-y-2' : 'flex-row items-center p-4 space-x-3'
      } rounded-2xl border-2 transition-all duration-200 text-left shadow-sm ${
        selected
          ? 'border-[#83C5BE] bg-white/20 text-white'
          : 'border-white/10 bg-white/5 text-white hover:border-white/30 hover:bg-white/10'
      }`}
    >
      {icon && <span className={large ? 'text-3xl mb-2' : 'text-xl'}>{icon}</span>}
      <span className={large ? 'font-bold text-sm' : 'font-medium'}>{label}</span>
      {selected && !large && (
        <span className="absolute right-4 text-[#83C5BE]">
          <Check size={20} strokeWidth={3} />
        </span>
      )}
    </button>
  );
};

export const ChipSelector = ({
  options,
  selected,
  onToggle,
}: {
  options: string[];
  selected: string[];
  onToggle: (val: string) => void;
}) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {options.map((opt) => {
        const isSelected = selected.includes(opt);
        return (
          <button
            key={opt}
            onClick={() => onToggle(opt)}
            className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
              isSelected
                ? 'bg-[#006D77] border-[#006D77] text-white shadow-md'
                : 'bg-white/5 border-white/10 text-white hover:border-white/30 hover:bg-white/10'
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
};
