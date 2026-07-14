"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function registerGsapPlugins() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

export function createGoldLineDraw(target: gsap.TweenTarget) {
  registerGsapPlugins();
  return gsap.fromTo(
    target,
    { scaleX: 0, transformOrigin: "left center" },
    {
      scaleX: 1,
      duration: 1.4,
      ease: "power3.out",
      scrollTrigger: {
        trigger: target as gsap.DOMTarget,
        start: "top 85%",
      },
    },
  );
}

export { gsap, ScrollTrigger };
