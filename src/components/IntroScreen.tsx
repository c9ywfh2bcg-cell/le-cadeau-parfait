/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Heart, CreditCard, ShoppingBag, Gift, ArrowRight } from 'lucide-react';
import { GameState } from '../types';

interface IntroScreenProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

export default function IntroScreen({ gameState, setGameState }: IntroScreenProps) {
  const pruneImgSrc = '/src/assets/images/prune_darker_brunette_1781299004971.jpg';
  const jaImgSrc = '/src/assets/images/ja_portrait_1781298050523.jpg';

  const handleNext = () => {
    setGameState(prev => ({ ...prev, screen: 'map', hasSeenIntro: true }));
  };

  return (
    <div id="intro-screen-root" className="min-h-screen bg-gradient-to-b from-vibrant-yellow via-vibrant-cream to-vibrant-peach text-vibrant-charcoal flex flex-col items-center justify-center py-10 px-4 md:px-8 overflow-y-auto">
      <motion.div 
        id="intro-card-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl bg-white border-4 border-vibrant-pink rounded-[32px] p-6 md:p-10 shadow-2xl flex flex-col gap-8 relative overflow-hidden"
      >
        {/* Subtle Decorative pattern overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FF8EAA_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>

        {/* Decorative gradient blobs */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-vibrant-pink/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-vibrant-peach/15 rounded-full blur-3xl"></div>

        {/* Header */}
        <div className="text-center flex flex-col items-center gap-2 z-10">
          <span className="text-xs bg-vibrant-hotpink/10 text-vibrant-hotpink font-bold tracking-widest px-3 py-1 rounded-full uppercase border-2 border-vibrant-hotpink/20">
            L'Histoire de JA & Prune
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-black tracking-tight mt-1 text-transparent bg-clip-text bg-gradient-to-r from-vibrant-cherry via-vibrant-hotpink to-vibrant-peach">
            Opération Cadeau Parfait
          </h1>
          <p className="text-xs md:text-sm text-vibrant-charcoal/70 max-w-xl mt-1 leading-relaxed">
            Demain, c'est l'anniversaire de Prune. Elle adore la mode et a des exigences... très élevées !
          </p>
        </div>

        {/* Characters Presentation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center z-10">
          {/* JA Portrait Column */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center gap-4 bg-[#FFF5F7] p-4 rounded-2xl border-2 border-vibrant-pink/30 shadow-xs"
          >
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-vibrant-pink flex-shrink-0 shadow-md relative bg-neutral-150">
              <img 
                src={jaImgSrc} 
                alt="JA" 
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-1 right-1 text-base">👦🏾</span>
            </div>
            <div className="text-center sm:text-left">
              <h3 className="font-extrabold text-lg text-vibrant-charcoal">JA (Petit Ami)</h3>
              <p className="text-[11px] text-zinc-500 uppercase font-black tracking-widest mt-0.5">Le Petit Ami Sous Pression</p>
              <p className="text-xs text-vibrant-charcoal/80 mt-2 leading-relaxed">
                Attentionné, généreux et déterminé à offrir la plus belle des soirées. Son compte bancaire est prêt et son cœur bat à cent à l'heure !
              </p>
            </div>
          </motion.div>

          {/* Prune Portrait Column */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 bg-[#FFF5F7] p-4 rounded-2xl border-2 border-vibrant-pink/30 shadow-xs"
          >
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-vibrant-hotpink flex-shrink-0 shadow-md relative bg-neutral-150">
              <img 
                src={pruneImgSrc} 
                alt="Prune" 
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-1 right-1 text-base">👑</span>
            </div>
            <div className="text-center sm:text-left">
              <h3 className="font-extrabold text-lg text-vibrant-hotpink">Prune (Héroïne)</h3>
              <p className="text-[11px] text-vibrant-hotpink/80 uppercase font-black tracking-widest mt-0.5">La Reine du Shopping</p>
              <p className="text-xs text-vibrant-charcoal/80 mt-2 leading-relaxed">
                Une fashionista de 20 ans passionnée, exigeante, acheteuse compulsive et accro au luxe. Elle s'attend au cadeau idéal... Ne pas la décevoir au risque de la mettre dans une rogne mortelle !
              </p>
            </div>
          </motion.div>
        </div>

        {/* Gameplay Rules Indicator Block */}
        <div className="bg-[#F7F1E3] border-2 border-vibrant-pink/30 p-5 rounded-2xl z-10">
          <h4 className="font-black text-sm text-vibrant-cherry mb-3 flex items-center gap-1.5 justify-center md:justify-start">
            <Gift size={16} /> Comment Jouer ?
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs leading-relaxed text-vibrant-charcoal/90">
            <div className="flex flex-col gap-1 items-center md:items-start text-center md:text-left">
              <span className="font-black text-vibrant-cherry flex items-center gap-1">
                <CreditCard size={14} className="text-vibrant-cherry" /> 1. Gère Ton Budget
              </span>
              <p className="text-vibrant-charcoal/70">JA dispose de seulement <strong>600€</strong>. Il doit acheter entre 2 et 3 cadeaux de manière stratégique sans vider son portefeuille.</p>
            </div>
            <div className="flex flex-col gap-1 items-center md:items-start text-center md:text-left">
              <span className="font-black text-vibrant-hotpink flex items-center gap-1">
                <ShoppingBag size={14} className="text-vibrant-hotpink" /> 2. Espionne les Indices
              </span>
              <p className="text-vibrant-charcoal/70">Utilise le smartphone de JA pour analyser ses posts Instagram ou discute avec Léa (sa BFF) pour connaître ses rêves et proscriptions.</p>
            </div>
            <div className="flex flex-col gap-1 items-center md:items-start text-center md:text-left">
              <span className="font-black text-vibrant-cherry flex items-center gap-1">
                <Heart size={14} className="text-vibrant-cherry" /> 3. Survive à la Colère !
              </span>
              <p className="text-vibrant-charcoal/70">Chaque faux pas culmine lors de la fête. Si ton choix blesse Prune ou manque de goût, elle va se mettre en rogne gravement !</p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t-2 border-vibrant-pink/15 pt-6 mt-2 z-10">
          <p className="text-xs text-vibrant-charcoal/60 text-center sm:text-left italic">
            "Le cadeau parfait n'attend pas... Paris t'appelle !"
          </p>
          <motion.button
            id="start-quest-button"
            onClick={handleNext}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-8 py-3.5 bg-vibrant-hotpink hover:bg-vibrant-cherry text-white font-black rounded-xl border-2 border-transparent hover:border-white flex items-center justify-center gap-2 transition cursor-pointer text-sm shadow-md"
          >
            Lancer l'Opération Parisienne
            <ArrowRight size={16} />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
