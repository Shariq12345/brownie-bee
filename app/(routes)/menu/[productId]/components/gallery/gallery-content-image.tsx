"use client";
import Image from "next/image";
import React from "react";

interface GalleryContentImageProps {
  url: string;
}

const GalleryContentImage = ({ url }: GalleryContentImageProps) => {
  return (
    <div className="w-full h-full aspect-square sm:rounded-lg overflow-hidden">
      <Image
        src={url}
        alt={url}
        fill
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default GalleryContentImage;
