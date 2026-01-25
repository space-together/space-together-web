"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Returns true when the navbar should be visible.
 * - `offset` keeps the navbar visible when near top (e.g. 56).
 */
export function useScrollDirection(offset: number = 0) {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const THRESHOLD = 6; // pixels of tolerance to avoid janky flips

  useEffect(() => {
    if (typeof window === "undefined") return;

    lastScrollY.current = window.scrollY;

    const update = () => {
      const currentY = window.scrollY;

      // keep visible near top
      if (currentY <= offset) {
        setIsVisible(true);
      } else {
        // scrolling down -> hide; up -> show
        if (currentY > lastScrollY.current + THRESHOLD) {
          setIsVisible(false); // user scrolled down
        } else if (currentY < lastScrollY.current - THRESHOLD) {
          setIsVisible(true); // user scrolled up
        }
      }

      lastScrollY.current = currentY;
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(update);
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // run once to set initial state
    update();

    return () => window.removeEventListener("scroll", onScroll);
  }, [offset]);

  return isVisible;
}

export function useScrollPast(height: number = 100): boolean {
  const [isPast, setIsPast] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    setIsPast(window.scrollY > height);

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setIsPast(currentScroll > height);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [height]);

  return isPast;
}
