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
  { id: 'like', name: 'Me gusta', Component: LikeReaction, color: '#29b6f6' },
  { id: 'love', name: 'Me encanta', Component: LoveReaction, color: '#f44336' },
  { id: 'care', name: 'Me importa', Component: CareReaction, color: '#fbc02d' },
  { id: 'haha', name: 'Me divierte', Component: HahaReaction, color: '#fbc02d' },
  { id: 'wow', name: 'Me asombra', Component: WowReaction, color: '#fbc02d' },
  { id: 'sad', name: 'Me entristece', Component: SadReaction, color: '#fbc02d' },
  { id: 'angry', name: 'Me enoja', Component: AngryReaction, color: '#e64a19' },
  { id: 'fire', name: '¡Está que arde!', Component: FireReaction, color: '#ff5722' },
];
