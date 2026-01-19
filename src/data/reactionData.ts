
// --- AUTHENTIC ANIMATED ASSETS ---
export const reactionAssets = {
  like: "/assets/reactions/like.png",
  love: "/assets/reactions/love.png",
  care: "/assets/reactions/care.png", 
  haha: "/assets/reactions/haha.png",
  wow: "/assets/reactions/wow.png",
  sad: "/assets/reactions/sad.png",
  angry: "/assets/reactions/angry.png",
  // Secret / Premium Reactions
  fire: "/assets/reactions/fire.png",
  rocket: "/assets/reactions/rocket.png"
};

// --- PHYSICS CONFIGURATION ---
export const bounceTransition = {
    type: "spring",
    stiffness: 400,
    damping: 10,
    mass: 0.8
} as const;
