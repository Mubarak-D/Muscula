import { animate, createTimeline, onScroll, stagger, utils } from "animejs";

/** Timing floor and ceiling for the whole site, so nothing drifts sluggish. */
export const DUR = { fast: 150, base: 400, slow: 600, count: 900 } as const;
export const EASE = "out(3)";

export function prefersReduced(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Reveals every [data-reveal] inside `root` once, when the section scrolls in.
 *
 *  Elements start visible in the HTML and are hidden here, in JS, immediately
 *  before the observer is attached. That ordering matters: with no JS, or with
 *  reduced motion on, the content is simply there rather than stuck at zero
 *  opacity waiting for an animation that never runs. */
export function revealSection(root: HTMLElement): () => void {
  const targets = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
  if (targets.length === 0) return () => {};

  if (prefersReduced()) {
    utils.set(targets, { opacity: 1, y: 0 });
    return () => {};
  }

  utils.set(targets, { opacity: 0, y: 24 });

  const animation = animate(targets, {
    opacity: 1,
    y: 0,
    duration: DUR.slow,
    ease: EASE,
    delay: stagger(60),
    autoplay: onScroll({ target: root, enter: "bottom-=80 top", repeat: false }),
  });

  return () => {
    animation.revert();
    utils.set(targets, { opacity: 1, y: 0 });
  };
}

/** Counts an element's text from zero to `to` once, on scroll into view. */
export function countUp(el: HTMLElement, to: number): () => void {
  if (prefersReduced()) {
    el.textContent = String(to);
    return () => {};
  }

  const counter = { n: 0 };
  el.textContent = "0";

  const animation = animate(counter, {
    n: to,
    duration: DUR.count,
    ease: EASE,
    onUpdate: () => {
      el.textContent = String(Math.round(counter.n));
    },
    onComplete: () => {
      el.textContent = String(to);
    },
    autoplay: onScroll({ target: el, enter: "bottom-=40 top", repeat: false }),
  });

  return () => {
    animation.revert();
    el.textContent = String(to);
  };
}

/** The one orchestrated moment on the site: the hero assembling on load.
 *  Claim lines rise in sequence, the product panel settles, the CTA lands last. */
export function heroEntry(root: HTMLElement): () => void {
  const lines = Array.from(root.querySelectorAll<HTMLElement>("[data-hero-line]"));
  const panel = root.querySelector<HTMLElement>("[data-hero-panel]");
  const cta = root.querySelector<HTMLElement>("[data-hero-cta]");
  const all = [...lines, panel, cta].filter((el): el is HTMLElement => el !== null);
  if (all.length === 0) return () => {};

  if (prefersReduced()) {
    utils.set(all, { opacity: 1, y: 0, scale: 1 });
    return () => {};
  }

  utils.set(lines, { opacity: 0, y: 28 });
  if (panel) utils.set(panel, { opacity: 0, scale: 0.94 });
  if (cta) utils.set(cta, { opacity: 0, y: 12 });

  const timeline = createTimeline({ defaults: { ease: EASE } });

  timeline.add(lines, {
    opacity: 1,
    y: 0,
    duration: DUR.slow,
    delay: stagger(80),
  });

  if (panel) {
    timeline.add(panel, { opacity: 1, scale: 1, duration: DUR.slow }, "-=420");
  }
  if (cta) {
    timeline.add(cta, { opacity: 1, y: 0, duration: DUR.base }, "-=260");
  }

  return () => {
    timeline.revert();
    utils.set(all, { opacity: 1, y: 0, scale: 1 });
  };
}

/** Feedback for adding to cart: the header count pops. Not a celebration. */
export function popCount(el: HTMLElement): void {
  if (prefersReduced()) return;
  animate(el, {
    scale: [1, 1.35, 1],
    duration: DUR.base,
    ease: "out(2)",
  });
}
