import type { Metadata } from "next";

/** The page itself reads sessionStorage, so it has to be a client component and
 *  cannot export metadata. This layout carries the title instead. */
export const metadata: Metadata = {
  title: "Order received",
  description: "Your simulated Muscula order summary.",
  robots: { index: false, follow: false },
};

export default function ConfirmationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
