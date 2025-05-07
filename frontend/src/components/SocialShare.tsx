import React from 'react';

interface SocialShareProps {
  shareText: string;
}

export const SocialShare: React.FC<SocialShareProps> = ({ shareText }) => {
  const encodedText = encodeURIComponent(shareText);
  
  const socials = [
    {
      name: 'Twitter',
      url: `https://twitter.com/intent/tweet?text=${encodedText}`,
      bgColor: 'bg-[#1DA1F2]',
      text: 'X'
    },
    {
      name: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}&quote=${encodedText}`,
      bgColor: 'bg-[#4267B2]',
      text: 'f'
    },
    {
      name: 'LINE',
      url: `https://social-plugins.line.me/lineit/share?url=${window.location.href}&text=${encodedText}`,
      bgColor: 'bg-[#06C755]',
      text: 'L'
    },
    {
      name: 'Instagram',
      // Instagram doesn't support direct sharing via URL, this is a placeholder
      url: `https://www.instagram.com/`,
      bgColor: 'bg-gradient-to-tr from-[#feda75] via-[#d62976] to-[#4f5bd5]',
      text: 'Ig'
    }
  ];

  return (
    <div className="flex justify-center space-x-4">
      {socials.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`
            ${social.bgColor} text-white w-10 h-10 rounded-full 
            flex items-center justify-center transition-transform 
            hover:scale-110 shadow-sm font-bold
          `}
          aria-label={`Share on ${social.name}`}
        >
          {social.text}
        </a>
      ))}
    </div>
  );
};