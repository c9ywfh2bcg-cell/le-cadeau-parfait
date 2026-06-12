/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Sparkles, 
  Play, 
  HelpCircle, 
  Compass, 
  Award, 
  Plus, 
  MapPin, 
  RotateCcw,
  BookOpen
} from 'lucide-react';
import { GameState } from './types';
import PhoneInterface from './components/PhoneInterface';
import IntroScreen from './components/IntroScreen';
import BoutiqueShoppingFlow from './components/BoutiqueShoppingFlow';
import GiftWrapScreen from './components/GiftWrapScreen';
import UnboxingScreen from './components/UnboxingScreen';

const initialGameState: GameState = {
  screen: 'start',
  activeShopId: null,
  budget: 600,
  lovePoints: 50,
  selectedItems: [],
  wrapChoice: 'glam',
  cardMessage: "Joyeux anniversaire à la plus belle des fashionistas. J'espère que ces cadeaux reflètent tout l'amour que j'ai pour toi, ma Prune. ♥️",
  phoneOpen: false,
  readClues: [],
  askedLea: false,
  hasSeenIntro: false
};

export default function App() {
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  const pruneImgSrc = '/src/assets/images/prune_darker_brunette_1781299004971.jpg';
  const jaImgSrc = '/src/assets/images/ja_portrait_1781298050523.jpg';

  const handleStartGame = () => {
    setGameState(prev => ({ ...prev, screen: 'intro' }));
  };

  const handleRestart = () => {
    setGameState(initialGameState);
  };

  const handleTogglePhone = () => {
    setGameState(prev => ({ ...prev, phoneOpen: !prev.phoneOpen }));
  };

  return (
    <div className="min-h-screen bg-vibrant-cream text-vibrant-charcoal flex flex-col font-sans select-none overflow-x-hidden">
      <AnimatePresence mode="wait">
        {gameState.screen === 'start' && (
          // MASTER SCREEN: GLOSSY HIGH-FASHION COVER START VIEW WITH VIBRANT PALETTE
          <motion.div
            key="start-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-8 bg-gradient-to-b from-vibrant-yellow via-vibrant-cream to-vibrant-peach"
          >
            {/* Ambient pattern dots like the spec */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FF8EAA_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>

            {/* Subtle elegant graphic blobs */}
            <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-vibrant-pink/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-vibrant-peach/30 rounded-full blur-3xl pointer-events-none"></div>

            {/* High-fashion Magazine Board layout */}
            <div className="w-full max-w-5xl bg-white border-4 border-vibrant-pink rounded-[40px] p-6 md:p-12 shadow-2xl flex flex-col lg:flex-row items-center gap-10 md:gap-14 relative overflow-hidden">
              
              {/* Cover Photo: Stylized portrait of Prune */}
              <div className="w-full lg:w-5/12 flex flex-col items-center">
                <div className="relative w-full aspect-3/4 max-w-[340px] rounded-[32px] overflow-hidden border-4 border-vibrant-pink shadow-xl group">
                  <div className="absolute inset-0 bg-gradient-to-t from-vibrant-charcoal/80 via-transparent to-transparent z-10"></div>
                  <img 
                    src={pruneImgSrc} 
                    alt="Prune" 
                    className="w-full h-full object-cover object-top transition duration-700 group-hover:scale-103"
                    referrerPolicy="no-referrer"
                  />
                  {/* Chic overlay typography labels */}
                  <div className="absolute bottom-5 left-5 right-5 z-20 text-left">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-white font-bold bg-vibrant-hotpink px-2.5 py-1 rounded inline-block mb-1">
                      Icône de la Mode
                    </span>
                    <h3 className="font-serif font-black text-xl text-white tracking-wide">
                      Prune, 20 ans.
                    </h3>
                    <p className="text-[10px] text-vibrant-cream italic mt-0.5 leading-tight">
                      « La mode change, mais ma garde-robe déborde toujours... »
                    </p>
                  </div>
                </div>
              </div>

              {/* Cover Editorial: Game Headlines & Call to action */}
              <div className="flex-1 text-left flex flex-col justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="h-1 w-8 bg-vibrant-hotpink"></span>
                    <span className="text-[10px] font-mono font-black text-vibrant-hotpink tracking-wider uppercase">
                      Jeu de Stratégie Romantique
                    </span>
                  </div>
                  
                  {/* Giant Title */}
                  <h1 className="text-4xl md:text-6xl font-serif font-black leading-tight text-vibrant-charcoal tracking-tight">
                    Le Cadeau <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-vibrant-hotpink via-vibrant-pink to-vibrant-cherry">
                      Parfait de Prune
                    </span>
                  </h1>

                  <p className="text-xs text-vibrant-charcoal/80 mt-4 leading-relaxed max-w-lg">
                    Dans la peau de <strong>JA</strong>, embarque pour un casse-tête shopping mythique ! Prune, détentrice d'une passion compulsive pour les boutiques chic de Paris, fête son anniversaire demain. Trouve les perles rares en évitant les articles proscrits pour ne pas déclencher sa terrible colère !
                  </p>
                </div>

                {/* Sub features highlights */}
                <div className="grid grid-cols-2 gap-4 border-t-2 border-b-2 border-vibrant-pink/20 py-5">
                  <div className="flex items-start gap-2.5">
                    <span className="p-2 bg-vibrant-clay rounded-lg text-sm text-vibrant-hotpink font-bold shadow-2xs">👜</span>
                    <div>
                      <h4 className="font-black text-xs text-vibrant-charcoal">Designers Parisiens</h4>
                      <p className="text-[10px] text-zinc-500 mt-0.5 leading-snug">Sacs, robes, lunettes vintage & bijoux fins.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="p-2 bg-vibrant-clay rounded-lg text-sm text-vibrant-cherry font-bold shadow-2xs">📱</span>
                    <div>
                      <h4 className="font-black text-xs text-vibrant-charcoal">Smartphone de JA</h4>
                      <p className="text-[10px] text-zinc-500 mt-0.5 leading-snug">Espionne ses posts ou questionne sa meilleure copine.</p>
                    </div>
                  </div>
                </div>

                {/* Buttons triggers */}
                <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
                  <motion.button
                    id="play-game-button"
                    onClick={handleStartGame}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full sm:w-auto px-8 py-4 bg-vibrant-hotpink hover:bg-vibrant-cherry text-white font-black rounded-xl text-xs tracking-wider uppercase border-2 border-transparent hover:border-white flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg transition cursor-pointer"
                  >
                    <Play size={14} className="fill-white" />
                    Entamer le Jeu d'Anniversaire
                  </motion.button>
                  
                  <div className="text-[10px] text-zinc-500 italic max-w-xs text-center sm:text-left leading-relaxed">
                    « Attention aux faux pas ! Une reine du style est vite contrariée... 💅👑 »
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {gameState.screen === 'intro' && (
          <IntroScreen gameState={gameState} setGameState={setGameState} />
        )}

        {(gameState.screen === 'map' || gameState.screen === 'shop') && (
          <BoutiqueShoppingFlow 
            gameState={gameState} 
            setGameState={setGameState} 
            onOpenPhone={handleTogglePhone}
          />
        )}

        {gameState.screen === 'wrap' && (
          <GiftWrapScreen gameState={gameState} setGameState={setGameState} />
        )}

        {gameState.screen === 'unboxing' && (
          <UnboxingScreen 
            gameState={gameState} 
            setGameState={setGameState} 
            onRestart={handleRestart}
          />
        )}
      </AnimatePresence>

      {/* Persistent floating Smartphone Trigger button layout */}
      {gameState.screen !== 'start' && gameState.screen !== 'intro' && gameState.screen !== 'unboxing' && (
        <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
          {!gameState.phoneOpen && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-neutral-900 border border-neutral-800 text-neutral-300 py-1.5 px-3 rounded-xl text-[10px] tracking-wide shadow-md hidden sm:block font-bold"
            >
              Consultez ses posts 📱
            </motion.div>
          )}

          <motion.button
            id="phone-trigger-fab"
            onClick={handleTogglePhone}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-14 h-14 bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-500 rounded-full flex items-center justify-center text-xl text-white shadow-xl hover:shadow-pink-500/10 cursor-pointer relative"
          >
            📱
            {!gameState.askedLea && (
              <span className="absolute top-0.5 right-0.5 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-600"></span>
              </span>
            )}
          </motion.button>
        </div>
      )}

      {/* Interactive Smartphone Sidebar Simulation Drawer */}
      <PhoneInterface 
        isOpen={gameState.phoneOpen} 
        onClose={handleTogglePhone} 
        gameState={gameState} 
        setGameState={setGameState} 
      />
    </div>
  );
}
