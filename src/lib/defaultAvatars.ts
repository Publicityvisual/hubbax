// SVG Data URIs for Default Avatars
// These are optimized SVGs converted to Data URIs for immediate use in <img> tags.
// Style: Modern, Minimalist, Dark Mode Compatible (Neutral Grey Background)

const SVG_BG = "%23242526"; // #242526 (Dark Grey)
const SVG_FG = "%238a8d91"; // #8a8d91 (Light Grey Text/Icon)

// 1. Male (Silhouette with short hair)
export const DEFAULT_AVATAR_MALE = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='${SVG_BG}'/%3E%3Cpath fill='${SVG_FG}' d='M100 115c22.1 0 40-17.9 40-40s-17.9-40-40-40-40 17.9-40 40 17.9 40 40 40zm0 15c-26.7 0-80 13.4-80 40v30h160v-30c0-26.6-53.3-40-80-40z'/%3E%3C/svg%3E`;

// 2. Female (Silhouette with longer hair shape)
export const DEFAULT_AVATAR_FEMALE = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='${SVG_BG}'/%3E%3Cpath fill='${SVG_FG}' d='M100 110c24.8 0 45-20.2 45-45S124.8 20 100 20 55 40.2 55 65s20.2 45 45 45zm0 15c-29.7 0-90 15-90 45v30h180v-30c0-30-60.3-45-90-45z'/%3E%3C/svg%3E`;

// 3. Business / Page (Storefront Icon)
export const DEFAULT_AVATAR_BUSINESS = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='${SVG_BG}'/%3E%3Cpath fill='${SVG_FG}' d='M160 80V50H40v30l-10 10v70h140V90l-10-10zm-50 40h-20v20h-20v-20H50v-20h20v-10h60v10h20v20zm-10-80H100L80 60h40l-20-20z'/%3E%3Cpath fill='${SVG_FG}' d='M40 50l80-30 80 30v30H40z'/%3E%3C/svg%3E`;

// 4. Default / Neutral (Generic User)
export const DEFAULT_AVATAR_NEUTRAL = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='${SVG_BG}'/%3E%3Ccircle cx='100' cy='85' r='35' fill='${SVG_FG}'/%3E%3Cpath fill='${SVG_FG}' d='M100 130c-35 0-70 18-70 45v25h140v-25c0-27-35-45-70-45z'/%3E%3C/svg%3E`;

export function getDefaultAvatar(type: 'male' | 'female' | 'business' | 'other' | undefined | null) {
  switch (type) {
    case 'male': return DEFAULT_AVATAR_MALE;
    case 'female': return DEFAULT_AVATAR_FEMALE;
    case 'business': return DEFAULT_AVATAR_BUSINESS;
    default: return DEFAULT_AVATAR_NEUTRAL;
  }
}
