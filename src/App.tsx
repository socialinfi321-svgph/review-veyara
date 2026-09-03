import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MEN_CATEGORIES,
  WOMEN_CATEGORIES,
  KIDS_AGE_GROUPS,
  KIDS_PRODUCTS,
  COMMON_COLOURS,
  QUALITY_OPTIONS,
  PRICE_OPTIONS,
  STAFF_OPTIONS,
  STORE_EXPERIENCE_OPTIONS,
  OVERALL_EXPERIENCE_OPTIONS,
  IMPROVEMENT_OPTIONS,
} from './config/questions';
import { AppState, ShopperType, ReviewDrafts } from './types';
import { ProgressIndicator, ExperienceCard, OptionButton, ChipSelector } from './components/ui';
import { ArrowRight, ChevronLeft, Copy, Edit2, ExternalLink, RefreshCw, Star } from 'lucide-react';
import { StartScreen } from './components/StartScreen';
import { CategorySelection } from './components/CategorySelection';

const GOOGLE_REVIEW_URL = "https://g.page/r/placeholder/review";

export default function App() {
  const [step, setStep] = useState('START');
  const [history, setHistory] = useState<string[]>([]);
  const [state, setState] = useState<AppState>({ categories: [], products: [], colours: [] });
  const [drafts, setDrafts] = useState<ReviewDrafts | null>(null);
  const [selectedDraft, setSelectedDraft] = useState<'natural' | 'short' | 'polished'>('natural');
  const [editableReview, setEditableReview] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const updateState = (updates: Partial<AppState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const nextStep = (next: string) => {
    setHistory((prev) => [...prev, step]);
    setStep(next);
  };

  const goBack = () => {
    if (history.length > 0) {
      const newHistory = [...history];
      const prev = newHistory.pop()!;
      setHistory(newHistory);
      setStep(prev);
    }
  };

  const evaluateNextStep = (currentStep: string) => {
    let detailsCount = 0;
    if (state.quality || state.fit) detailsCount++;
    if (state.price) detailsCount++;
    if (state.staff) detailsCount++;
    if (state.storeExperience) detailsCount++;

    if (currentStep === 'PRODUCTS') {
      nextStep('COLOUR');
    } else if (currentStep === 'COLOUR') {
      nextStep('QUALITY');
    } else if (currentStep === 'QUALITY') {
      nextStep('PRICE');
    } else if (currentStep === 'PRICE') {
      if (detailsCount >= 2) nextStep('OVERALL');
      else nextStep('STAFF');
    } else if (currentStep === 'STAFF') {
      if (detailsCount >= 2) nextStep('OVERALL');
      else nextStep('STORE');
    } else if (currentStep === 'STORE') {
      nextStep('OVERALL');
    } else if (currentStep === 'OVERALL') {
      const isNegative = ['Average', 'Not good'].includes(state.overallExperience || '');
      const priceNegative = state.price && ['Thoda expensive', 'Expensive'].includes(state.price);
      const qualityNegative = state.quality && ['Average', 'Expected jaisa nahi'].includes(state.quality);
      
      if (isNegative || priceNegative || qualityNegative) {
        nextStep('IMPROVEMENT');
      } else {
        generateReviews();
      }
    } else if (currentStep === 'IMPROVEMENT') {
      generateReviews();
    }
  };

  const generateReviews = async () => {
    nextStep('GENERATING');
    setIsGenerating(true);
    try {
      const res = await fetch('/api/generate-reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state)
      });
      const data = await res.json();
      if (data.reviews && data.reviews.length >= 3) {
        setDrafts({
          natural: data.reviews[0],
          short: data.reviews[1],
          polished: data.reviews[2]
        });
        setEditableReview(data.reviews[0]);
        setStep('RESULT');
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error(err);
      setDrafts({
        natural: "Had a good experience at Citykart. The quality was nice and prices were reasonable.",
        short: "Good collection and reasonable prices at Citykart.",
        polished: "I recently visited Citykart and was pleased with the collection. The staff was helpful and overall it was a great shopping experience."
      });
      setEditableReview("Had a good experience at Citykart. The quality was nice and prices were reasonable.");
      setStep('RESULT');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async (toGoogle: boolean = false) => {
    try {
      await navigator.clipboard.writeText(editableReview);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
      if (toGoogle) {
        window.open(GOOGLE_REVIEW_URL, '_blank');
      }
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const renderHeader = () => (
    <header className="w-full p-4 flex items-center justify-between border-b border-white/20 bg-transparent sticky top-0 z-10">
      <div className="flex items-center">
        {history.length > 0 && step !== 'RESULT' && step !== 'GENERATING' && (
          <button onClick={goBack} className="p-2 -ml-2 mr-2 text-white/70 hover:text-white rounded-full hover:bg-white/10">
            <ChevronLeft size={24} />
          </button>
        )}
        <h1 className="text-xl font-black tracking-tighter text-white">CITYKART</h1>
      </div>
      {history.length > 0 && step !== 'RESULT' && step !== 'GENERATING' && (
        <ProgressIndicator total={6} current={Math.min(5, history.length)} />
      )}
    </header>
  );

  if (step === 'START') {
    return (
      <StartScreen onSelect={(type) => {
        updateState({ shopperType: type, categories: [], products: [] });
        setTimeout(() => {
          if (type === 'Kids') nextStep('KIDS_AGE');
          else if (type === 'Family') nextStep('FAMILY_WHO');
          else nextStep('CATEGORY');
        }, 200);
      }} />
    );
  }

  return (
    <div className="min-h-screen bg-[#004d4d] font-sans text-white flex flex-col relative overflow-hidden">
      <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#83C5BE] rounded-full blur-3xl opacity-30"></div>
      <div className="absolute -top-10 -left-10 w-64 h-64 bg-teal-300 rounded-full blur-3xl opacity-20"></div>

      <main className="flex-1 w-full max-w-md mx-auto flex flex-col relative z-10 bg-white/10 backdrop-blur-xl border-x border-white/20 shadow-2xl overflow-y-auto overflow-x-hidden">
        {renderHeader()}
        
        <AnimatePresence mode="wait">
          {step === 'KIDS_AGE' && (
            <ExperienceCard key="kids_age" title="Kis age group ke liye?" subtitle="Select age group">
              <div className="space-y-3">
                {KIDS_AGE_GROUPS.map(age => (
                  <OptionButton
                    key={age}
                    label={age}
                    selected={state.kidsAgeGroup === age}
                    onClick={() => {
                      updateState({ kidsAgeGroup: age });
                      setTimeout(() => nextStep('PRODUCTS'), 200);
                    }}
                  />
                ))}
              </div>
            </ExperienceCard>
          )}

          {step === 'FAMILY_WHO' && (
            <ExperienceCard key="family_who" title="Family mein kiski shopping hui?" subtitle="Select all that apply">
              <div className="space-y-3 mb-6">
                {['Men', 'Women', 'Kids'].map(who => (
                  <OptionButton
                    key={who}
                    label={who}
                    selected={(state.familyWho || []).includes(who)}
                    onClick={() => {
                      const current = state.familyWho || [];
                      const next = current.includes(who) ? current.filter(x => x !== who) : [...current, who];
                      updateState({ familyWho: next });
                    }}
                  />
                ))}
              </div>
              <button 
                disabled={!(state.familyWho?.length)}
                onClick={() => nextStep('FAMILY_MOST')}
                className="w-full py-4 bg-[#006D77] text-white rounded-xl font-bold text-lg disabled:opacity-50 transition-all shadow-lg"
              >
                Continue
              </button>
            </ExperienceCard>
          )}

          {step === 'FAMILY_MOST' && (
            <ExperienceCard key="family_most" title="Sabse zyada shopping kiski hui?" subtitle="Select one">
              <div className="space-y-3">
                {[...(state.familyWho || []), 'Sabki almost equal'].map(who => (
                  <OptionButton
                    key={who}
                    label={who}
                    selected={state.familyMost === who}
                    onClick={() => {
                      updateState({ familyMost: who });
                      setTimeout(() => {
                        if (who === 'Kids') nextStep('KIDS_AGE');
                        else if (who === 'Men' || who === 'Women') {
                          updateState({ shopperType: who as ShopperType });
                          nextStep('CATEGORY');
                        } else {
                          // Route to men or women default
                          updateState({ shopperType: 'Women' });
                          nextStep('CATEGORY');
                        }
                      }, 200);
                    }}
                  />
                ))}
              </div>
            </ExperienceCard>
          )}

          {step === 'CATEGORY' && (
            <ExperienceCard 
              key="category" 
              title="Kya liya?" 
              subtitle={
                <div className="flex flex-col items-center gap-1.5">
                  <span className="text-[#3ed0b4] font-semibold text-sm tracking-wide">Select category</span>
                </div>
              }
            >
              <CategorySelection
                categories={Object.keys(state.shopperType === 'Men' ? MEN_CATEGORIES : WOMEN_CATEGORIES)}
                onSelect={(cat) => {
                  updateState({ categories: [cat] });
                  setTimeout(() => nextStep('PRODUCTS'), 200);
                }}
              />
            </ExperienceCard>
          )}

          {step === 'PRODUCTS' && (
            <ExperienceCard key="products" title="Select Products" subtitle="Aap ek se zyada select kar sakte hain">
              <div className="space-y-6">
                {state.shopperType === 'Kids' ? (
                  <ChipSelector 
                    options={KIDS_PRODUCTS}
                    selected={state.products}
                    onToggle={(p) => {
                      const newProds = state.products.includes(p) ? state.products.filter(x => x !== p) : [...state.products, p];
                      updateState({ products: newProds });
                    }}
                  />
                ) : (
                  state.categories.map(cat => (
                    <div key={cat} className="space-y-3">
                      <h3 className="font-semibold text-white/70 text-sm tracking-wider uppercase">{cat}</h3>
                      <ChipSelector 
                        options={state.shopperType === 'Men' ? MEN_CATEGORIES[cat as keyof typeof MEN_CATEGORIES] : WOMEN_CATEGORIES[cat as keyof typeof WOMEN_CATEGORIES]}
                        selected={state.products}
                        onToggle={(p) => {
                          const newProds = state.products.includes(p) ? state.products.filter(x => x !== p) : [...state.products, p];
                          updateState({ products: newProds });
                        }}
                      />
                    </div>
                  ))
                )}
                
                <button 
                  disabled={state.products.length === 0}
                  onClick={() => evaluateNextStep('PRODUCTS')}
                  className="w-full py-4 bg-[#006D77] text-white rounded-xl font-bold text-lg disabled:opacity-50 transition-all flex justify-center items-center gap-2 shadow-lg"
                >
                  Continue <ArrowRight size={20} />
                </button>
              </div>
            </ExperienceCard>
          )}

          {step === 'COLOUR' && (
            <ExperienceCard key="colour" title="Colour kaisa tha?" subtitle="Optional">
              <div className="space-y-6">
                <ChipSelector 
                  options={COMMON_COLOURS}
                  selected={state.colours}
                  onToggle={(p) => {
                    const next = state.colours.includes(p) ? state.colours.filter(x => x !== p) : [...state.colours, p];
                    updateState({ colours: next });
                  }}
                />
                
                <button 
                  onClick={() => evaluateNextStep('COLOUR')}
                  className="w-full py-4 bg-[#006D77] text-white rounded-xl font-bold text-lg transition-all flex justify-center items-center gap-2 shadow-lg"
                >
                  Continue <ArrowRight size={20} />
                </button>
              </div>
            </ExperienceCard>
          )}

          {step === 'QUALITY' && (
            <ExperienceCard key="quality" title={`${state.products[0] || 'Product'} ka overall feel kaisa laga?`} subtitle="Quality & Fit">
              <div className="space-y-3">
                {QUALITY_OPTIONS.map(opt => (
                  <OptionButton
                    key={opt.value}
                    icon={opt.icon}
                    label={opt.label}
                    selected={state.quality === opt.value}
                    onClick={() => {
                      updateState({ quality: opt.value });
                      setTimeout(() => evaluateNextStep('QUALITY'), 200);
                    }}
                  />
                ))}
              </div>
            </ExperienceCard>
          )}

          {step === 'PRICE' && (
            <ExperienceCard key="price" title="Price kaisa laga?" subtitle="Value for money">
              <div className="space-y-3">
                {PRICE_OPTIONS.map(opt => (
                  <OptionButton
                    key={opt.value}
                    icon={opt.icon}
                    label={opt.label}
                    selected={state.price === opt.value}
                    onClick={() => {
                      updateState({ price: opt.value });
                      setTimeout(() => evaluateNextStep('PRICE'), 200);
                    }}
                  />
                ))}
              </div>
            </ExperienceCard>
          )}

          {step === 'STAFF' && (
            <ExperienceCard key="staff" title="Staff ka experience kaisa raha?" subtitle="Service & support">
              <div className="space-y-3">
                {STAFF_OPTIONS.map(opt => (
                  <OptionButton
                    key={opt.value}
                    icon={opt.icon}
                    label={opt.label}
                    selected={state.staff === opt.value}
                    onClick={() => {
                      updateState({ staff: opt.value });
                      setTimeout(() => evaluateNextStep('STAFF'), 200);
                    }}
                  />
                ))}
              </div>
            </ExperienceCard>
          )}

          {step === 'STORE' && (
            <ExperienceCard key="store" title="Store ka overall experience?" subtitle="Ambience">
              <div className="space-y-3">
                {STORE_EXPERIENCE_OPTIONS.map(opt => (
                  <OptionButton
                    key={opt.value}
                    icon={opt.icon}
                    label={opt.label}
                    selected={state.storeExperience === opt.value}
                    onClick={() => {
                      updateState({ storeExperience: opt.value });
                      setTimeout(() => evaluateNextStep('STORE'), 200);
                    }}
                  />
                ))}
              </div>
            </ExperienceCard>
          )}

          {step === 'OVERALL' && (
            <ExperienceCard key="overall" title="Overall Citykart experience?" subtitle="Rating">
              <div className="space-y-3">
                {OVERALL_EXPERIENCE_OPTIONS.map(opt => (
                  <OptionButton
                    key={opt.value}
                    icon={opt.icon}
                    label={opt.label}
                    selected={state.overallExperience === opt.value}
                    onClick={() => {
                      updateState({ overallExperience: opt.value });
                      setTimeout(() => evaluateNextStep('OVERALL'), 200);
                    }}
                  />
                ))}
              </div>
            </ExperienceCard>
          )}

          {step === 'IMPROVEMENT' && (
            <ExperienceCard key="improvement" title="Kis cheez ko better kiya ja sakta hai?" subtitle="Aap chahein to short mein bata sakte hain">
              <div className="space-y-6">
                <ChipSelector 
                  options={IMPROVEMENT_OPTIONS}
                  selected={state.improvementArea ? [state.improvementArea] : []}
                  onToggle={(p) => updateState({ improvementArea: p })}
                />
                
                <textarea 
                  className="w-full p-4 rounded-xl border border-white/20 bg-white/5 text-white placeholder-white/50 focus:border-[#83C5BE] focus:ring-1 focus:ring-[#83C5BE] min-h-[100px] resize-none"
                  placeholder="Any other comments? (Optional)"
                  value={state.optionalComment || ''}
                  onChange={(e) => updateState({ optionalComment: e.target.value })}
                />
                
                <button 
                  onClick={() => evaluateNextStep('IMPROVEMENT')}
                  className="w-full py-4 bg-[#006D77] text-white rounded-xl font-bold text-lg transition-all flex justify-center items-center gap-2 shadow-lg"
                >
                  Generate Review <ArrowRight size={20} />
                </button>
              </div>
            </ExperienceCard>
          )}

          {step === 'GENERATING' && (
            <ExperienceCard key="generating" title="Drafting your review..." subtitle="Please wait a moment">
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-16 h-16 border-4 border-white/20 border-t-[#83C5BE] rounded-full animate-spin"></div>
                <p className="mt-6 text-white/70 font-medium">Writing a natural review based on your feedback...</p>
              </div>
            </ExperienceCard>
          )}

          {step === 'RESULT' && drafts && (
            <ExperienceCard key="result" title="Aapka Review Ready Hai ✨" subtitle="Aapne jo bataya, usi se review banaya hai.">
              <div className="w-full flex flex-col space-y-6">
                {/* Tabs */}
                <div className="flex p-1 bg-white/10 rounded-xl space-x-1 border border-white/20">
                  {(['natural', 'short', 'polished'] as const).map(type => (
                    <button
                      key={type}
                      onClick={() => {
                        setSelectedDraft(type);
                        setEditableReview(drafts[type]);
                      }}
                      className={`flex-1 py-2 text-sm font-semibold rounded-lg capitalize transition-all ${
                        selectedDraft === type ? 'bg-[#006D77] shadow-lg text-white' : 'text-white/60 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                {/* Editable Area */}
                <div className="relative">
                  <textarea
                    value={editableReview}
                    onChange={(e) => setEditableReview(e.target.value)}
                    className="w-full p-4 pt-5 pb-8 min-h-[160px] bg-white/5 border border-white/20 rounded-2xl shadow-sm text-white leading-relaxed focus:border-[#83C5BE] focus:ring-1 focus:ring-[#83C5BE] outline-none resize-none"
                  />
                  <div className="absolute top-3 right-3 text-white/50">
                    <Edit2 size={16} />
                  </div>
                </div>

                {/* Success Message */}
                {copied && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-white/20 text-white rounded-xl text-center text-sm font-medium border border-white/30 backdrop-blur-md"
                  >
                    Review copy ho gaya. Google par Paste karke submit karein.
                  </motion.div>
                )}

                {/* Actions */}
                <div className="space-y-3">
                  <button
                    onClick={() => handleCopy(false)}
                    className="w-full py-4 flex justify-center items-center space-x-2 bg-white/10 border border-white/30 text-white rounded-xl font-bold text-lg hover:bg-white/20 transition-colors shadow-sm"
                  >
                    <Copy size={20} />
                    <span>Copy Review</span>
                  </button>

                  <button
                    onClick={() => handleCopy(true)}
                    className="w-full py-4 flex justify-center items-center space-x-2 bg-[#006D77] text-white rounded-xl font-bold text-lg shadow-lg hover:bg-[#005a63] transition-colors border border-transparent"
                  >
                    <Star size={20} className="fill-current" />
                    <span>Give Review on Google</span>
                    <ExternalLink size={18} className="ml-1 opacity-70" />
                  </button>
                </div>

                <button
                  onClick={() => {
                    setStep('START');
                    setHistory([]);
                    setState({ categories: [], products: [], colours: [] });
                  }}
                  className="mt-4 flex justify-center items-center space-x-2 text-white/60 hover:text-white"
                >
                  <RefreshCw size={16} />
                  <span className="text-sm font-medium">Start Over</span>
                </button>
              </div>
            </ExperienceCard>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}
