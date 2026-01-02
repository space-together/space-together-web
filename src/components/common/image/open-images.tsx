"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Tag,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import Image from "next/image";
import type React from "react";
import { useEffect, useState } from "react";
import MyImage from "../myImage";

interface OpenImagesProps {
  images: string[]; // Pass an array of URLs
  initialIndex?: number; // Which image to start with
  isOpen?: boolean;
  onClose?: () => void;
  component?: React.ReactNode;
}

export function OpenImages({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
  component,
}: OpenImagesProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(1);

  // Reset zoom when image changes
  useEffect(() => {
    setZoom(1);
  }, [currentIndex]);

  // Sync index if initialIndex changes externally
  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.5, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.5, 1));

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogTrigger asChild>
        {component ? component : <MyImage src={images[currentIndex]} />}
      </DialogTrigger>
      <DialogContent className="max-w-[100vw] h-[100dvh] p-0 bg-black/95 border-none outline-none">
        {/* --- Header Controls --- */}
        <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-gradient-to-b from-black/60 to-transparent">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={onClose}
            >
              <X className="w-6 h-6" />
            </Button>
            <div className="bg-blue-600 rounded-full p-1.5 ml-2">
              <span className="text-white text-xs font-bold">f</span>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-white"
              onClick={handleZoomIn}
            >
              <ZoomIn className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white"
              onClick={handleZoomOut}
            >
              <ZoomOut className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white">
              <Tag className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hidden sm:flex"
            >
              <Maximize2 className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* --- Main Image Area --- */}
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          {/* Navigation Arrows (Only if multiple images) */}
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 z-50 rounded-full bg-white/10 hover:bg-white/20 text-white w-12 h-12"
                onClick={handlePrev}
              >
                <ChevronLeft className="w-8 h-8" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 z-50 rounded-full bg-white/10 hover:bg-white/20 text-white w-12 h-12"
                onClick={handleNext}
              >
                <ChevronRight className="w-8 h-8" />
              </Button>
            </>
          )}

          {/* The Image */}
          <div
            className="transition-transform duration-200 ease-out"
            style={{ transform: `scale(${zoom})` }}
          >
            <Image
              src={images[currentIndex]}
              alt={`Viewed image ${currentIndex + 1}`}
              width={1200}
              height={800}
              className="max-w-full max-h-[90dvh] object-contain select-none"
              priority
            />
          </div>
        </div>

        {/* --- Footer (Optional) --- */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      </DialogContent>
    </Dialog>
  );
}
