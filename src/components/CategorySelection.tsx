import React from 'react';
import { ChevronRight, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';

const CATEGORY_STYLES: Record<string, any> = {
  'Top Wear': {
    subtitle: 'T-shirts, Shirts, Jackets & more',
    bgColor: 'bg-[#eaf8f3]',
    iconBg: 'bg-[#c5ebd9]',
    emoji: '👕',
  },
  'Bottom Wear': {
    subtitle: 'Jeans, Trousers, Shorts & more',
    bgColor: 'bg-[#ecf3fe]',
    iconBg: 'bg-[#cddcfe]',
    emoji: '👖',
  },
  'Ethnic': {
    subtitle: 'Kurtas, Sarees, Suits & more',
    bgColor: 'bg-[#feedee]',
    iconBg: 'bg-[#fac7c8]',
    emoji: '👘',
  },
  'Sports': {
    subtitle: 'Activewear, Tracksuits & more',
    bgColor: 'bg-[#f4f0ff]',
    iconBg: 'bg-[#dfcfff]',
    emoji: '👟',
  },
  'Basics': {
    subtitle: 'Innerwear, Basics & more',
    bgColor: 'bg-[#fef8e6]',
    iconBg: 'bg-[#fcebb0]',
    emoji: '🧦',
  },
  'Footwear': {
    subtitle: 'Shoes, Sandals, Flip-flops & more',
    bgColor: 'bg-[#e9f8f5]',
    iconBg: 'bg-[#bcf0e6]',
    emoji: '👞',
  },
  'Accessories': {
    subtitle: 'Bags, Belts, Caps & more',
    bgColor: 'bg-[#fceef5]',
    iconBg: 'bg-[#fad1e4]',
    emoji: '🎒',
  },
};

const DEFAULT_STYLE = {
  subtitle: 'Tap to select',
  bgColor: 'bg-[#f3f4f6]',
  iconBg: 'bg-[#e5e7eb]',
  emoji: '🛍️',
};

export const CategorySelection = ({
  categories,
  onSelect,
}: {
  categories: string[];
  onSelect: (category: string) => void;
}) => {
  return (
    <div className="w-full">
      {/* Header text from the image */}
      <div className="text-center mb-6">
        <p className="text-sm text-white/90 font-medium">Jo category aap par fit baithe, use choose karein ✨</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {categories.map((cat) => {
          if (cat === 'Other') return null; // We can handle 'other' separately or skip it in the visual grid
          const style = CATEGORY_STYLES[cat] || CATEGORY_STYLES[cat.replace('s', '')] || DEFAULT_STYLE;

          return (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              key={cat}
              onClick={() => onSelect(cat)}
              className={`relative overflow-hidden ${style.bgColor} rounded-[20px] p-3.5 flex flex-col items-start text-left h-[140px] shadow-sm border border-white/50`}
            >
              <div className="flex items-center gap-2 mb-1.5 z-10">
                <div className={`w-7 h-7 shrink-0 rounded-full ${style.iconBg} flex items-center justify-center text-sm shadow-sm`}>
                  {style.emoji}
                </div>
                <h3 className="font-extrabold text-slate-800 text-[14px] leading-tight">{cat}</h3>
              </div>
              <p className="text-slate-600 text-[10px] leading-[1.3] w-[65%] z-10 font-semibold opacity-80">
                {style.subtitle}
              </p>
              
              <div className="mt-auto z-10 w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-sm">
                <ChevronRight size={14} className="text-slate-800" strokeWidth={3} />
              </div>

              {/* Big Emoji / Image bleeding off bottom right */}
              <div className="absolute -bottom-3 -right-3 text-[70px] drop-shadow-xl select-none z-0 rotate-[-10deg] opacity-90">
                {style.emoji}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Bottom Option */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onSelect('Other')}
        className="w-full bg-[#f0f9f6] rounded-[20px] p-4 flex items-center justify-between shadow-sm border border-[#d6efe7] mb-4"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-[#28b08e] rounded-full flex items-center justify-center shadow-md relative">
            <MessageSquare size={20} className="text-white" fill="currentColor" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#7ce5ca] rounded-full border-2 border-[#f0f9f6]"></div>
          </div>
          <div className="text-left">
            <h3 className="font-bold text-slate-800 text-[14px]">Aap jitna batana chahein, utna hi batayein.</h3>
            <p className="text-slate-600 text-[11px] font-semibold">Quick ho ya detail - hum yahin hain</p>
          </div>
        </div>
        <ChevronRight size={20} className="text-slate-500 shrink-0" />
      </motion.button>
    </div>
  );
};
