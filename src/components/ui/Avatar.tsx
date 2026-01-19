import { ImgHTMLAttributes, forwardRef, useState } from 'react';
import { cn } from '../../lib/utils';
import { getDefaultAvatar } from '../../lib/defaultAvatars';

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  gender?: 'male' | 'female' | 'other';
  isBusiness?: boolean;
}

export const Avatar = forwardRef<HTMLImageElement, AvatarProps>(
  ({ className, src, gender, isBusiness, alt, ...props }, ref) => {
    const [imgError, setImgError] = useState(false);

    // Determine the correct fallback logic
    const avatarType = isBusiness ? 'business' : (gender || 'other');
    const fallbackSrc = getDefaultAvatar(avatarType);
    
    // Final source used: The provided src (if no error), otherwise the fallback
    const finalSrc = (src && !imgError) ? src : fallbackSrc;

    return (
      <img
        ref={ref}
        src={finalSrc}
        alt={alt || "Avatar"}
        onError={() => setImgError(true)}
        className={cn("object-cover bg-[#242526]", className)}
        {...props}
      />
    );
  }
);

Avatar.displayName = 'Avatar';
