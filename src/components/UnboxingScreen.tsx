/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, AlertOctagon, RefreshCw, Send, Gift, Award, Star, Smile, Frown, Angry } from 'lucide-react';
import { WRAP_CHOICES } from '../data';
import { GameState, FashionItem } from '../types';

interface UnboxingScreenProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  onRestart: () => void;
}

export default function UnboxingScreen({ gameState, setGameState, onRestart }: UnboxingScreenProps) {
  // Game states during unboxing flow
  // 'intro' -> 'envelope' -> 'revealing_gifts' -> 'final_score'
  const [unboxingStep, setUnboxingStep] = useState<'intro' | 'envelope' | 'gifts' | 'result'>('intro');
  const [currentGiftIndex, setCurrentGiftIndex] = useState<number>(0);
  const [temporaryLove, setTemporaryLove] = useState<number>(50); // Animated relationship tracker
  const [unboxingLog, setUnboxingLog] = useState<string[]>([]);
  const [currentReactionDialogue, setCurrentReactionDialogue] = useState<string>('');
  
  const pruneImgSrc = '/src/assets/images/prune_darker_brunette_1781299004971.jpg';
  
  // Calculate wrapper stats
  const wrap = WRAP_CHOICES.find(w => w.id === gameState.wrapChoice) || WRAP_CHOICES[1];

  // Initiate unboxing of the package
  const handleStartUnboxing = () => {
    // Add wrap effects to start points
    const newPoints = Math.max(0, Math.min(100, 50 + wrap.loveEffect));
    setTemporaryLove(newPoints);
    setCurrentReactionDialogue(wrap.reaction);
    setUnboxingStep('envelope');
  };

  // Continue to reading the greeting card
  const handleReadEnvelope = () => {
    setCurrentReactionDialogue(`« Oh... un petit mot manuscrit de ta si jolie écriture ! Laisse-moi lire...\n\n"${gameState.cardMessage}"\n\nC\'est tellement adorable JA ! Tu marques d\'excellents points romantiques là... 💕 »`);
    setUnboxingStep('gifts');
    setCurrentGiftIndex(0);
  };

  // Unbox next gift
  const handleRevealCurrentGift = () => {
    if (gameState.selectedItems.length === 0) return;
    
    const currentItem = gameState.selectedItems[currentGiftIndex];
    let pointsChange = currentItem.relationshipEffect;
    
    setTemporaryLove(prev => {
      const updated = Math.max(0, Math.min(100, prev + pointsChange));
      return updated;
    });

    // Create log message
    setUnboxingLog(prev => [...prev, `${currentItem.name} : ${pointsChange > 0 ? '+' : ''}${pointsChange} Points d'Amour`]);
    setCurrentReactionDialogue(currentItem.successReaction);

    // If it's the last gift, move step
    if (currentGiftIndex >= gameState.selectedItems.length - 1) {
      setTimeout(() => {
        // Prepare final calculation in actual gameState
        const totalWrapPoints = wrap.loveEffect;
        const totalItemsPoints = gameState.selectedItems.reduce((acc, item) => acc + item.relationshipEffect, 0);
        const finalCalculatedLove = Math.max(0, Math.min(100, 50 + totalWrapPoints + totalItemsPoints));
        
        setGameState(prev => ({
          ...prev,
          lovePoints: finalCalculatedLove
        }));
      }, 500);
    }
  };

  const handleNextGiftOrEnd = () => {
    if (currentGiftIndex < gameState.selectedItems.length - 1) {
      setCurrentGiftIndex(prev => prev + 1);
      // reset dialogue with anticipation
      const nextItemName = gameState.selectedItems[currentGiftIndex + 1].name;
      setCurrentReactionDialogue(`Elle glisse délicatement sa main dans le tiroir pour en sortir le cadeau suivant... Qu'y a-t-il dedans ? ✨`);
    } else {
      setUnboxingStep('result');
    }
  };
    // Get expressive character visual indicators based on score
  const getPruneMoodFeedback = () => {
    if (temporaryLove <= 35) {
      return {
        vibe: 'En Rogne ! 😠',
        emoji: '🤬',
        color: 'border-red-500 text-red-700 bg-red-50 font-black shadow-2xs',
        textColor: 'text-red-600',
        quote: 'Prune croise les bras, un sourcil froncé d\'indignation. L\'atmosphère est extrêmement électrique...'
      };
    } else if (temporaryLove < 75) {
      return {
        vibe: 'Mitigée... 😐',
        emoji: '🙂',
        color: 'border-amber-500 text-amber-700 bg-amber-50 font-black shadow-2xs',
        textColor: 'text-amber-600',
        quote: 'Prune sourit poliment pour ne pas te blesser, mais ses yeux trahissent un léger manque d\'enthousiasme...'
      };
    } else {
      return {
        vibe: 'Amoureuse Fou ! 😍✨',
        emoji: '💖',
        color: 'border-vibrant-pink text-vibrant-cherry bg-vibrant-cream font-black border-2 shadow-2xs',
        textColor: 'text-vibrant-hotpink',
        quote: 'Prune a des étoiles plein les yeux, elle exulte de joie et vous jette des regards d\'admiration totale !'
      };
    }
  };

  const mood = getPruneMoodFeedback();

  // Multi-ending selection based on final relationship meter
  const getEndGameReport = () => {
    const finalScore = temporaryLove;
    
    if (finalScore <= 35) {
      return {
        title: 'CATASTROPHE : PRUNE EN ROGNE !',
        rating: 'Rang F (Fiasco Fashion)',
        description: 'La soirée tourne au drame. Face à ces cadeaux de mauvais goût ou à des couleurs qu\'elle a explicitement proscrites, Prune explose de colère. « Tu ne me connais pas JA ! Tu n\'as fait aucun effort ! » Elle range ses affaires, appelle une copine en râlant, et quitte le restaurant chic en vous laissant une addition de 180€ à payer seul. Demain sera très froid...',
        icon: <Angry size={48} className="text-red-500" />,
        color: 'from-red-100 to-red-50 border-red-400 text-red-950 border-2'
      };
    } else if (finalScore < 75) {
      return {
        title: 'PASSABLE : COMPROMIS CHIC',
        rating: 'Rang B (Compromis Tempéré)',
        description: 'Prune est douce mais lucide. Elle vous embrasse poliment en vous murmurant : « Merci mon chou d\'amour, c\'est mignon ». Néanmoins, deux heures après le resto, elle a déjà pris la boîte en photo et envoyé la facture à Léa pour aller faire des échanges en boutique de mode dès demain matin. L\'amour est préservé, mais vos goûts artistiques restent sérieusement à prouver !',
        icon: <Smile size={48} className="text-amber-500" />,
        color: 'from-amber-100 to-amber-50 border-amber-300 text-amber-950 border-2'
      };
    } else {
      return {
        title: 'TRIOMPHE : LE ROI DU CADEAU !',
        rating: 'Rang SSS (Icône de la Mode)',
        description: 'C’est un sans-faute spectaculaire ! Prune est sur un petit nuage. Elle enfile immédiatement son nouveau collier Émeraude et ses lunettes rétro rétro sous les yeux ébahis des autres clients du restaurant. Elle publie une avalanche de stories Instagram légendaires légendées : « Mon JA est définitivement le meilleur boyfriend de la Terre ! 😍👑 #LuckyMe ». Tu as conquis son cœur de fashionista compulsive !',
        icon: <Award size={48} className="text-vibrant-cherry" />,
        color: 'from-vibrant-cream to-[#FFF5F7] border-vibrant-pink text-vibrant-charcoal border-2'
      };
    }
  };

  const ending = getEndGameReport();

  return (
    <div id="unboxing-screen-root" className="min-h-screen bg-gradient-to-tr from-vibrant-cream via-vibrant-peach to-vibrant-yellow text-vibrant-charcoal flex flex-col items-center justify-center py-10 px-4 md:px-8 overflow-y-auto">
      <motion.div
        id="unboxing-container"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl bg-white border-4 border-vibrant-pink rounded-[32px] p-6 md:p-8 flex flex-col md:flex-row gap-8 shadow-2xl relative overflow-hidden"
      >
        {/* Decorative background overlay */}
        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(#FF8EAA_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>

        {/* Subtle romantic candle overlay lighting background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-vibrant-pink/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Left Column: Prune Portrait and Live Relationship meter */}
        <div className="w-full md:w-5/12 flex flex-col items-center gap-4 border-b md:border-b-0 md:border-r border-vibrant-pink/10 pb-6 md:pb-0 md:pr-8 z-10">
          <div className="relative w-full aspect-square md:aspect-3/4 rounded-2xl overflow-hidden border-4 border-vibrant-pink bg-[#FFF5F7] shadow-lg">
            <img 
              src={pruneImgSrc} 
              alt="Prune" 
              className="w-full h-full object-cover object-top"
              referrerPolicy="no-referrer"
            />
            {/* Expressive Mood Badge overlaid on portrait */}
            <div className={`absolute top-3 left-3 px-3 py-1.5 rounded-full text-[11px] font-bold border flex items-center gap-1.5 backdrop-blur-md shadow-md ${mood.color}`}>
              <span>{mood.emoji}</span>
              <span>{mood.vibe}</span>
            </div>
          </div>

          {/* Relation score meter indicator */}
          <div className="w-full text-left">
            <div className="flex justify-between items-center text-xs mb-1 font-mono font-bold">
              <span className="text-zinc-500">NIVEAU D'AMOUR DE PRUNE :</span>
              <span className={`${mood.textColor} tracking-wider font-extrabold`}>{temporaryLove}%</span>
            </div>
            
            {/* Interactive Progress Bar */}
            <div className="w-full h-3.5 bg-vibrant-cream rounded-full overflow-hidden p-0.5 border-2 border-vibrant-pink/25">
              <motion.div
                initial={{ width: '50%' }}
                animate={{ width: `${temporaryLove}%` }}
                className="h-full bg-gradient-to-r from-vibrant-hotpink via-vibrant-cherry to-red-600 rounded-full"
                transition={{ type: "spring", stiffness: 60 }}
              />
            </div>
            <p className="text-[10px] text-zinc-500 font-semibold text-center mt-1.5 leading-relaxed">
              {mood.quote}
            </p>
          </div>
        </div>

        {/* Right Column: Interaction Story Canvas */}
        <div className="flex-1 flex flex-col text-left justify-between gap-6 z-10">
          <AnimatePresence mode="wait">
            {unboxingStep === 'intro' && (
              // STEP 1: WELCOME SCREEN
              <motion.div
                key="step-intro"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4 flex flex-col justify-between h-full"
              >
                <div>
                  <span className="text-[10px] font-black text-vibrant-cherry uppercase tracking-widest block font-sans">
                    L'Heure Fatidique - 20:00
                  </span>
                  <h2 className="text-2xl md:text-3xl font-serif font-black text-vibrant-charcoal mt-1.5 mb-1.5">
                    Le Dîner d'Anniversaire Chic 🕯️🍷
                  </h2>
                  <p className="text-xs text-vibrant-charcoal/85 leading-relaxed font-sans font-semibold">
                    Vous êtes assis en tête-à-tête dans cet authentique bistrot parisien haut de gamme. La bougie crépite, Prune est splendide... Elle pose son sac à main, vous regarde s'installer et trépigne d'impatience !
                  </p>
                </div>

                <div className="bg-[#FFF5F7] p-4 rounded-xl border-2 border-vibrant-pink/15 text-xs italic text-vibrant-charcoal font-semibold shadow-2xs">
                  « Bonsoir mon petit chéri ! J'avais tellement hâte d'être à ce soir, tu es divin ! Allez, ne me fais pas attendre plus longtemps... Je meure d'envie de découvrir ce que tu as déniché pour moi ! »
                </div>

                <div className="border-t border-vibrant-pink/10 pt-5 mt-4 flex justify-end">
                  <button
                    onClick={handleStartUnboxing}
                    className="w-full sm:w-auto py-3.5 px-8 bg-vibrant-hotpink hover:bg-vibrant-cherry text-white hover:border-white border-2 border-transparent font-black text-xs tracking-wide cursor-pointer flex items-center justify-center gap-2 rounded-xl shadow-md transition-all"
                  >
                    Offrir la boîte d'Anniversaire 🎁
                  </button>
                </div>
              </motion.div>
            )}

            {unboxingStep === 'envelope' && (
              // STEP 2: EMBALLAGE FEEDBACK
              <motion.div
                key="step-envelope"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4 flex flex-col justify-between h-full"
              >
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block">Présentation du Paquet</span>
                  <h3 className="font-serif font-black text-xl text-vibrant-charcoal mt-1">Reconnaissance de l'emballage :</h3>
                  <p className="text-xs text-zinc-500 mt-1 leading-normal font-semibold">
                    Son regard se pose d'abord sur la boîte que vous lui tendez...
                  </p>
                </div>

                <div className="bg-amber-100/90 border-2 border-amber-300 p-4 rounded-xl text-xs font-serif leading-relaxed italic text-amber-950">
                  <p className="italic">{currentReactionDialogue}</p>
                </div>

                <div className="border-t border-vibrant-pink/10 pt-5 flex justify-end">
                  <button
                    onClick={handleReadEnvelope}
                    className="w-full sm:w-auto py-3.5 px-8 bg-vibrant-hotpink hover:bg-vibrant-cherry text-white hover:border-white border-2 border-transparent font-black rounded-xl text-xs tracking-wide cursor-pointer shadow-md transition-all"
                  >
                    Décacheter la carte manuscrite ✉️
                  </button>
                </div>
              </motion.div>
            )}

            {unboxingStep === 'gifts' && (
              // STEP 3: REVEALING THE GIFTS SEQUENCE
              <motion.div
                key="step-gifts"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4 flex flex-col justify-between h-full"
              >
                <div>
                  <span className="text-[10px] font-black uppercase text-zinc-500 font-mono tracking-widest">
                    Cadeau {currentGiftIndex + 1} de {gameState.selectedItems.length}
                  </span>
                  <h3 className="font-serif font-black text-xl text-vibrant-charcoal mt-1">
                    Prune déballe : <span className="text-vibrant-cherry font-black">"{gameState.selectedItems[currentGiftIndex].name}"</span>
                  </h3>
                </div>

                <div className="bg-vibrant-cream border-2 border-vibrant-pink/15 p-4 rounded-xl text-xs min-h-[140px] flex flex-col justify-between gap-4 font-semibold text-vibrant-charcoal">
                  <p className="italic leading-relaxed">
                    {currentReactionDialogue || "Elle retire doucement l'emballage de soie avec excitation..."}
                  </p>
                  
                  {/* Real-time score indicator */}
                  {!currentReactionDialogue && (
                    <div className="flex justify-center py-4">
                      <button
                        onClick={handleRevealCurrentGift}
                        className="py-2.5 px-6 bg-vibrant-hotpink hover:bg-vibrant-cherry text-white font-black hover:border-white border-2 border-transparent rounded-lg text-xs font-mono flex items-center gap-1.5 cursor-pointer shadow-xs transition-all"
                      >
                        <Gift size={13} className="text-white" /> Sortir l'article du paquet d'anniversaire !
                      </button>
                    </div>
                  )}
                </div>

                {currentReactionDialogue && (
                  <div className="border-t border-vibrant-pink/10 pt-5 flex justify-between items-center">
                    <span className="text-[10px] text-zinc-500 font-mono font-black">
                      Restant : {gameState.selectedItems.length - currentGiftIndex - 1} cadeaux
                    </span>
                    <button
                      onClick={handleNextGiftOrEnd}
                      className="py-2.5 px-6 bg-vibrant-hotpink hover:bg-vibrant-cherry text-white hover:border-white border-2 border-transparent font-black rounded-lg text-xs font-sans cursor-pointer transition-all shadow-xs"
                    >
                      {currentGiftIndex < gameState.selectedItems.length - 1 ? 'Continuer le déballage ➔' : 'Découvrir le verdict de la soirée ! 🍾'}
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {unboxingStep === 'result' && (
              // STEP 4: FINAL MULTI-ENDING REPORT
              <motion.div
                key="step-result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4 flex flex-col justify-between h-full"
              >
                <div>
                  <span className="text-[10px] font-black uppercase text-vibrant-cherry tracking-widest flex items-center gap-1">
                    <Star size={10} className="fill-vibrant-cherry" /> Épilogue de l'Anniversaire
                  </span>
                  <h3 className="font-serif font-black text-2xl text-vibrant-charcoal mt-1">Le Verdict de Prune</h3>
                </div>

                {/* Styled Outcome Box based on Ending */}
                <div className={`p-5 rounded-2xl border flex flex-col md:flex-row gap-4 items-start ${ending.color}`}>
                  <div className="p-3 bg-white/40 rounded-xl border border-vibrant-pink/10 self-center md:self-start shadow-2xs">
                    {ending.icon}
                  </div>
                  <div className="flex-1 space-y-1.5 text-xs text-left leading-relaxed">
                    <h4 className="font-extrabold text-vibrant-charcoal text-sm tracking-wide">{ending.title}</h4>
                    <p className="text-zinc-500 font-bold uppercase text-[10px] tracking-widest">{ending.rating}</p>
                    <p className="text-vibrant-charcoal font-semibold mt-2">{ending.description}</p>
                  </div>
                </div>

                {/* Score Log stats list */}
                <div className="bg-[#F7F1E3] p-4 border-2 border-vibrant-pink/15 rounded-xl text-vibrant-charcoal">
                  <span className="text-[10px] font-mono text-vibrant-hotpink block uppercase font-bold mb-2">Synthèse de votre score shopping</span>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between text-zinc-600 font-semibold text-[11px]">
                      <span>Points de relation initiaux :</span>
                      <span className="font-mono font-bold">50</span>
                    </div>
                    <div className="flex justify-between text-zinc-600 font-semibold text-[11px]">
                      <span>Emballage du colis ({wrap.name}) :</span>
                      <span className="font-mono text-emerald-850 font-black">+{wrap.loveEffect}</span>
                    </div>
                    {unboxingLog.map((log, i) => (
                      <div key={i} className="flex justify-between text-zinc-600 font-semibold text-[11px]">
                        <span>Cadeau {i + 1} :</span>
                        <span className="font-mono font-black">{log.split(':')[1]?.trim() || log}</span>
                      </div>
                    ))}
                    <div className="border-t-2 border-vibrant-pink/10 mt-2 pt-1.5 flex justify-between font-black text-sm">
                      <span className="text-vibrant-charcoal">Affection finale cumulée :</span>
                      <span className={`${mood.textColor} font-mono font-black text-base`}>{temporaryLove}%</span>
                    </div>
                  </div>
                </div>

                {/* Retry action buttons */}
                <div className="border-t-2 border-vibrant-pink/10 pt-5 flex flex-col sm:flex-row justify-end gap-3 mt-4">
                  <button
                    onClick={onRestart}
                    className="px-6 py-3 bg-vibrant-clay hover:bg-vibrant-pink text-vibrant-charcoal hover:text-white rounded-xl text-xs font-black transition-all border-2 border-transparent shadow-xs cursor-pointer"
                  >
                    <RefreshCw size={14} /> Recommencer la Quête
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
