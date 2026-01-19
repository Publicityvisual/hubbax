
// --- AUTHENTIC ANIMATED ASSETS ---
export const reactionAssets = {
  like: "/assets/reactions/like_premium.png",
  love: "/assets/reactions/love_premium.png",
  care: "/assets/reactions/care_premium.png", 
  haha: "/assets/reactions/haha_premium.png",
  wow: "/assets/reactions/wow_premium.png",
  sad: "/assets/reactions/sad_premium.png",
  angry: "/assets/reactions/angry_premium.png",
  // Secret / Premium Reactions
  fire: "/assets/reactions/fire_premium.png",
  rocket: "/assets/reactions/rocket_premium.png",
  flower: "/assets/reactions/flower_premium.png",
  pride: "/assets/reactions/pride_premium.png",
  plane: "/assets/reactions/plane_premium.png"
};

// --- PHYSICS CONFIGURATION ---
export const bounceTransition = {
    type: "spring",
    stiffness: 400,
    damping: 10,
    mass: 0.8
} as const;
