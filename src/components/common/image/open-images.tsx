"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react";
import Image from "next/image";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import MyImage from "../myImage";

interface OpenImagesProps {
  images: string[];
  initialIndex?: number;
  isOpen?: boolean;
  component?: React.ReactNode;
  className?: string;
}

export function OpenImages({
  images,
  initialIndex = 0,
  isOpen,
  component,
  className,
}: OpenImagesProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(1);
  const [open, setOpen] = useState(isOpen);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef({ x: 0, y: 0 });
  const lastOffset = useRef({ x: 0, y: 0 });

  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  }, [currentIndex]);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  const handleNext = useCallback(
    (e?: React.MouseEvent | KeyboardEvent) => {
      e?.stopPropagation();
      setCurrentIndex((p) => (p + 1) % images.length);
    },
    [images.length],
  );

  const handlePrev = useCallback(
    (e?: React.MouseEvent | KeyboardEvent) => {
      e?.stopPropagation();
      setCurrentIndex((p) => (p - 1 + images.length) % images.length);
    },
    [images.length],
  );

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext(e);
      if (e.key === "ArrowLeft") handlePrev(e);
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, handleNext, handlePrev]);

  const handleZoomIn = () => setZoom((p) => Math.min(p + 0.5, 3));
  const handleZoomOut = () => {
    setZoom((p) => {
      const next = Math.max(p - 0.5, 1);
      if (next === 1) setOffset({ x: 0, y: 0 });
      return next;
    });
  };

  const handleDragStart = (e: React.DragEvent) => {
    if (zoom === 1) return;

    dragStart.current = { x: e.clientX, y: e.clientY };
    lastOffset.current = offset;

    const emptyImage = new window.Image();
    e.dataTransfer.setDragImage(emptyImage, 0, 0);
  };

  const handleDrag = (e: React.DragEvent) => {
    if (zoom === 1 || (e.clientX === 0 && e.clientY === 0)) return;

    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;

    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const maxX = (rect.width * (zoom - 1)) / 2;
    const maxY = (rect.height * (zoom - 1)) / 2;

    const x = Math.max(-maxX, Math.min(maxX, lastOffset.current.x + dx));
    const y = Math.max(-maxY, Math.min(maxY, lastOffset.current.y + dy));

    setOffset({ x, y });
  };

  const handleDragEnd = () => {
    lastOffset.current = offset;
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <div className=" cursor-pointer">
          {component ? (
            component
          ) : (
            <MyImage className={cn(className)} src={images[currentIndex]} />
          )}
        </div>
      </AlertDialogTrigger>

      <AlertDialogContent className="sm:max-w-screen h-screen p-0 bg-base-300 border-none outline-none">
        {/* Header */}
        <div className="absolute top-0 z-50 left-0 right-0 flex items-center justify-between p-4">
          <Button
            variant="ghost"
            onClick={() => setOpen(false)}
            library="daisy"
            shape="circle"
          >
            <X className="w-6 h-6" />
          </Button>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={handleZoomIn}
              disabled={zoom >= 3}
              library="daisy"
              shape="circle"
            >
              <ZoomIn />
            </Button>
            <Button
              variant="ghost"
              onClick={handleZoomOut}
              disabled={zoom <= 1}
              library="daisy"
              shape="circle"
            >
              <ZoomOut />
            </Button>
          </div>
        </div>

        {/* Image Area */}
        <div
          ref={containerRef}
          className="relative w-full h-full flex items-center justify-center overflow-hidden"
        >
          {images.length > 1 && (
            <>
              <div className="absolute left-0 w-16 h-full flex items-center">
                <Button
                  variant="ghost"
                  onClick={handlePrev}
                  library="daisy"
                  shape="circle"
                  size={"lg"}
                  className="z-50"
                >
                  <ChevronLeft size={32} />
                </Button>
              </div>
              <div className="absolute right-0 w-16 h-full flex items-center">
                <Button
                  variant="ghost"
                  onClick={handleNext}
                  library="daisy"
                  shape="circle"
                  size={"lg"}
                  className="z-50"
                >
                  <ChevronRight size={32} />
                </Button>
              </div>
            </>
          )}

          {/* Draggable Image */}
          <div
            draggable={zoom > 1}
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            className="transition-transform duration-200 ease-out  active:cursor-grabbing"
            style={{
              transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
            }}
          >
            <Image
              src={images[currentIndex]}
              alt="Viewed image"
              width={1200}
              height={800}
              className="max-w-full max-h-screen object-contain select-none"
              draggable={false}
              contentEditable={false}
              priority
            />
          </div>
        </div>

        {/* Footer */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-base-content/70 text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
