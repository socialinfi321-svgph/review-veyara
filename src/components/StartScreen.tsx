import React from 'react';
import { ShoppingCart, ShieldCheck, Clock, Gift, ArrowRight, ShoppingBag, Shirt, Heart } from 'lucide-react';
import { ShopperType } from '../types';

export const StartScreen = ({ onSelect }: { onSelect: (type: ShopperType) => void }) => {
  return (
    <div className="h-[100dvh] bg-[#eaf4f3] flex flex-col relative overflow-hidden font-sans w-full max-w-md mx-auto shadow-2xl">
      {/* Top Dark Teal Section */}
      <div className="relative w-full pt-5 pb-12 px-5 z-10 flex flex-col items-center">
        {/* Main SVG Background (Shoe en pointe bend & top sweep) */}
        <div className="absolute top-0 left-0 w-full h-[340px] z-0 pointer-events-none">
          {/* Dotted pattern below top right */}
          <div className="absolute top-0 right-0 w-[250px] h-[200px] z-10 opacity-40 [mask-image:radial-gradient(ellipse_at_top_right,black_0%,transparent_80%)]" 
               style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '10px 10px' }}>
          </div>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full drop-shadow-xl relative z-0">
            {/* Lighter green shadow layer (thinner) */}
            <path d="M 0,0 L 100,0 L 100,88 C 50,58 20,93 0,48 Z" fill="#0f7a73" />
            {/* Main dark teal layer */}
            <path d="M 0,0 L 100,0 L 100,85 C 50,55 20,90 0,45 Z" fill="#004b46" />
          </svg>
        </div>

        {/* Decorative Icons */}
        <ShoppingBag strokeWidth={0.75} className="absolute top-[48%] left-3 text-white/10 w-16 h-16 -rotate-12 z-20" />
        <Shirt strokeWidth={0.75} className="absolute top-[12%] right-[10%] text-white/10 w-12 h-12 rotate-12 z-20" />
        <Heart strokeWidth={0.75} className="absolute top-[55%] right-[6%] text-white/10 w-8 h-8 rotate-[15deg] z-20" />

        {/* Top Bar / Logo Area */}
        <div className="absolute top-4 left-4 z-30">
          <img 
            src="https://res.cloudinary.com/dtygcxcr1/image/upload/v1788423308/ChatGPT_Image_Sep_3_2026_01_44_37_PM_qbshel.png" 
            alt="Citykart Logo" 
            className="w-[130px] h-auto object-contain drop-shadow-md"
          />
        </div>

        {/* Hero Text */}
        <div className="text-center text-white relative z-30 mb-2 mt-[45px]">
          <h1 className="text-[26px] font-extrabold mb-2 leading-[1.15] tracking-tight">
            Aaj <span className="text-[#ffcb3a] relative inline-block">
              shopping
              {/* Spark lines top right */}
              <svg className="absolute -top-3 -right-6 w-6 h-6 text-[#ffcb3a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="2" y1="20" x2="8" y2="14" />
                <line x1="12" y1="22" x2="16" y2="14" />
              </svg>
            </span><br />
            <span className="relative inline-block">
              kiske
              {/* Spark lines bottom left */}
              <svg className="absolute -bottom-1 -left-5 w-5 h-5 text-[#ffcb3a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="16" y1="4" x2="10" y2="10" />
                <line x1="20" y1="12" x2="14" y2="16" />
              </svg>
            </span> liye hui?
          </h1>
          <p className="text-[14px] font-medium opacity-90 leading-tight">
            Bas <span className="text-[#ffcb3a]">30 seconds</span> mein apna<br />experience bataiye <span className="text-red-500">❤️</span>
          </p>
        </div>
      </div>

      {/* Cards Section */}
      <div className="relative z-30 px-5 grid grid-cols-2 gap-3 w-full max-w-[290px] mx-auto mt-[-10px]">
        {/* Men's Card */}
        <button onClick={() => onSelect('Men')} className="bg-[#f0f8f5] rounded-[20px] py-3 px-2 shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex flex-col items-center justify-center hover:-translate-y-1 transition-all aspect-square relative w-full h-full border border-white/60">
          <div className="w-[42px] h-[42px] bg-[#ccede1] rounded-full flex items-center justify-center text-[20px] mb-2 shrink-0 pt-1 shadow-sm">
            👨
          </div>
          <h3 className="font-bold text-gray-900 text-[13px] leading-tight mb-0.5 whitespace-nowrap">Men's Wear</h3>
          <p className="text-[#0a8771] text-[9px] font-bold leading-none whitespace-nowrap">Men's Fashion</p>
        </button>

        {/* Women's Card */}
        <button onClick={() => onSelect('Women')} className="bg-[#fdf2f4] rounded-[20px] py-3 px-2 shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex flex-col items-center justify-center hover:-translate-y-1 transition-all aspect-square relative w-full h-full border border-white/60">
          <div className="w-[42px] h-[42px] bg-[#fad1d8] rounded-full flex items-center justify-center text-[20px] mb-2 shrink-0 pt-1 shadow-sm">
            👩
          </div>
          <h3 className="font-bold text-gray-900 text-[13px] leading-tight mb-0.5 whitespace-nowrap">Women's Wear</h3>
          <p className="text-[#e7536f] text-[9px] font-bold leading-none whitespace-nowrap">Women's Fashion</p>
        </button>

        {/* Kids' Card */}
        <button onClick={() => onSelect('Kids')} className="bg-[#fffcf0] rounded-[20px] py-3 px-2 shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex flex-col items-center justify-center hover:-translate-y-1 transition-all aspect-square relative w-full h-full border border-white/60">
          <div className="w-[42px] h-[42px] bg-[#feebad] rounded-full flex items-center justify-center text-[20px] mb-2 shrink-0 pt-1 shadow-sm">
            🧒
          </div>
          <h3 className="font-bold text-gray-900 text-[13px] leading-tight mb-0.5 whitespace-nowrap">Kids' Wear</h3>
          <p className="text-[#eeb215] text-[9px] font-bold leading-none whitespace-nowrap">Kids' Fashion</p>
        </button>

        {/* Family Card */}
        <button onClick={() => onSelect('Family')} className="bg-[#f1f6fb] rounded-[20px] py-3 px-2 shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex flex-col items-center justify-center hover:-translate-y-1 transition-all aspect-square relative w-full h-full border border-white/60">
          <div className="w-[42px] h-[42px] bg-[#d3e5f7] rounded-full flex items-center justify-center text-[20px] mb-2 shrink-0 pt-1 shadow-sm">
            👨‍👩‍👧
          </div>
          <h3 className="font-bold text-gray-900 text-[13px] leading-tight text-center mb-0.5 whitespace-nowrap">Family Shopping</h3>
          <p className="text-[#1b73d3] text-[9px] font-bold leading-none text-center whitespace-nowrap">For the Entire Family</p>
        </button>
      </div>

      {/* Features Bottom */}
      <div className="mt-3 px-4 flex justify-between items-start w-full relative z-20">
        <div className="flex items-start gap-1.5 flex-1 justify-center">
          <div className="bg-[#008f7a] rounded-full p-1 shrink-0 mt-0.5">
             <ShieldCheck size={14} className="text-white" strokeWidth={3} />
          </div>
          <div className="text-[9px] leading-[1.2] text-gray-700 max-w-[70px]">
            <span className="font-bold text-gray-900 block text-[10px] mb-0.5">Secure & Private</span>
            Your feedback is 100% confidential
          </div>
        </div>
        <div className="flex items-start gap-1.5 flex-1 justify-center">
          <div className="bg-[#008f7a] rounded-full p-1 shrink-0 mt-0.5">
             <Clock size={14} className="text-white" strokeWidth={3} />
          </div>
          <div className="text-[9px] leading-[1.2] text-gray-700 max-w-[70px]">
            <span className="font-bold text-gray-900 block text-[10px] mb-0.5">Quick & Easy</span>
            Takes only 20 seconds
          </div>
        </div>
        <div className="flex items-start gap-1.5 flex-1 justify-center">
          <div className="bg-[#008f7a] rounded-full p-1 shrink-0 mt-0.5">
             <Gift size={14} className="text-white" strokeWidth={3} />
          </div>
          <div className="text-[9px] leading-[1.2] text-gray-700 max-w-[70px]">
            <span className="font-bold text-gray-900 block text-[10px] mb-0.5">Better Experience</span>
            Helps us serve you even better
          </div>
        </div>
      </div>

      {/* Citykart Store Illustration */}
      <div className="relative flex-1 min-h-[90px] flex items-end justify-center mt-2 z-10 w-full overflow-hidden">
        {/* City skyline background */}
        <div className="absolute bottom-0 w-full h-[100px] flex items-end justify-center px-4 opacity-70 z-0">
            <div className="w-10 h-16 bg-[#cbe3e1] rounded-t mx-1"></div>
            <div className="w-14 h-24 bg-[#b4d6d4] rounded-t mx-1"></div>
            <div className="w-12 h-20 bg-[#cbe3e1] rounded-t mx-1"></div>
            <div className="w-[100px] h-[10px] mx-4"></div> {/* Spacer for store */}
            <div className="w-12 h-20 bg-[#b4d6d4] rounded-t mx-1"></div>
            <div className="w-14 h-[70px] bg-[#cbe3e1] rounded-t mx-1"></div>
        </div>

        {/* Trees */}
        <div className="absolute bottom-4 left-[20%] z-20 flex flex-col items-center">
            <div className="w-6 h-6 bg-[#66bb6a] rounded-full relative z-10"></div>
            <div className="w-8 h-8 bg-[#4caf50] rounded-full absolute top-2"></div>
            <div className="w-1.5 h-6 bg-[#795548] mt-2"></div>
        </div>
        <div className="absolute bottom-2 right-[25%] z-20 flex flex-col items-center">
            <div className="w-5 h-5 bg-[#66bb6a] rounded-full relative z-10"></div>
            <div className="w-7 h-7 bg-[#4caf50] rounded-full absolute top-2"></div>
            <div className="w-1 h-5 bg-[#795548] mt-2"></div>
        </div>

        {/* Main Storefront */}
        <div className="relative w-full max-w-[200px] h-[100px] flex items-end justify-center z-30 mb-2">
          {/* Left Wing */}
          <div className="w-12 h-16 bg-[#86bcbb] border-t-[6px] border-[#317774] shadow-md"></div>
          
          {/* Main Building */}
          <div className="w-28 h-24 bg-[#67a09f] shadow-xl border-t-[10px] border-[#317774] relative flex flex-col items-center z-20">
             {/* Signage */}
             <div className="mt-2 flex items-center justify-center p-0.5 w-[75px] h-[24px]">
                <img 
                  src="https://res.cloudinary.com/dtygcxcr1/image/upload/v1788423308/ChatGPT_Image_Sep_3_2026_01_44_37_PM_qbshel.png" 
                  alt="Citykart Logo" 
                  className="w-full h-full object-contain drop-shadow-sm"
                />
             </div>
             
             {/* Doors */}
             <div className="absolute bottom-0 w-16 h-10 border-t-2 border-x-2 border-[#b5d6d5] bg-[#8fc3c2] grid grid-cols-2">
                <div className="border-r border-[#b5d6d5]"></div>
                <div></div>
             </div>
          </div>
          
          {/* Right Wing */}
          <div className="w-12 h-16 bg-[#86bcbb] border-t-[6px] border-[#317774] shadow-md"></div>
        </div>
        
        {/* Ground */}
        <div className="absolute bottom-0 w-[150%] h-4 bg-gradient-to-t from-[#c4dfdc] to-transparent z-40 rounded-[100%] blur-[2px]"></div>
      </div>
    </div>
  );
};
