"use client";
import Image from "next/image";
import React from "react";

interface GalleryContentImageProps {
  url: string;
}

const GalleryContentImage: React.FC<{ url: string }> = ({ url }) => {
  return (
    <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] relative rounded-lg overflow-hidden">
      <Image
        src={url}
        alt="Product image"
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
};

export default GalleryContentImage;
