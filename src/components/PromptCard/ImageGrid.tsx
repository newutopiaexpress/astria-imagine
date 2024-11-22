import React from "react";
import { Skeleton } from "../ui/skeleton";

interface ImageGridProps {
  images: string[] | undefined;
  onClick: (index: number) => void;
}

export const ImageGrid: React.FC<ImageGridProps> = ({ images, onClick }) => {
  if (!images || images.length === 0) {
    return (
      <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-2 w-full">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="w-full h-[300px]" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-[2px] md:gap-2 w-full">
      {images.map((image, i) => (
      <div 
      key={i} 
      className={`flex items-center w-full justify-center overflow-hidden md:rounded-md
      ${images.length === 1 ? 'rounded-md' : ''}
      ${images.length === 2 && i === 0 ? 'rounded-l-md' : ''}
      ${images.length === 2 && i === 1 ? 'rounded-r-md' : ''}
      ${images.length > 2 && i === 0 ? 'rounded-tl-md' : ''}
      ${images.length === 3 && i === 1 ? 'rounded-tr-md' : ''}
      ${images.length === 3 && i === 2 ? 'rounded-b-md' : ''}
      ${images.length === 4 && i === 1 ? 'rounded-tr-md' : ''}
      ${images.length === 4 && i === 2 ? 'rounded-bl-md' : ''}
      ${images.length === 4 && i === 3 ? 'rounded-br-md' : ''}
      ${images.length > 4 && i === 3 ? 'rounded-tr-md' : ''}
      ${images.length > 4 && i === images.length - 2 ? 'rounded-bl-md' : ''}
      ${images.length > 4 && i === images.length - 1 ? 'rounded-br-md' : ''}`}
      >
        <img 
          src={image} 
          alt={`prompt-${i}`} 
          className="object-cover w-full h-auto max-h-[900px]" 
          onClick={() => onClick(i)} 
        />
      </div>
      ))}
    </div>
  );
};
