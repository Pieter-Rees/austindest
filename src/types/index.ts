export interface NavItem {
  readonly id: string;
  readonly label: string;
}

export type Theme = "light" | "dark" | "system";

export interface AppState {
  readonly showSideNav: boolean;
  readonly navBackground: boolean;
  readonly activeSection: string;
  readonly isLoading: boolean;
  readonly theme: Theme;
}

export interface Gig {
  readonly id: string;
  readonly title: string;
  readonly date: string;
  readonly venue: string;
  readonly location: string;
  readonly time?: string;
  readonly ticketUrl?: string;
  readonly description?: string;
}
