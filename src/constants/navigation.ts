import type { NavItem } from "@/types";

export const NAV_ITEMS: readonly NavItem[] = [
  { id: "landing", label: "Home" },
  { id: "gigs", label: "Gigs" },
  { id: "bio", label: "Bio" },
  { id: "listen", label: "Listen" },
  { id: "watch", label: "Watch" },
  { id: "contact", label: "Contact" },
] as const;
