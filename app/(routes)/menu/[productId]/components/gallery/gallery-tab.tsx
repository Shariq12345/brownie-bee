import React from "react";
import Image from "next/image";

interface GalleryTabProps {
  url: string;
}

const GalleryTab: React.FC<{
  url: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ url, isActive, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`w-16 h-16 sm:w-20 sm:h-20 rounded-md relative cursor-pointer transition-all duration-300 ${
        isActive ? "ring-2 ring-rose-500" : "opacity-70 hover:opacity-100"
      }`}
    >
      <Image
        src={url}
        alt="Thumbnail"
        fill
        className="object-cover rounded-md"
        sizes="(max-width: 768px) 25vw, (max-width: 1200px) 15vw, 10vw"
      />
    </div>
  );
};
export default GalleryTab;
