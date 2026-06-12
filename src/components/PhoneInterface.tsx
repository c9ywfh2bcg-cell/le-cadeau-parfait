/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Instagram, 
  MessageSquare, 
  FileText, 
  Heart, 
  X, 
  Send, 
  Phone, 
  Camera, 
  ChevronLeft, 
  CheckCheck,
  UserCheck,
  UserX,
  AlertTriangle
} from 'lucide-react';
import { INSTA_POSTS, FASHION_ITEMS } from '../data';
import { GameState, FashionItem } from '../types';

interface PhoneInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

export default function PhoneInterface({ isOpen, onClose, gameState, setGameState }: PhoneInterfaceProps) {
  const [activeTab, setActiveTab] = useState<'insta' | 'chat' | 'notes'>('insta');
  const [chatPartner, setChatPartner] = useState<'prune' | 'lea' | null>(null);
  const [leaAsked, setLeaAsked] = useState<boolean>(gameState.askedLea);
  const [leaMessages, setLeaMessages] = useState<Array<{ sender: 'ja' | 'lea', text: string, time: string }>>([
    { sender: 'lea', text: 'Coucou JA ! Alors, prêt à affronter l\'anniversaire de ta reine du shopping ? 💅👑 Si tu as besoin d\'aide, demande-moi, je connais ses pires hantises fashion !', time: '10:15' }
  ]);
  const [pruneMessages] = useState<Array<{ sender: 'prune' | 'ja', text: string, time: string }>>([
    { sender: 'prune', text: 'Coucou bébéee ! Je suis en train de faire du repérage pour demain hihiii... J\'ai vu trop de merveilles ! 🛍️✨', time: '09:30' },
    { sender: 'ja', text: 'Haha je m\'en doute, repose un peu ton portefeuille d\'ici demain ! Quelle heure pour le resto ? 😘', time: '09:35' },
    { sender: 'prune', text: '20h ! Et t\'inquiète pas pour mon portefeuille... j\'espère que le tien est prêt, j\'attends le cadeau du siècle ! 🤪💖 Bisous !', time: '09:40' }
  ]);

  const handleAskLea = () => {
    if (leaAsked) return;
    
    const jaMsg = { sender: 'ja' as const, text: 'Salut Léa ! Je suis en train de faire les boutiques mais j\'ai trop peur de commettre un faux pas... Tu as des tuyaux sur ce que Prune veut vraiment ? 😭 Help !', time: '14:02' };
    setLeaMessages(prev => [...prev, jaMsg]);
    setLeaAsked(true);
    setGameState(prev => ({ ...prev, askedLea: true }));

    setTimeout(() => {
      const leaReply = { 
        sender: 'lea' as const, 
        text: 'Ahaha je savais que tu m\'appellerais à l\'aide ! Alors écoute bien :\n\n1. Niveau bijoux, elle lorgne sur le collier "Émeraude Poétique" en or 18k chez l\'Écrin Précieux d\'amour ! 🍃💚\n2. Côté sacs, elle rêve du "Beige Manoir" en cuir chez l\'Atelier Paris. ÉVITE ABSOLUMENT le jaune fluo, elle déteste ça !\n3. Et SURTOUT, pas de parfum à la lavande synthétique, ça lui donne des migraines d\'enfer !', 
        time: '14:03' 
      };
      setLeaMessages(prev => [...prev, leaReply]);
      
      // Unlock all clues automatically as feedback
      setGameState(prev => {
        const withClues = [...prev.readClues];
        if (!withClues.includes('sac_beige_manoir')) withClues.push('sac_beige_manoir');
        if (!withClues.includes('collier_emeraude')) withClues.push('collier_emeraude');
        if (!withClues.includes('parfum_lavande')) withClues.push('parfum_lavande');
        return {
          ...prev,
          readClues: withClues
        };
      });
    }, 1500);
  };

  const currentThemeColor = "bg-vibrant-hotpink"; // Pink header

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="phone-modal-container" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-vibrant-charcoal/45 backdrop-blur-xs">
          <motion.div
            id="phone-modal-body"
            initial={{ y: 100, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 100, opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-[400px] h-[780px] bg-white border-[8px] border-vibrant-charcoal rounded-[48px] shadow-2xl flex flex-col overflow-hidden text-vibrant-charcoal font-sans"
          >
            {/* Phone Screen Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-[24px] bg-vibrant-charcoal rounded-b-[18px] z-50 flex items-center justify-center">
              <div className="w-12 h-1 bg-zinc-800 rounded-full mb-1"></div>
            </div>

            {/* Status Bar */}
            <div className="h-[40px] px-8 pt-3 pb-1 flex justify-between items-center text-xs text-vibrant-charcoal/80 font-mono select-none bg-vibrant-cream border-b border-vibrant-pink/10">
              <span className="font-extrabold">14:02</span>
              <div className="flex gap-1 items-center">
                <span className="font-bold">5G</span>
                <div className="w-5 h-2.5 border border-vibrant-charcoal rounded-sm p-0.5 flex">
                  <div className="w-full h-full bg-vibrant-charcoal rounded-2xs"></div>
                </div>
              </div>
            </div>

            {/* Quick close button in header */}
            <button 
              id="phone-close-button"
              onClick={onClose}
              className="absolute top-11 right-4 p-1.5 bg-vibrant-cherry text-white rounded-full hover:bg-vibrant-hotpink transition z-50 shadow-xs border border-white"
            >
              <X size={14} />
            </button>

            {/* Active Phone Content */}
            <div className="flex-1 flex flex-col bg-vibrant-cream overflow-hidden relative">
              {chatPartner ? (
                // Chat Detail view
                <div className="flex-1 flex flex-col bg-[#F6EFE2] text-vibrant-charcoal overflow-hidden">
                  {/* Chat Header */}
                  <div className="p-3 bg-vibrant-hotpink text-white flex items-center gap-2 mt-2 border-b-2 border-white">
                    <button onClick={() => setChatPartner(null)} className="p-1 hover:bg-vibrant-cherry rounded-full text-white">
                      <ChevronLeft size={20} />
                    </button>
                    <div className="w-9 h-9 rounded-full bg-white overflow-hidden flex items-center justify-center font-bold text-sm shadow-2xs">
                      {chatPartner === 'prune' ? '🌸' : '🙋‍♀️'}
                    </div>
                    <div>
                      <h4 className="font-black text-xs">
                        {chatPartner === 'prune' ? 'Prune 💖👗' : 'Léa (BFF de Prune)'}
                      </h4>
                      <p className="text-[9px] text-[#A6FFB4] font-black">En ligne</p>
                    </div>
                  </div>

                  {/* Messages Scroll Area */}
                  <div className="flex-1 p-3 overflow-y-auto flex flex-col gap-2 font-sans text-sm">
                    {chatPartner === 'prune' ? (
                      pruneMessages.map((msg, idx) => (
                        <div 
                          key={idx} 
                          className={`max-w-[80%] p-2.5 rounded-2xl text-xs leading-relaxed shadow-3xs ${
                            msg.sender === 'ja' 
                              ? 'bg-vibrant-peach text-vibrant-charcoal self-end rounded-tr-none border border-vibrant-hotpink/15' 
                              : 'bg-white text-vibrant-charcoal self-start rounded-tl-none border border-vibrant-pink/15'
                          }`}
                        >
                          <p className="font-semibold">{msg.text}</p>
                          <div className="text-[9px] text-zinc-500 text-right mt-1 flex justify-end items-center gap-0.5 font-bold">
                            <span>{msg.time}</span>
                            {msg.sender === 'ja' && <CheckCheck size={12} className="text-vibrant-hotpink" />}
                          </div>
                        </div>
                      ))
                    ) : (
                      leaMessages.map((msg, idx) => (
                        <div 
                          key={idx} 
                          className={`max-w-[80%] p-2.5 rounded-2xl text-xs leading-relaxed shadow-3xs ${
                            msg.sender === 'ja' 
                              ? 'bg-vibrant-peach text-vibrant-charcoal self-end rounded-tr-none border border-vibrant-hotpink/15' 
                              : 'bg-white text-vibrant-charcoal self-start rounded-tl-none border border-vibrant-pink/15'
                          }`}
                        >
                          <p className="whitespace-pre-line font-semibold">{msg.text}</p>
                          <div className="text-[9px] text-zinc-500 text-right mt-1 flex justify-end items-center gap-0.5 font-bold">
                            <span>{msg.time}</span>
                            {msg.sender === 'ja' && <CheckCheck size={12} className="text-vibrant-hotpink" />}
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Chat Input Bar */}
                  <div className="p-2 bg-white border-t border-vibrant-pink/10 flex items-center gap-2">
                    {chatPartner === 'lea' && !leaAsked ? (
                      <button
                        onClick={handleAskLea}
                        className="w-full py-2.5 px-3 bg-vibrant-hotpink hover:bg-vibrant-cherry text-white rounded-xl flex items-center justify-center gap-2 text-xs font-black shadow-xs transition"
                      >
                        <UserCheck size={14} />
                        Demander conseil à Léa
                      </button>
                    ) : (
                      <div className="flex-1 flex gap-2 items-center">
                        <input
                          type="text"
                          placeholder={chatPartner === 'lea' ? "Léa est en train d'écrire..." : "Discuter désactivé pendant le shopping..."}
                          disabled
                          className="flex-1 bg-vibrant-cream border border-vibrant-pink/20 rounded-full px-4 py-1.5 text-xs text-zinc-500 italic outline-none"
                        />
                        <button disabled className="p-2 bg-vibrant-peach/30 text-vibrant-hotpink/50 rounded-full">
                          <Send size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                // Home/Tab views
                <div className="flex-1 flex flex-col overflow-hidden">
                  {/* Tab Contents */}
                  <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
                    {activeTab === 'insta' && (
                      <div className="flex flex-col gap-4">
                        {/* Insta Header */}
                        <div className="flex justify-between items-center bg-transparent py-1">
                          <h3 className="font-serif font-black text-lg tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-vibrant-cherry to-vibrant-hotpink">
                            InstaFashion
                          </h3>
                          <div className="flex gap-3 text-vibrant-charcoal/80">
                            <Camera size={18} />
                            <Heart size={18} />
                          </div>
                        </div>

                        {/* User Profile Summary */}
                        <div className="flex items-center gap-4 bg-white p-3 rounded-2xl border-2 border-vibrant-pink/20 shadow-2xs">
                          <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-vibrant-yellow via-vibrant-hotpink to-vibrant-cherry">
                            <div className="w-full h-full rounded-full bg-white border-2 border-white flex items-center justify-center font-bold text-lg">
                              🌸
                            </div>
                          </div>
                          <div className="text-left">
                            <p className="font-black text-sm text-vibrant-charcoal">prune_style_officiel</p>
                            <p className="text-[10px] text-zinc-500 font-bold">Shopping Addict | Fashion 👗</p>
                            <div className="flex gap-4 text-xs mt-1.5 font-bold text-vibrant-charcoal">
                              <span>32 <span className="font-normal text-zinc-500">posts</span></span>
                              <span>12.4k <span className="font-normal text-zinc-500">abonnés</span></span>
                            </div>
                          </div>
                        </div>

                        {/* Feed Posts */}
                        <div id="insta-feed-container" className="flex flex-col gap-4">
                          <p className="text-[10px] text-vibrant-hotpink tracking-wider font-black uppercase border-b-2 border-vibrant-pink/15 pb-1 text-left">
                            Analyse de ses indices Instagram
                          </p>
                          {INSTA_POSTS.map(post => (
                            <div key={post.id} className="bg-white rounded-2xl overflow-hidden border-2 border-vibrant-pink/15 shadow-2xs">
                              {/* Post User Header */}
                              <div className="p-2.5 flex items-center gap-2 border-b border-vibrant-pink/5">
                                <div className={`w-6 h-6 rounded-full bg-gradient-to-tr ${post.avatarColor} flex items-center justify-center text-[10px]`}>
                                  🌸
                                </div>
                                <span className="text-xs font-black text-vibrant-charcoal">{post.username}</span>
                              </div>

                              {/* Simulated Content Image Canvas */}
                              <div className="aspect-square bg-gradient-to-br from-vibrant-cream to-[#FFF0F4] flex flex-col items-center justify-center p-6 relative group border-b border-vibrant-pink/5 text-center select-none">
                                {post.id === 'post_1' && (
                                  <>
                                    <span className="text-4xl filter drop-shadow-md">👜✨</span>
                                    <h4 className="font-black text-xs mt-3 text-vibrant-charcoal">Atelier Paris : Beige Manoir</h4>
                                    <p className="text-[10px] text-zinc-500 mt-1 max-w-[200px] font-bold">Stock Limité - Maroquinerie d'Or</p>
                                  </>
                                )}
                                {post.id === 'post_2' && (
                                  <>
                                    <span className="text-4xl filter drop-shadow-md">😎🕶️</span>
                                    <h4 className="font-black text-xs mt-3 text-vibrant-charcoal">Retro Écaille & Or</h4>
                                    <p className="text-[10px] text-zinc-500 mt-1 max-w-[200px] font-bold">Années 70 - Le Miroir de Prune</p>
                                    <div className="absolute top-2 right-2 bg-vibrant-cherry text-white px-2 py-0.5 rounded text-[8px] font-black flex items-center gap-1 shadow-2xs">
                                      <AlertTriangle size={8} /> Proscrit : Jaune Fluo
                                    </div>
                                  </>
                                )}
                                {post.id === 'post_3' && (
                                  <>
                                    <span className="text-4xl filter drop-shadow-md">🍃💎</span>
                                    <h4 className="font-black text-xs mt-3 text-vibrant-charcoal">Or 18k Émeraude Poétique</h4>
                                    <p className="text-[10px] text-zinc-500 mt-1 max-w-[200px] font-bold">Bijou Naturel - L'Écrin Précieux</p>
                                    <div className="absolute top-2 right-2 bg-vibrant-cherry text-white px-2 py-0.5 rounded text-[8px] font-black flex items-center gap-1 shadow-2xs">
                                      <AlertTriangle size={8} /> Proscrit : Lavande
                                    </div>
                                  </>
                                )}
                              </div>

                              {/* Likes and Caption */}
                              <div className="p-3 text-xs flex flex-col gap-1 text-left">
                                <div className="flex items-center gap-2">
                                  <Heart size={14} className="text-vibrant-hotpink fill-vibrant-hotpink" />
                                  <span className="font-black text-[11px] text-vibrant-charcoal">{post.likes} mentions "J'aime"</span>
                                </div>
                                <p className="leading-relaxed text-[11px] text-vibrant-charcoal/90 font-semibold">
                                  <span className="font-black text-vibrant-charcoal mr-1">{post.username}</span>
                                  {post.caption}
                                </p>
                                <span className="text-[9px] text-zinc-500 mt-1 uppercase font-black">{post.timeAgo}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeTab === 'chat' && (
                      <div className="flex flex-col gap-3">
                        <h3 className="font-serif font-black text-base border-b-2 border-vibrant-pink/15 pb-2 text-left text-vibrant-charcoal">Discussions</h3>
                        
                        {/* Conversation list */}
                        <div 
                          onClick={() => setChatPartner('prune')} 
                          className="flex items-center gap-3 bg-white hover:bg-vibrant-cream/50 p-3 rounded-2xl border-2 border-vibrant-pink/15 cursor-pointer transition shadow-2xs"
                        >
                          <div className="w-11 h-11 rounded-full bg-vibrant-peach flex items-center justify-center font-bold text-lg text-white shadow-2xs border border-white">
                            🌸
                          </div>
                          <div className="flex-1 text-left">
                            <div className="flex justify-between">
                              <span className="text-xs font-black text-vibrant-charcoal">Prune 💖👗</span>
                              <span className="text-[9px] text-zinc-500 font-bold">09:40</span>
                            </div>
                            <p className="text-[10px] text-zinc-500 font-bold truncate mt-0.5">Bisous, j'attends le cadeau du siècle ! 🤪</p>
                          </div>
                        </div>

                        <div 
                          onClick={() => setChatPartner('lea')} 
                          className="flex items-center gap-3 bg-white hover:bg-vibrant-cream/50 p-3 rounded-2xl border-2 border-vibrant-pink/15 cursor-pointer transition relative shadow-2xs"
                        >
                          <div className="w-11 h-11 rounded-full bg-vibrant-hotpink flex items-center justify-center font-bold text-lg text-white shadow-2xs border border-white">
                            🙋‍♀️
                          </div>
                          <div className="flex-1 text-left">
                            <div className="flex justify-between">
                              <span className="text-xs font-black text-vibrant-charcoal">Léa (BFF Prune)</span>
                              <span className="text-[9px] text-zinc-500 font-bold">10:15</span>
                            </div>
                            <p className="text-[10px] text-zinc-500 font-bold truncate mt-0.5">
                              {leaAsked ? "Je savais que tu m'appellerais..." : "Dispo pour t'éviter un désastre... 💅"}
                            </p>
                          </div>
                          {!leaAsked && (
                            <span className="absolute top-2.5 right-2 flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-vibrant-pink opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-vibrant-hotpink"></span>
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {activeTab === 'notes' && (
                      <div className="flex flex-col gap-4 text-left">
                        <div className="flex justify-between items-center border-b-2 border-vibrant-pink/15 pb-2">
                          <h3 className="font-serif font-black text-base text-vibrant-charcoal">Notes de Course</h3>
                          <span className="text-xs bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full border-2 border-emerald-300 font-mono font-bold">
                            Budget : {gameState.budget}€
                          </span>
                        </div>

                        {/* List of gifts in the basket */}
                        <div className="bg-[#F7F1E3] border-2 border-vibrant-pink/15 p-3.5 rounded-xl">
                          <span className="text-[10px] uppercase text-vibrant-hotpink font-black block mb-2 font-mono">
                            🎁 Panier actuel ({gameState.selectedItems.length}/3 cadeaux)
                          </span>
                          
                          {gameState.selectedItems.length === 0 ? (
                            <p className="text-xs text-zinc-500 font-bold italic py-4 text-center">Aucun cadeau choisi pour l'instant. Visite les boutiques !</p>
                          ) : (
                            <div className="flex flex-col gap-2">
                              {gameState.selectedItems.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center bg-white p-2 rounded-lg text-xs border border-vibrant-pink/5 shadow-3xs font-semibold">
                                  <span>{item.name}</span>
                                  <span className="font-mono text-emerald-705 font-bold">{item.price}€</span>
                                </div>
                              ))}
                              <div className="flex justify-between items-center border-t border-vibrant-pink/15 pt-2 text-xs font-black">
                                <span>Total dépensé :</span>
                                <span className="font-mono text-vibrant-cherry">
                                  {gameState.selectedItems.reduce((acc, item) => acc + item.price, 0)}€
                                </span>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Secrets written in JA notes */}
                        <div className="bg-amber-100 border-2 border-amber-300 p-3.5 rounded-xl flex flex-col gap-2 shadow-2xs">
                          <div className="flex items-center gap-1.5 text-amber-905 font-black text-[11px] uppercase tracking-wider font-mono">
                            <FileText size={12} /> Notes de JA (Mes Indices)
                          </div>
                          
                          {gameState.readClues.length === 0 && !gameState.askedLea ? (
                            <p className="text-xs text-amber-800/60 italic py-2">Aucun indice collecté. Regarde l'Instagram de Prune !</p>
                          ) : (
                            <ul className="text-xs flex flex-col gap-1.5 p-1 list-disc list-inside text-amber-950 font-medium">
                              {gameState.readClues.includes('sac_beige_manoir') && (
                                <li><strong>Sac:</strong> Veut le "Beige Manoir" (Atelier Paris). Pas de jaune fluo !</li>
                              )}
                              {gameState.readClues.includes('collier_emeraude') && (
                                <li><strong>Collier:</strong> Veut l'Émeraude Poétique d'or 18k chez l'Écrin Précieux.</li>
                              )}
                              {gameState.readClues.includes('parfum_lavande') && (
                                <li><strong>Parfum:</strong> Proscrire la lavande synthétique (migraine).</li>
                              )}
                              {gameState.askedLea && (
                                <li><strong>Avis Léa:</strong> Confirme toutes ses préférences !</li>
                              )}
                            </ul>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Tab Navigation Footer Bar */}
                  <div className="h-[60px] border-t-2 border-vibrant-pink/10 bg-white flex justify-around items-center text-xs">
                    <button
                      onClick={() => setActiveTab('insta')}
                      className={`flex flex-col items-center justify-center p-2 flex-1 transition-all ${
                        activeTab === 'insta' ? 'text-vibrant-hotpink font-black scale-103' : 'text-zinc-400 hover:text-vibrant-hotpink'
                      }`}
                    >
                      <Instagram size={18} className="mb-0.5" />
                      <span className="text-[10px] font-bold">Instagram</span>
                    </button>
                    
                    <button
                      onClick={() => setActiveTab('chat')}
                      className={`flex flex-col items-center justify-center p-2 flex-1 transition-all relative ${
                        activeTab === 'chat' ? 'text-vibrant-hotpink font-black scale-103' : 'text-zinc-400 hover:text-vibrant-hotpink'
                      }`}
                    >
                      <MessageSquare size={18} className="mb-0.5" />
                      <span className="text-[10px] font-bold">Messages</span>
                      {!leaAsked && (
                        <span className="absolute top-1 right-8 w-2 h-2 bg-vibrant-hotpink rounded-full animate-pulse"></span>
                      )}
                    </button>

                    <button
                      onClick={() => setActiveTab('notes')}
                      className={`flex flex-col items-center justify-center p-2 flex-1 transition-all ${
                        activeTab === 'notes' ? 'text-vibrant-hotpink font-black scale-103' : 'text-zinc-400 hover:text-vibrant-hotpink'
                      }`}
                    >
                      <FileText size={18} className="mb-0.5" />
                      <span className="text-[10px] font-bold">Mémo</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Simulated Home Screen Indicator bar */}
            <div className="h-[18px] bg-white flex items-center justify-center select-none pb-0.5 border-t border-vibrant-pink/5">
              <div className="w-28 h-1 bg-vibrant-charcoal/30 rounded-full"></div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
