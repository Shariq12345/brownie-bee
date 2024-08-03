"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GalleryContentImage from "./gallery-content-image";
import GalleryTab from "./gallery-tab";
// import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
// import Image from "next/image";

interface GalleryProps {
  images: {
    url: string;
  }[];
}

const Gallery = ({ images }: GalleryProps) => {
  return (
    <Tabs defaultValue={images[0].url} className="w-full relative">
      {images.map((tab) => (
        <TabsContent key={tab.url} value={tab.url.toString()}>
          <GalleryContentImage url={tab.url} />
        </TabsContent>
      ))}
      <TabsList className="bg-transparent w-full">
        {images.map((tab) => (
          <TabsTrigger key={tab.url} value={tab.url.toString()}>
            <GalleryTab url={tab.url} />
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
    // <TabGroup as="div" className="flex flex-col-reverse">
    //   <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
    //     <TabList className="grid grid-cols-4 gap-6">
    //       {images.map((image) => (
    //         <GalleryTab key={image.url} url={image.url} />
    //       ))}
    //     </TabList>
    //   </div>
    //   <TabPanels className="aspect-square w-full">
    //     {images.map((image) => (
    //       <TabPanel key={image.url}>
    //         <div className="aspect-square relative h-full w-full sm:rounded-lg overflow-hidden">
    //           <Image
    //             src={image.url}
    //             alt=""
    //             fill
    //             className="object-cover object-center"
    //           />
    //         </div>
    //       </TabPanel>
    //     ))}
    //   </TabPanels>
    // </TabGroup>
  );
};

export default Gallery;
