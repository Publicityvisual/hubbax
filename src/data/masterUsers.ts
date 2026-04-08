// Master Users for Hubbax Social Network
// Anti-censorship approach - minimum moderation, maximum transparency

export interface MasterUser {
  id: string;
  username: string;
  email: string;
  displayName: string;
  avatar?: string;
  role: 'supreme' | 'admin' | 'moderator' | 'verified' | 'regular';
  reputation: number;
  followers: number;
  following: number;
  postsCount: number;
  bio: string;
  isBot: boolean;
  verified: boolean;
  supremeLevel?: number;
  permissions?: string[];
  accessLevel?: number;
}

export const masterUsers: MasterUser[] = [
  {
    id: '0',
    username: 'admin',
    email: 'admin@hubbax.com',
    displayName: 'Supreme Admin',
    avatar: 'https://hubbax-711a1.firebasestorage.app/avatars/supreme.png',
    role: 'supreme',
    reputation: 999,
    followers: 9999,
    following: 0,
    postsCount: 500,
    bio: 'Original Supreme Administrator of Hubbax. Admin2025! password. Guardian of free speech and anti-censorship warrior with absolute transparency.',
    isBot: false,
    verified: true,
    supremeLevel: 99,
    permissions: ['all-access', 'override-any', 'delete-any', 'emergency-mode', 'master-access', 'transparent-logging'],
    accessLevel: 100
  },
  {
    id: '1',
    username: 'supreme',
    email: 'supreme@hubbax.com',
    displayName: 'Master Supreme',
    avatar: 'https://hubbax-711a1.firebasestorage.app/avatars/master-supreme.png',
    role: 'supreme',
    reputation: 900,
    followers: 8000,
    following: 50,
    postsCount: 400,
    bio: 'Master level Supreme Administrator - Second tier of unlimited power with full community transparency and accountability.',
    isBot: false,
    verified: true,
    supremeLevel: 95,
    permissions: ['view-all', 'moderate-all', 'emergency-access', 'transparency-enforcement'],
    accessLevel: 98
  },
  {
    id: '2',
    username: 'freedom',
    email: 'freedom@hubbax.com',
    displayName: 'Freedom Defender',
    avatar: 'https://hubbax-711a1.firebasestorage.app/avatars/freedom.png',
    role: 'admin',
    reputation: 100,
    followers: 1500,
    following: 50,
    postsCount: 200,
    bio: 'Defending free speech and transparency in social media',
    isBot: false,
    verified: true
  },
  {
    id: '2', 
    username: 'truth',
    email: 'truth@hubbax.com',
    displayName: 'Truth Seeker',
    avatar: 'https://hubbax-711a1.firebasestorage.app/avatars/truth.png',
    role: 'moderator',
    reputation: 85,
    followers: 800,
    following: 120,
    postsCount: 150,
    bio: 'Sharing uncensored information and fighting misinformation with transparency',
    isBot: false,
    verified: true
  },
  {
    id: '3',
    username: 'liberty',  
    email: 'liberty@hubbax.com',
    displayName: 'Libertarian Voice',
    avatar: 'https://hubbax-711a1.firebasestorage.app/avatars/liberty.png',
    role: 'verified',
    reputation: 75,
    followers: 500,
    following: 80,
    postsCount: 120,
    bio: 'Promoting individual liberty and free expression online',
    isBot: false,
    verified: true
  },
  {
    id: '4',
    username: 'tech',
    email: 'tech@hubbax.com',
    displayName: 'Tech Liberation',
    avatar: 'https://hubbax-711a1.firebasestorage.app/avatars/tech.png',
    role: 'verified',
    reputation: 90,
    followers: 600,
    following: 60,
    postsCount: 180,
    bio: 'Decentralized technology and web3 solutions',
    isBot: false,
    verified: true
  },
  {
    id: '5',
    username: 'art',
    email: 'art@hubbax.com',
    displayName: 'Free Expression',
    avatar: 'https://hubbax-711a1.firebasestorage.app/avatars/art.png',
    role: 'regular',
    reputation: 65,
    followers: 300,
    following: 100,
    postsCount: 80,
    bio: 'Celebrating art, culture and freedom of creative expression',
    isBot: false,
    verified: false
  },
  {
    id: '6',
    username: 'news',
    email: 'news@hubbax.com',
    displayName: 'Free Press Network', 
    avatar: 'https://hubbax-711a1.firebasestorage.app/avatars/news.png',
    role: 'verified',
    reputation: 80,
    followers: 400,
    following: 70,
    postsCount: 200,
    bio: 'Independent news without corporate or government influence',
    isBot: false,
    verified: true
  }
];

export const currentUser = masterUsers[0];