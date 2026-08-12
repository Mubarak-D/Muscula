/** Every image on the site resolves through this file.
 *
 *  Sources are currently crops of the brand's own Instagram posts, capped at
 *  640px by Instagram's public CDN. `scripts/crop-assets.ps1` cuts the burnt-in
 *  marketing copy off them. Because the sources are small, layouts frame these
 *  images at close to native size rather than stretching them full bleed.
 *
 *  When real photography arrives: drop it into public/images with the same file
 *  name, update the width and height here, and nothing else needs to change. */
export type Img = { src: string; w: number; h: number; alt: string };

export const IMAGES = {
  barHero: {
    src: "/images/bar-hero.jpg",
    w: 470,
    h: 248,
    alt: "Muscula protein bar broken open, showing cashew and oat centre under a chocolate coating",
  },
  ambassador: {
    src: "/images/ambassador.jpg",
    w: 362,
    h: 362,
    alt: "Athlete holding a wrapped Muscula protein bar on a rooftop",
  },
  gymFloor: {
    src: "/images/gym-floor.jpg",
    w: 480,
    h: 470,
    alt: "Two lifters training on a gym floor in Muscula shirts",
  },
  gymBags: {
    src: "/images/gym-bags.jpg",
    w: 640,
    h: 520,
    alt: "Gym interior with punching bags and turf, a Muscula shirt in the foreground",
  },
  partnerTranzformers: {
    src: "/images/partner-tranzformers.jpg",
    w: 360,
    h: 395,
    alt: "A tray of Muscula bars handed over at the Tranzformers gym",
  },
  partnerVaaj: {
    src: "/images/partner-vaaj.jpg",
    w: 360,
    h: 365,
    alt: "Muscula bars handed over at a Vaaj brand collaboration",
  },
} satisfies Record<string, Img>;

export type ImageKey = keyof typeof IMAGES;
