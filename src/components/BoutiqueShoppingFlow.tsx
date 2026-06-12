/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  Sparkles, 
  ShoppingBag, 
  ArrowLeft, 
  Check, 
  Plus, 
  Trash2, 
  DollarSign, 
  Info, 
  HelpCircle,
  TrendingUp,
  Award,
  X
} from 'lucide-react';
import { FASHION_ITEMS } from '../data';
import { GameState, FashionItem } from '../types';

interface BoutiqueShoppingFlowProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  onOpenPhone: () => void;
}

export default function BoutiqueShoppingFlow({ gameState, setGameState, onOpenPhone }: BoutiqueShoppingFlowProps) {
  const [inspectingItem, setInspectingItem] = useState<FashionItem | null>(null);
  
  const boutiqueBackground = '/src/assets/images/boutique_bg_1781298065002.jpg';

  const shops = [
    {
      id: 'maroquinerie' as const,
      name: 'La Maroquinerie d\'Or',
      vendor: 'Monsieur Pascal (Maroquinier d\'art)',
      vendorGreeting: '« Ah, jeune homme ! Choisir le cuir idéal pour sa muse est un art divin. J\'ai précisément reçu de très belles pièces pour son anniversaire... Reste à voir si ton goût est à la hauteur ! »',
      icon: '👜',
      desc: 'Sacs à main haute couture, pochettes de soirée en cuir d\'exception, ou fantaisies colorées.',
      bgGradient: 'from-amber-900/60 to-orange-950/40',
      category: 'bag'
    },
    {
      id: 'miroir' as const,
      name: 'Le Miroir de Prune',
      vendor: 'Mademoiselle Coralie (Styliste conseil)',
      vendorGreeting: '« Hello beau gosse ! Prune m\'a parlé de ses envies vintage récemment... Choisis bien, le soleil parisien exige un style qui claque ! »',
      icon: '🕶️',
      desc: 'Midi robes de créateurs et l\'indispensable des lunettes rétro de style vintage.',
      bgGradient: 'from-pink-950/60 to-purple-950/40',
      category: 'clothing_glasses'
    },
    {
      id: 'ecrin' as const,
      name: 'L\'Écrin Précieux',
      vendor: 'Madame Solange (Joaillière émérite)',
      vendorGreeting: '« Bienvenue, cher ami. Un bijou est éternel, mais un mauvais choix peut fâcher pour longtemps. Regardez la finesse de cette émeraude fine... »',
      icon: '💎',
      desc: 'Colliers en or pur 18 carat, parfums d\'exception et bijoux précieux.',
      bgGradient: 'from-emerald-950/60 to-teal-950/40',
      category: 'jewelry_perfume'
    }
  ];

  const handleSelectShop = (shopId: 'maroquinerie' | 'miroir' | 'ecrin') => {
    setGameState(prev => ({ ...prev, activeShopId: shopId }));
  };

  const handleLeaveShop = () => {
    setGameState(prev => ({ ...prev, activeShopId: null }));
  };

  // Check if item is already in the bag
  const isSelected = (itemId: string) => {
    return gameState.selectedItems.some(i => i.id === itemId);
  };

  const handleToggleItem = (item: FashionItem) => {
    const selected = isSelected(item.id);
    const totalCurrentSpent = gameState.selectedItems.reduce((acc, i) => acc + i.price, 0);

    if (selected) {
      // Remove item and restore budget
      setGameState(prev => ({
        ...prev,
        budget: prev.budget + item.price,
        selectedItems: prev.selectedItems.filter(i => i.id !== item.id)
      }));
    } else {
      // Add item and deduct budget
      if (gameState.selectedItems.length >= 3) {
        alert("Tu ne peux offrir que 3 cadeaux au maximum à Prune ! Choisis les meilleurs.");
        return;
      }
      if (totalCurrentSpent + item.price > 600) {
        alert("Aïe ! Ce cadeau est trop cher pour ton budget disponible (600€ max) !");
        return;
      }

      setGameState(prev => ({
        ...prev,
        budget: prev.budget - item.price,
        selectedItems: [...prev.selectedItems, item]
      }));

      // Automatically add to list of clues if selected so the memo shows it
      setGameState(prev => {
        const withClues = [...prev.readClues];
        if (!withClues.includes(item.id)) withClues.push(item.id);
        return { ...prev, readClues: withClues };
      });
    }
  };

  const currentShop = shops.find(s => s.id === gameState.activeShopId);
  const currentShopItems = currentShop 
    ? FASHION_ITEMS.filter(item => item.category === currentShop.category)
    : [];

  const handleProceedToWrap = () => {
    if (gameState.selectedItems.length === 0) {
      alert("Tu dois acheter au moins un cadeau pour l'anniversaire de Prune ! Tu ne vas pas venir les mains vides !");
      return;
    }
    setGameState(prev => ({ ...prev, screen: 'wrap' }));
  };

  return (
    <div id="shopping-flow-root" className="min-h-screen bg-vibrant-cream text-vibrant-charcoal flex flex-col font-sans relative">
      {/* Top Status & Inventory Bar */}
      <div className="bg-white border-b-4 border-vibrant-pink sticky top-0 z-40 px-4 py-3 flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-[#FFF5F7] px-3 py-1.5 rounded-full border-2 border-vibrant-pink/40 shadow-2xs">
            <span className="text-vibrant-hotpink animate-pulse">❤️</span>
            <span className="text-xs font-black text-vibrant-charcoal">Intérêt : </span>
            <span className="text-xs font-mono text-vibrant-hotpink font-black">{gameState.lovePoints}%</span>
          </div>
          
          <div className="flex items-center gap-1.5 bg-vibrant-clay px-3 py-1.5 rounded-full border-2 border-vibrant-peach/50 shadow-2xs">
            <span className="text-emerald-700">💵</span>
            <span className="text-xs font-black text-vibrant-charcoal">Solde : </span>
            <span className="text-xs font-mono text-emerald-705 font-black">{gameState.budget}€</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Basket summary quick indicator */}
          <div className="hidden sm:flex items-center gap-1 bg-vibrant-cream rounded-full px-3 py-1.5 border-2 border-vibrant-pink/30 text-xs">
            <span className="text-zinc-600 font-extrabold mr-1">Panier :</span>
            <div className="flex gap-1">
              {Array.from({ length: 3 }).map((_, idx) => {
                const item = gameState.selectedItems[idx];
                return (
                  <span 
                    key={idx} 
                    className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black ${
                      item ? 'bg-vibrant-hotpink text-white shadow-xs' : 'bg-white text-zinc-400 border border-zinc-300 border-dashed'
                    }`}
                  >
                    {item ? '🎁' : idx + 1}
                  </span>
                );
              })}
            </div>
          </div>

          <button
            id="phone-bubble-trigger"
            onClick={onOpenPhone}
            className="relative px-4 py-1.5 bg-vibrant-hotpink hover:bg-vibrant-cherry text-white rounded-full transition font-black text-xs flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
          >
            📱 Ouvrir Téléphone (Indices)
            {!gameState.askedLea && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-vibrant-cherry border-2 border-white rounded-full animate-bounce"></span>
            )}
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!gameState.activeShopId ? (
          // ZONE A : PARIS BOULEVARD MAP VIEW (VIBRANT THEMED)
          <motion.div
            key="map-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col relative"
          >
            {/* Banner with 2D Parisian high-fashion street */}
            <div className="h-[240px] md:h-[300px] w-full relative overflow-hidden flex items-end justify-center bg-gradient-to-b from-vibrant-yellow to-vibrant-peach">
              {/* Vibrant romantic overlay overlay */}
              <div className="absolute inset-0 bg-vibrant-hotpink/15 z-10"></div>
              <img 
                src={boutiqueBackground} 
                alt="Avenue Montaigne Paris" 
                className="absolute inset-0 w-full h-full object-cover blur-3xs filter brightness-90 opacity-80"
                referrerPolicy="no-referrer"
              />
              <div className="z-20 text-center pb-6 px-4">
                <span className="text-xs font-mono tracking-wider text-white uppercase bg-vibrant-cherry px-4 py-1.5 rounded-full border-2 border-white font-extrabold shadow-sm">
                  Paris - Avenue Montaigne
                </span>
                <h2 className="text-2xl md:text-4xl font-serif font-black tracking-tight text-white mt-3 filter drop-shadow-md">
                  Le Quartier de la Haute Couture
                </h2>
                <p className="text-xs text-white/95 max-w-lg mx-auto mt-1 font-medium filter drop-shadow-xs">
                  Explore les trois adresses préférées de Prune et choisis les plus beaux joyaux avec un budget de 600€.
                </p>
              </div>
            </div>

            {/* Shop Selector Grid */}
            <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6 w-full z-20">
              {shops.map(shop => {
                // Count bought items from this boutique category
                const countInShop = gameState.selectedItems.filter(i => i.category === shop.category).length;

                return (
                  <motion.div
                    key={shop.id}
                    whileHover={{ y: -6, scale: 1.02 }}
                    className="bg-white border-4 border-vibrant-pink rounded-[32px] p-5 flex flex-col justify-between shadow-xl transition relative overflow-hidden"
                  >
                    {/* Subtle retro pattern design decor */}
                    <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#FF8EAA_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>

                    {/* Glowing highlight indicator */}
                    <div className="absolute -top-10 -right-10 w-24 h-24 bg-vibrant-pink/15 rounded-full blur-2xl"></div>

                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-3xl p-2 bg-vibrant-cream rounded-xl border-2 border-vibrant-pink/30">{shop.icon}</span>
                        {countInShop > 0 && (
                          <span className="bg-vibrant-hotpink text-white text-[10px] font-black px-2.5 py-1 rounded-full border-2 border-white flex items-center gap-0.5 shadow-sm">
                            <Check size={10} /> {countInShop} acheté
                          </span>
                        )}
                      </div>
                      <h3 className="font-serif font-black text-lg text-vibrant-charcoal">{shop.name}</h3>
                      <p className="text-zinc-500 text-xs mt-1 italic font-semibold">{shop.vendor.split('(')[0]}</p>
                      <p className="text-vibrant-charcoal/80 text-xs mt-3 leading-relaxed">{shop.desc}</p>
                    </div>

                    <div className="mt-6">
                      <button
                        onClick={() => handleSelectShop(shop.id)}
                        className="w-full py-2.5 bg-vibrant-clay hover:bg-vibrant-hotpink text-vibrant-charcoal hover:text-white rounded-xl text-xs font-black font-mono transition-all border-2 border-transparent hover:border-white shadow-xs flex justify-center items-center gap-1 cursor-pointer"
                      >
                        Entrer dans la boutique ➔
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Shopping status and Wrap button footer */}
            <div className="mt-auto border-t-4 border-vibrant-peach bg-white p-6 flex flex-col sm:flex-row justify-between items-center max-w-6xl mx-auto w-full gap-4 rounded-t-3xl shadow-md">
              <div className="text-center sm:text-left">
                <p className="text-xs text-vibrant-hotpink uppercase tracking-widest font-mono font-black">Panier d'Anniversaire</p>
                <h4 className="text-sm font-black text-vibrant-charcoal mt-0.5">
                  {gameState.selectedItems.length === 0 
                    ? "Aucun cadeau dans ton sac" 
                    : `Tu as sélectionné ${gameState.selectedItems.length} cadeau(x) de rêve !`}
                </h4>
              </div>
              <button
                id="proceed-wrap-button"
                onClick={handleProceedToWrap}
                className={`py-3.5 px-8 rounded-xl font-black text-sm tracking-wide transition-all border-2 border-transparent flex items-center gap-2 cursor-pointer ${
                  gameState.selectedItems.length > 0
                    ? 'bg-vibrant-hotpink text-white hover:bg-vibrant-cherry hover:border-white hover:shadow-lg shadow-md'
                    : 'bg-[#F2F2F2] text-zinc-400 cursor-not-allowed border border-dashed border-zinc-300'
                }`}
              >
                Passer à l'Emballage Cadeau 🎁
              </button>
            </div>
          </motion.div>
        ) : (
          // ZONE B : BOUTIQUE SHELVES DETAIL VIEW (VIBRANT THEMED)
          <motion.div
            key="shop-detail"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="flex-grow flex flex-col p-4 md:p-8 max-w-6xl mx-auto w-full"
          >
            {/* Header / Vendor bar */}
            <div className="flex flex-col md:flex-row items-center gap-5 bg-white border-4 border-vibrant-pink p-5 rounded-[24px] mb-8 relative shadow-sm">
              <button 
                onClick={handleLeaveShop}
                className="self-start md:self-auto p-2 rounded-xl border border-vibrant-pink/30 hover:bg-vibrant-pink hover:text-white transition flex items-center gap-1.5 text-xs font-black text-vibrant-charcoal"
              >
                <ArrowLeft size={14} /> Retour à l'Avenue
              </button>

              <div className="flex-1 text-center md:text-left">
                <span className="text-[10px] text-vibrant-hotpink uppercase tracking-widest font-black block">Boutique</span>
                <h2 className="text-xl md:text-2xl font-serif font-black text-vibrant-charcoal">{currentShop?.name}</h2>
                <p className="text-zinc-500 text-xs mt-1 font-sans font-bold">
                  Vendeur : <strong className="text-vibrant-charcoal">{currentShop?.vendor}</strong>
                </p>
                <p className="text-vibrant-charcoal font-medium italic mt-2.5 bg-vibrant-cream border-l-4 border-vibrant-hotpink p-3.5 rounded-r-xl max-w-3xl text-xs shadow-3xs">
                  {currentShop?.vendorGreeting}
                </p>
              </div>
            </div>

            {/* Shop items showcase shelf */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {currentShopItems.map(item => {
                const active = isSelected(item.id);
                return (
                  <motion.div
                    key={item.id}
                    className={`bg-white border-4 ${
                      active ? 'border-vibrant-hotpink shadow-lg' : 'border-vibrant-pink/25 hover:border-vibrant-pink/60'
                    } rounded-3xl p-5 flex flex-col justify-between transition-colors relative`}
                  >
                    {/* Item Card Visual Header icon */}
                    <div className="flex justify-between items-start mb-4">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-lg text-white font-bold"
                        style={{ backgroundColor: `${item.color}40`, border: `2px solid ${item.color}` }}
                      >
                        {item.category === 'bag' ? '👜' : item.category === 'clothing_glasses' ? '🕶️' : '💎'}
                      </div>
                      <span className="font-mono text-emerald-700 font-extrabold text-sm px-2.5 py-1 bg-emerald-50 rounded-lg border-2 border-emerald-300 shadow-3xs">
                        {item.price}€
                      </span>
                    </div>

                    <div className="text-left flex-1">
                      <h3 className="font-black text-sm text-vibrant-charcoal mb-1 leading-snug">{item.name}</h3>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mt-2 mb-3">
                        {item.tags.map((tg, i) => (
                          <span key={i} className="text-[9px] bg-[#FFF5F7] text-vibrant-hotpink border border-vibrant-pink/20 px-1.5 py-0.5 rounded font-mono font-bold">
                            {tg}
                          </span>
                        ))}
                      </div>

                      <p className="text-[11px] text-zinc-600 leading-normal font-medium">{item.description}</p>
                    </div>

                    {/* Action buttons on shelf card */}
                    <div className="mt-6 flex gap-2">
                      <button
                        onClick={() => setInspectingItem(item)}
                        className="p-2.5 bg-[#F7F1E3] hover:bg-vibrant-hotpink border border-vibrant-pink/15 text-zinc-600 hover:text-white rounded-lg transition text-xs flex justify-center items-center"
                        title="Inspecter les détails"
                      >
                        <Info size={14} />
                      </button>

                      <button
                        onClick={() => handleToggleItem(item)}
                        className={`flex-1 py-2 px-3 rounded-lg font-black text-xs font-mono transition-all border-2 border-transparent hover:border-white shadow-2xs flex justify-center items-center gap-1 cursor-pointer ${
                          active
                            ? 'bg-vibrant-cherry hover:bg-red-700 text-white shadow-xs'
                            : 'bg-vibrant-hotpink hover:bg-vibrant-cherry text-white shadow-xs'
                        }`}
                      >
                        {active ? (
                          <>
                            <Trash2 size={13} /> Retirer du sac
                          </>
                        ) : (
                          <>
                            <Plus size={13} /> Ajouter au panier
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Inspecting Item Details Overlay Modal */}
      <AnimatePresence>
        {inspectingItem && (
          <div id="item-inspect-container" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-vibrant-charcoal/60 backdrop-blur-xs">
            <motion.div
              id="item-inspect-body"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border-4 border-vibrant-pink rounded-3xl p-6 max-w-md w-full shadow-2xl relative text-left"
            >
              <button 
                onClick={() => setInspectingItem(null)}
                className="absolute top-4 right-4 p-1.5 bg-vibrant-cream hover:bg-vibrant-pink text-zinc-500 hover:text-white rounded-full transition"
              >
                <X size={16} />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🧩</span>
                <div>
                  <span className="text-[9px] text-zinc-500 uppercase tracking-widest block font-bold font-mono">Analyse Logistique</span>
                  <h3 className="font-serif font-black text-lg text-vibrant-charcoal">{inspectingItem.name}</h3>
                </div>
              </div>

              {/* Detail Block */}
              <div className="space-y-4 text-xs font-sans">
                {/* Description and metadata */}
                <div className="bg-[#F7F1E3] p-3.5 rounded-xl border border-vibrant-pink/15 text-vibrant-charcoal/95 leading-relaxed">
                  <p>{inspectingItem.description}</p>
                </div>

                {/* Logistics */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#FFF5F7] p-3 rounded-xl border-2 border-vibrant-pink/15">
                    <span className="text-zinc-500 text-[10px] uppercase font-bold block">Prix d'Achat</span>
                    <span className="font-mono text-emerald-700 font-extrabold text-base mt-0.5 block">{inspectingItem.price}€</span>
                  </div>
                  <div className="bg-[#FFF5F7] p-3 rounded-xl border-2 border-vibrant-pink/15">
                    <span className="text-zinc-500 text-[10px] uppercase font-bold block">Poids dans le colis</span>
                    <span className="font-mono text-zinc-700 font-bold text-sm mt-0.5 block">Léger</span>
                  </div>
                </div>

                {/* Expert thoughts */}
                <div className="bg-vibrant-cream border-2 border-vibrant-pink/25 p-3.5 rounded-xl text-vibrant-charcoal">
                  <span className="font-black text-vibrant-hotpink flex items-center gap-1 text-[11px] uppercase tracking-wider mb-1">
                    <TrendingUp size={12} /> Pressenti de Prune par Léa
                  </span>
                  <p className="leading-normal font-medium">{inspectingItem.originalReaction}</p>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-2.5">
                <button
                  onClick={() => setInspectingItem(null)}
                  className="px-4 py-2 bg-vibrant-clay hover:bg-vibrant-pink text-vibrant-charcoal hover:text-white rounded-xl text-xs font-black transition"
                >
                  Fermer
                </button>
                <button
                  onClick={() => {
                    handleToggleItem(inspectingItem);
                    setInspectingItem(null);
                  }}
                  className={`px-5 py-2 rounded-xl text-xs font-mono font-black transition-all border-2 border-transparent hover:border-white shadow-2xs flex items-center gap-1 ${
                    isSelected(inspectingItem.id)
                      ? 'bg-vibrant-cherry text-white'
                      : 'bg-vibrant-hotpink text-white hover:bg-vibrant-cherry'
                  }`}
                >
                  {isSelected(inspectingItem.id) ? 'Retirer du sac' : 'Ajouter au Panier'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
