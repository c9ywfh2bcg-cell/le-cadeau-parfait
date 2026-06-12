/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FashionItem } from './types';

export const FASHION_ITEMS: FashionItem[] = [
  // Shop 1: La Maroquinerie d'Or
  {
    id: 'sac_beige_manoir',
    name: 'Sac Cabas "Beige Manoir" en Cuir',
    category: 'bag',
    price: 220,
    description: 'Cuir foulonné beige-terre de l\'Atelier Paris. Couture sellier impeccable, intérieur daim douillet. Une pièce intemporelle de créateur.',
    rating: 'dream',
    relationshipEffect: 25,
    tags: ['Chic', 'Indispensable', 'Cuir Véritable', 'Wishlist'],
    color: '#D2B48C', // Tan/Beige
    iconName: 'ShoppingBag',
    originalReaction: 'Prune en rêve nuit et jour ! C\'est pile la couleur terre qu\'elle cherchait pour compléter sa collection d\'été.',
    successReaction: '« OH MON DIEU, JA ! Le Beige Manoir de chez l\'Atelier Paris ! Mais comment tu as su ?! Il est en rupture de stock partout, tu es un magicien !Je t\'aime tellement ! »'
  },
  {
    id: 'sac_jaune_neon',
    name: 'Sac Cabas Fluorescent "Néorun"',
    category: 'bag',
    price: 140,
    description: 'Une explosion de couleur jaune fluo pour un style urbain affirmé. Poignées en sangle de nylon renforcée.',
    rating: 'terrible',
    relationshipEffect: -15,
    tags: ['Fluo', 'Urbain', 'Synthétique', 'Voyant'],
    color: '#CCFF00', // Neon Yellow
    iconName: 'ShoppingBag',
    originalReaction: 'Prune déteste le jaune fluo de tout son être. Elle trouve cela vulgaire et incompatible avec ses tenues de créateur.',
    successReaction: '« Attends... JA... c\'est bien du jaune néon ? Mais c\'est affreux ! On dirait un gilet de sécurité routière ou un sac poubelle radioactif ! Tu veux que je me fasse renverser ou quoi ? Tu connais vraiment mes goûts toi... »'
  },
  {
    id: 'sac_noir_classique',
    name: 'Sac Pochette Noir de Soirée',
    category: 'bag',
    price: 90,
    description: 'Pochette élégante en similicuir grainé noir avec fine bandoulière chaîne dorée amovible. Simple et passe-partout.',
    rating: 'average',
    relationshipEffect: 5,
    tags: ['Classique', 'Passe-partout', 'Sobre'],
    color: '#1A1A1A', // Dark Black
    iconName: 'ShoppingBag',
    originalReaction: 'Un choix ultra classique. Prune aime bien, mais elle possède déjà au moins huit pochettes noires similaires.',
    successReaction: '« Merci mon chéri, elle est jolie ! Bon, c\'est vrai qu\'elle ressemble beaucoup à celle que j\'ai achetée le mois dernier... et à celle de l\'année d\'avant. Mais c\'est l\'intention qui compte ! »'
  },

  // Shop 2: Le Miroir de Prune
  {
    id: 'lunettes_ecaille',
    name: 'Lunettes Rétro "Écaille de Tortue"',
    category: 'clothing_glasses',
    price: 130,
    description: 'Forme œil-de-chat iconique des années 70, monture épaisse en acétate écaille de tortue et charnières plaquées or.',
    rating: 'dream',
    relationshipEffect: 20,
    tags: ['Vintage', 'Années 70', 'Luxe Retrouvé', 'Must-Have'],
    color: '#553C1F', // Tortoise dark brown
    iconName: 'Glasses',
    originalReaction: 'C\'est l\'accessoire rétro chic ultime dont elle a parlé dans ses derniers posts. Elle adore masquer ses regards avec mystère !',
    successReaction: '« Oh, mais c\'est la monture rétro écaille dorée que je convoitais ! Regarde mes copines vont être folles de jalousie ! Je me sens comme une star incognito à Saint-Tropez. Merci mon amour ! »'
  },
  {
    id: 'robe_jaune_moutarde',
    name: 'Robe d\'Été Satinée Jaune Moutarde',
    category: 'clothing_glasses',
    price: 180,
    description: 'Robe midi ajustée en satin de soie lourd, dos nu croisé et fines bretelles réglables. Un ton moutarde chaleureux.',
    rating: 'terrible',
    relationshipEffect: -10,
    tags: ['Satin', 'Dos Nu', 'Couleur Risquée'],
    color: '#E1AD01', // Mustard Yellow
    iconName: 'Shirt',
    originalReaction: 'Le jaune moutarde sabote complètement son teint de peau. Elle a explicitement proscrit cette couleur de sa garde-robe.',
    successReaction: '« Ah... Une robe moutarde. JA, mon chéri... C\'est une plaisanterie ? Tu sais très bien que le jaune moutarde me donne le teint d\'une personne malade du foie ! C\'est une catastrophe visuelle, je ne la porterai jamais ! »'
  },
  {
    id: 'echarpe_soie_marine',
    name: 'Écharpe en Soie Bleue Marine',
    category: 'clothing_glasses',
    price: 80,
    description: 'Soie de mûrier imprimée de motifs géométriques discrets inspirés de l\'art déco lyonnais. Légère et douce.',
    rating: 'average',
    relationshipEffect: 10,
    tags: ['Soie Naturelle', 'Lyon', 'Art Déco'],
    color: '#0020C2', // Cobalt Navy
    iconName: 'Bookmark',
    originalReaction: 'Un accessoire en soie raffiné. Prune apprécie la matière de qualité, bien que la couleur marine soit un peu trop sage à son goût.',
    successReaction: '« Oh, de la soie naturelle ! Elle est douce, et le motif art déco est charmant. C\'est un peu classique pour moi, mais avec un trench beige, ça donnera un style parisien sympa. Merci chou d\'amour. »'
  },

  // Shop 3: L'Écrin Précieux
  {
    id: 'collier_emeraude',
    name: 'Collier "Émeraude Poétique"',
    category: 'jewelry_perfume',
    price: 250,
    description: 'Chaîne en or jaune 18 carats ornée d\'une émeraude ovale naturelle sertie griffe, soulignée par un motif feuille ciselée.',
    rating: 'dream',
    relationshipEffect: 30,
    tags: ['Or 18k', 'Émeraude Fine', 'Poétique', 'Chef-d\'œuvre'],
    color: '#097969', // Emerald Green
    iconName: 'Sparkles',
    originalReaction: 'Le bijou idéal dont elle rêve en secret. Elle adore la poésie du pendentif en forme de feuille verte.',
    successReaction: '« Non... ce n\'est pas vrai !! Le collier Émeraude Poétique ?! JA, je n\'en crois pas mes yeux ! C\'est de l\'or 18 carats et une vraie émeraude ! Il est tellement délicat, tellement romantique. Tu es l\'homme parfait... »'
  },
  {
    id: 'parfum_lavande',
    name: 'Eau de Parfum "Lavande Impériale"',
    category: 'jewelry_perfume',
    price: 70,
    description: 'Flacon de luxe en cristal taillé. Une fragrance intense qui combine lavande de synthèse, romarin et musc blanc puissant.',
    rating: 'terrible',
    relationshipEffect: -15,
    tags: ['Intense', 'Flacon Cristal', 'Synthétique'],
    color: '#E6E6FA', // Lavender
    iconName: 'Flame',
    originalReaction: 'Une senteur ultra capiteuse qui provoque immédiatement une migraine oculaire insoutenable chez Prune.',
    successReaction: '« Oh... (tousse). C\'est gentil, mais... de la lavande synthétique ? Tu as oublié que ce parfum me donne une migraine fulgurante en moins de deux minutes ? Je vais devoir aéser le salon pendant trois jours là... »'
  },
  {
    id: 'bracelet_argent_rigide',
    name: 'Jonc d\'Argent Massif Poli',
    category: 'jewelry_perfume',
    price: 110,
    description: 'Bracelet jonc ouvert en argent sterling 925, finition miroir éclatante, gravé d\'une frise minimaliste à l\'intérieur.',
    rating: 'average',
    relationshipEffect: 10,
    tags: ['Argent 925', 'Minimaliste', 'Poli Miroir'],
    color: '#C0C0C0', // Silver
    iconName: 'Award',
    originalReaction: 'Un bracelet élégant et de bonne facture, mais un peu impersonnel pour marquer son anniversaire légendaire.',
    successReaction: '« Oh, un jonc en argent ! Il est très beau, épuré, très contemporain. Je pourrai l\'accumuler avec mes autres bracelets ! C\'est un bon choix classique, bravo JA ! »'
  }
];

export interface InstaPost {
  id: string;
  imageSeed: string;
  username: string;
  avatarColor: string;
  caption: string;
  likes: number;
  commentsCount: number;
  timeAgo: string;
}

export const INSTA_POSTS: InstaPost[] = [
  {
    id: 'post_1',
    imageSeed: 'chic_handbag',
    username: 'prune_style_officiel',
    avatarColor: 'from-pink-500 to-rose-400',
    caption: 'Totalement dingue des créations d’Atelier Paris cet été ! Le coloris "Beige Manoir" est tellement doux et naturel... C’est simple, il va avec TOUT ! 😍👜 Bientôt mon anniversaire... Je dis ça, je dis rien... #ManoirBeige #Wishlist #Chic #ParisJeTaime',
    likes: 1248,
    commentsCount: 42,
    timeAgo: 'Il y a 1 jour'
  },
  {
    id: 'post_2',
    imageSeed: 'retro_vintage',
    username: 'prune_style_officiel',
    avatarColor: 'from-pink-500 to-rose-400',
    caption: 'Mood du jour : Vintage à fond ! 🕶️ En panne d’inspiration pour mon anniversaire, mais ces lunettes rétro écaille de tortue avec monture d’or délicate m’appellent... Le glamour des années 70 n’attend que moi ! ✨😎 d’ailleurs, merci d’éviter d’acheter du jaune néon, j’ai déjà l’air d’un surligneur au bureau...',
    likes: 935,
    commentsCount: 18,
    timeAgo: 'Il y a 3 jours'
  },
  {
    id: 'post_3',
    imageSeed: 'jewelry_emerald',
    username: 'prune_style_officiel',
    avatarColor: 'from-pink-500 to-rose-400',
    caption: 'Une feuille d’émeraude fine montée sur de l’or pur 18 carats... C\'est la poésie absolue ! 🍃💚 J’ai vu ce collier chez L’Écrin Précieux et mon cœur s\'est arrêté d\'acheter pendant 5 secondes (record historique !). S\'il vous plaît, dites non aux parfums à la lavande synthétique d\'ailleurs, ça me donne la pire migraine du monde ! 😭🤕 #ObsessionBijoux #ÉmeraudePoétique',
    likes: 1562,
    commentsCount: 56,
    timeAgo: 'Il y a 5 jours'
  }
];

export const WRAP_CHOICES = [
  {
    id: 'cheap',
    name: 'Sachet Kraft Standard',
    cost: 0,
    description: 'Le sachet écolo de base fourni par les boutiques. Un peu froissé, mais gratuit.',
    loveEffect: 0,
    reaction: 'Prune apprécie l\'esprit écolo, mais fait discrètement la moue face au sachet en papier froissé.'
  },
  {
    id: 'glam',
    name: 'Boîte Glamour Pastel & Ruban',
    cost: 15,
    description: 'Une boîte rose poudré rigide fermée par un élégant ruban en satin noir.',
    loveEffect: 5,
    reaction: '« Oh, la boîte est tellement mignonne ! J\'adore découdre le ruban, ça fait très chic ! »'
  },
  {
    id: 'royal',
    name: 'Écrin Royal Doré & Sceau de Cire',
    cost: 30,
    description: 'Papier de soie parfumé, coffret orné de dorures à l\'or chaud et fermé par un vrai sceau de cire personnalisé.',
    loveEffect: 10,
    reaction: '« INCROYABLE ! On dirait un paquet venant d\'une reine ! Le sceau de cire avec nos initiales... Je fonds ! 😍 »'
  }
];

export const CARD_SUGGESTIONS = [
  "Joyeux anniversaire à la plus belle des fashionistas. J'espère que ces cadeaux reflètent tout l'amour que j'ai pour toi, ma Prune. ♥️",
  "Pour la fille qui embellit mes journées (et vide mon compte en banque avec style !). Joyeux anniversaire mon amour. 🎂✨",
  "Un an de plus à tes côtés, à admirer ta passion, ta beauté et ton énergie incroyable. Joyeux anniversaire ma Prune ! Ton JA qui t'aime."
];
