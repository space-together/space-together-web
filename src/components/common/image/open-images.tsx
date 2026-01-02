"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react";
import Image from "next/image";
import type React from "react";
import { useCallback, useEffect, useState } from "react";
import MyImage from "../myImage";

interface OpenImagesProps {
  images: string[];
  initialIndex?: number;
  isOpen?: boolean;
  component?: React.ReactNode;
}

export function OpenImages({
  images,
  initialIndex = 0,
  isOpen,
  component,
}: OpenImagesProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(1);
  const [open, setOpen] = useState(isOpen);

  // Reset zoom when image changes
  useEffect(() => {
    setZoom(1);
  }, [currentIndex]);

  // Sync index if initialIndex changes externally
  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  const handleNext = useCallback(
    (e?: React.MouseEvent | KeyboardEvent) => {
      e?.stopPropagation();
      setCurrentIndex((prev) => (prev + 1) % images.length);
    },
    [images.length],
  );

  const handlePrev = useCallback(
    (e?: React.MouseEvent | KeyboardEvent) => {
      e?.stopPropagation();
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    },
    [images.length],
  );

  // Handle Keyboard Navigation
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext(e);
      if (e.key === "ArrowLeft") handlePrev(e);
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, handleNext, handlePrev]);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.5, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.5, 1));

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        {component ? component : <MyImage src={images[currentIndex]} />}
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-screen h-screen p-0 bg-base-300 bg-black/10 border-none outline-none">
        {/* --- Header Controls --- */}
        <div className="absolute top-0 z-50 left-0 right-0  flex items-center justify-between p-4  to-transparent">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className=" z-50"
              onClick={() => setOpen(false)}
              library="daisy"
              shape="circle"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>

          <div className="flex items-center gap-1 sm:gap-4">
            <Button
              variant="ghost"
              size={"md"}
              library="daisy"
              shape={"circle"}
              onClick={handleZoomIn}
              disabled={zoom >= 3} // Disabled at max zoom
            >
              <ZoomIn className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="md"
              library="daisy"
              shape={"circle"}
              onClick={handleZoomOut}
              disabled={zoom <= 1} // Disabled when not zoomed in
            >
              <ZoomOut className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* --- Main Image Area --- */}
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          {/* Navigation Arrows (Only if multiple images) */}
          {images.length > 1 && (
            <>
              <div
                className="absolute left-0 w-16 h-full flex items-center cursor-pointer"
                onClick={handlePrev}
              >
                <Button
                  variant="ghost"
                  className="bg-base-100 hover:bg-base-content/10 ml-4  z-50"
                  onClick={handlePrev}
                  library="daisy"
                  shape="circle"
                  size="lg"
                >
                  <ChevronLeft size={32} />
                </Button>
              </div>
              <div
                className="absolute right-0 w-16 h-full flex items-center  cursor-pointer"
                onClick={handleNext}
              >
                <Button
                  variant="ghost"
                  className="bg-base-100 hover:bg-base-content/10  z-50"
                  onClick={handleNext}
                  library="daisy"
                  shape="circle"
                  size="lg"
                >
                  <ChevronRight size={32} />
                </Button>
              </div>
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
              className="max-w-full max-h-screen object-contain select-none"
              priority
            />
          </div>
        </div>

        {/* --- Footer --- */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
