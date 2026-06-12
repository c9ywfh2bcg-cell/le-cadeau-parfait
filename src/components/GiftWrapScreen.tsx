/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Gift, Edit3, ArrowRight, Heart, Sparkles, Check, Paperclip } from 'lucide-react';
import { WRAP_CHOICES, CARD_SUGGESTIONS } from '../data';
import { GameState } from '../types';

interface GiftWrapScreenProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

export default function GiftWrapScreen({ gameState, setGameState }: GiftWrapScreenProps) {
  const [selectedWrap, setSelectedWrap] = useState<'cheap' | 'glam' | 'royal'>('glam');
  const [customCardText, setCustomCardText] = useState<string>(CARD_SUGGESTIONS[0]);
  
  const luxuryGiftImage = '/src/assets/images/luxury_gift_1781298079434.jpg';

  const handleSelectWrap = (wrapId: 'cheap' | 'glam' | 'royal', costDifference: number) => {
    // Check if player has enough budget
    const currentWrap = WRAP_CHOICES.find(w => w.id === gameState.wrapChoice);
    const prevCost = currentWrap ? currentWrap.cost : 15; // default is 'glam' which is €15
    const chosenWrap = WRAP_CHOICES.find(w => w.id === wrapId)!;
    const netCostChange = chosenWrap.cost - prevCost;

    if (gameState.budget - netCostChange < 0) {
      alert("Aïe ! Tu n'as pas assez d'argent restant pour t'offrir cet emballage luxueux ! Relaisse pour un emballage plus simple.");
      return;
    }

    setSelectedWrap(wrapId);
  };

  const handleFinishWrapping = () => {
    const finalWrap = WRAP_CHOICES.find(w => w.id === selectedWrap)!;
    
    // Calculate final budget after wrapping cost is locked in
    const prevWrap = WRAP_CHOICES.find(w => w.id === gameState.wrapChoice);
    const prevCost = prevWrap ? prevWrap.cost : 0; 
    const finalBudget = gameState.budget - (finalWrap.cost - prevCost);

    setGameState(prev => ({
      ...prev,
      budget: finalBudget,
      wrapChoice: selectedWrap,
      cardMessage: customCardText.trim() || "Joyeux anniversaire Prune ! Joyeux anniversaire de la part de ton JA qui t'aime !",
      screen: 'unboxing'
    }));
  };

  return (
    <div id="wrap-screen-root" className="min-h-screen bg-gradient-to-b from-vibrant-yellow via-vibrant-cream to-vibrant-peach text-vibrant-charcoal py-8 px-4 flex flex-col items-center justify-center font-sans overflow-y-auto">
      <motion.div
        id="wrap-card-container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl bg-white border-4 border-vibrant-pink rounded-[32px] p-6 md:p-8 shadow-2xl flex flex-col md:flex-row gap-8 relative overflow-hidden"
      >
        {/* Subtle Decorative pattern overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FF8EAA_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>

        {/* Subtle glowing ambient lighting */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-vibrant-pink/15 rounded-full blur-3xl"></div>

        {/* Left Column: Visual Asset Preview */}
        <div className="w-full md:w-5/12 flex flex-col items-center gap-4 z-10">
          <div className="w-full aspect-square md:aspect-4/5 rounded-2xl overflow-hidden border-4 border-vibrant-pink bg-[#FFF5F7] shadow-inner relative group">
            <img 
              src={luxuryGiftImage} 
              alt="Luxury Wrap Gift Box" 
              className="w-full h-full object-cover transition duration-500 group-hover:scale-103"
              referrerPolicy="no-referrer"
            />
            {/* Overlay visual badge */}
            <div className="absolute top-3 left-3 bg-vibrant-cherry text-white px-3 py-1 rounded-full text-[10px] font-black border-2 border-white flex items-center gap-1 shadow-md">
              <Sparkles size={10} /> Paquet de Rêve Étoilé
            </div>
          </div>

          {/* Solde Summary item detail block */}
          <div className="bg-[#F7F1E3] p-4 border-2 border-vibrant-pink/20 rounded-xl w-full text-left shadow-2xs">
            <p className="text-[10px] uppercase font-mono tracking-wider text-vibrant-hotpink font-black block mb-2">Contenu de ton Colis</p>
            <div className="space-y-1.5 font-sans">
              {gameState.selectedItems.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs text-vibrant-charcoal font-bold">
                  <span className="truncate max-w-[180px]">🎁 {item.name}</span>
                  <span className="font-mono text-zinc-500 font-extrabold">{item.price}€</span>
                </div>
              ))}
              <div className="border-t-2 border-vibrant-pink/15 pt-2 flex justify-between text-xs font-black text-vibrant-charcoal">
                <span>Solde restant de JA :</span>
                <span className="font-mono text-emerald-700">
                  {gameState.budget - (WRAP_CHOICES.find(w => w.id === selectedWrap)!.cost)}€
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Wrapping and Card selectors */}
        <div className="flex-1 flex flex-col text-left justify-between gap-6 z-10">
          <div>
            <span className="text-[10px] bg-vibrant-peach/30 text-vibrant-cherry font-black tracking-widest px-3 py-1 rounded-full uppercase border border-vibrant-peach/50 inline-block">
              Étape d'Excellence
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-black text-vibrant-charcoal mt-2 mb-1.5">
              L'Art du Paquet Cadeau
            </h2>
            <p className="text-xs text-vibrant-charcoal/70 leading-relaxed font-semibold">
              Prune adore le style, mais l'emballage est le premier contact visuel ! Un beau coffret prédispose son niveau d'amour en votre faveur.
            </p>

            {/* Wrapping selector modules */}
            <div className="flex flex-col gap-3 mt-5">
              <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block font-sans">1. Choisir l'Emballage</span>
              {WRAP_CHOICES.map(choice => {
                const isActive = selectedWrap === choice.id;
                return (
                  <div
                    key={choice.id}
                    onClick={() => handleSelectWrap(choice.id as 'cheap' | 'glam' | 'royal', choice.cost)}
                    className={`p-3.5 rounded-2xl border-2 cursor-pointer transition flex justify-between items-center ${
                      isActive 
                        ? 'bg-vibrant-cream border-vibrant-hotpink shadow-2xs' 
                        : 'bg-[#FFF5F7]/30 border-vibrant-pink/25 hover:border-vibrant-pink/60'
                    }`}
                  >
                    <div className="flex-1 pr-4">
                      <div className="flex items-center gap-1.5">
                        <span className="font-black text-xs text-vibrant-charcoal">{choice.name}</span>
                        {choice.cost > 0 && (
                          <span className="bg-emerald-50 text-emerald-700 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border-2 border-emerald-300">
                            +{choice.cost}€
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-zinc-500 mt-1 leading-normal font-medium">{choice.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {isActive ? (
                        <div className="w-5 h-5 rounded-full bg-vibrant-hotpink flex items-center justify-center text-white">
                          <Check size={12} strokeWidth={3} />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-vibrant-pink/30"></div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Handwritten Greeting card editor */}
            <div className="flex flex-col gap-3.5 mt-6">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block font-sans">
                  2. Rédiger un Petit Mot Doux
                </span>
                <span className="text-[10px] text-zinc-500 font-extrabold italic block">Écrit à la main</span>
              </div>

              {/* Textarea card box container with lined paper visual styling */}
              <div className="bg-amber-100/95 p-4 rounded-xl text-neutral-900 border-2 border-amber-300 shadow-sm relative relative-lined-paper">
                <div className="absolute top-3 right-3 text-amber-900/80 opacity-60">
                  <Edit3 size={14} />
                </div>
                <textarea
                  value={customCardText}
                  onChange={(e) => setCustomCardText(e.target.value)}
                  placeholder="Écris un message romantique plein de douceur pour Prune..."
                  className="w-full h-24 bg-transparent border-0 ring-0 focus:ring-0 focus:border-0 resize-none outline-none text-xs font-serif leading-relaxed italic text-amber-950"
                  maxLength={250}
                />
                <div className="text-[9px] text-amber-900/60 text-right mt-1 font-mono">
                  {customCardText.length}/250 caractères
                </div>
              </div>

              {/* Suggestion list */}
              <div className="flex flex-wrap gap-2">
                {CARD_SUGGESTIONS.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => setCustomCardText(suggestion)}
                    className="text-[10px] font-black bg-vibrant-cream border-2 border-vibrant-pink/20 hover:border-vibrant-hotpink text-vibrant-charcoal px-3 py-1 rounded-full transition cursor-pointer text-left truncate max-w-[280px]"
                  >
                    Mot doux {index + 1} ✍️
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Trigger Row */}
          <div className="border-t-2 border-vibrant-pink/15 pt-5 mt-auto flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-[10px] text-zinc-500 italic font-bold flex items-center gap-1">
              <Paperclip size={10} className="text-vibrant-hotpink" /> Léa murmure : « Prune adore les mots de cire dorés... »
            </p>
            
            <button
              id="finalize-and-unbox-button"
              onClick={handleFinishWrapping}
              className="w-full sm:w-auto py-3 px-8 bg-vibrant-hotpink hover:bg-vibrant-cherry text-white hover:border-white border-2 border-transparent rounded-xl font-black font-sans text-xs tracking-wide shadow-md flex justify-center items-center gap-1.5 cursor-pointer transition-all"
            >
              Aller fêter son Anniversaire ! 🎉
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
