import React from "react";
import Image from "next/image";

interface GalleryTabProps {
  url: string;
}

const GalleryTab = ({ url }: GalleryTabProps) => {
  return (
    <div className="w-24 h-24 aspect-square rounded-md relative">
      <Image
        src={url}
        alt={url}
        fill
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default GalleryTab;
