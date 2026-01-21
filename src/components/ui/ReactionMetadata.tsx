import { 
    LikeReaction, 
    LoveReaction, 
    CareReaction, 
    HahaReaction, 
    WowReaction, 
    SadReaction, 
    AngryReaction,
    FireReaction
} from './Reactions';

// --- EXPORTABLE REACTION LIST (For Dock/Selector) ---
export const REACTION_METADATA = [
  { id: 'like', name: 'Me gusta', Component: LikeReaction, color: '#29b6f6', imagePath: '/assets/reactions/reactions_like.png' },
  { id: 'love', name: 'Me encanta', Component: LoveReaction, color: '#f44336', imagePath: '/assets/reactions/reactions_love.png' },
  { id: 'haha', name: 'Me divierte', Component: HahaReaction, color: '#fbc02d', imagePath: '/assets/reactions/reactions_haha.png' },
  { id: 'wow', name: 'Me asombra', Component: WowReaction, color: '#fbc02d', imagePath: '/assets/reactions/reactions_wow.png' },
  { id: 'sad', name: 'Me entristece', Component: SadReaction, color: '#fbc02d', imagePath: '/assets/reactions/reactions_sad.png' },
  { id: 'angry', name: 'Me enoja', Component: AngryReaction, color: '#e64a19', imagePath: '/assets/reactions/reactions_angry.png' },
  // Custom Hubbax/Modern Reactions (Hybrid)
  { id: 'care', name: 'Me importa', Component: CareReaction, color: '#fbc02d', imagePath: null }, 
  { id: 'fire', name: '¡Está que arde!', Component: FireReaction, color: '#ff5722', imagePath: null },
];
