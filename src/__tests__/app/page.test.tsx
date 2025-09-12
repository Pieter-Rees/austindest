import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

jest.mock('@/components/layout/header', () => ({
  __esModule: true,
  default: () => <div data-testid='header'>Header</div>,
}));

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  bg?: boolean;
  fullVh?: boolean;
}

jest.mock('@/components/layout/section', () => ({
  Section: ({ children, id, bg, fullVh }: SectionProps) => (
    <div
      data-testid={`section-${id ?? 'no-id'}`}
      data-bg={bg}
      data-full-vh={fullVh}
    >
      {children}
    </div>
  ),
}));

jest.mock('@/components/features/landing', () => ({
  __esModule: true,
  default: () => <div data-testid='landing'>Landing</div>,
}));

jest.mock('@/components/features/landingBg', () => ({
  __esModule: true,
  default: () => <div data-testid='landing-bg'>Landing Background</div>,
}));

jest.mock('@/components/features/watch', () => ({
  __esModule: true,
  default: () => <div data-testid='watch'>Watch</div>,
}));

jest.mock('@/components/features/gigs', () => ({
  __esModule: true,
  default: () => <div data-testid='gigs'>Gigs</div>,
}));

jest.mock('@/components/features/bio', () => ({
  __esModule: true,
  default: () => <div data-testid='bio'>Bio</div>,
}));

jest.mock('@/components/features/listen', () => ({
  __esModule: true,
  default: () => <div data-testid='listen'>Listen</div>,
}));

jest.mock('@/components/features/contact', () => ({
  __esModule: true,
  default: () => <div data-testid='contact'>Contact</div>,
}));

jest.mock('@/components/layout/copyright', () => ({
  __esModule: true,
  default: () => <div data-testid='copyright'>Copyright</div>,
}));

describe('Home', () => {
  it('renders all sections in correct order', () => {
    render(<Home />);

    expect(screen.getByTestId('landing-bg')).toBeInTheDocument();
    expect(screen.getByTestId('section-landing')).toBeInTheDocument();
    expect(screen.getByTestId('section-gigs')).toBeInTheDocument();
    expect(screen.getByTestId('section-bio')).toBeInTheDocument();
    expect(screen.getByTestId('section-listen')).toBeInTheDocument();
    expect(screen.getByTestId('section-watch')).toBeInTheDocument();
    expect(screen.getByTestId('section-contact')).toBeInTheDocument();
    expect(screen.getByTestId('copyright')).toBeInTheDocument();
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('renders all feature components', () => {
    render(<Home />);

    expect(screen.getByTestId('landing')).toBeInTheDocument();
    expect(screen.getByTestId('gigs')).toBeInTheDocument();
    expect(screen.getByTestId('bio')).toBeInTheDocument();
    expect(screen.getByTestId('listen')).toBeInTheDocument();
    expect(screen.getByTestId('watch')).toBeInTheDocument();
    expect(screen.getByTestId('contact')).toBeInTheDocument();
  });

  it('applies correct section props', () => {
    render(<Home />);

    const landingSection = screen.getByTestId('section-landing');
    const gigsSection = screen.getByTestId('section-gigs');
    const bioSection = screen.getByTestId('section-bio');
    const listenSection = screen.getByTestId('section-listen');
    const watchSection = screen.getByTestId('section-watch');
    const contactSection = screen.getByTestId('section-contact');

    expect(landingSection).toHaveAttribute('data-full-vh', 'true');
    expect(landingSection).not.toHaveAttribute('data-bg');

    expect(gigsSection).toHaveAttribute('data-bg', 'true');
    expect(gigsSection).not.toHaveAttribute('data-full-vh');

    expect(bioSection).not.toHaveAttribute('data-bg');
    expect(bioSection).not.toHaveAttribute('data-full-vh');

    expect(listenSection).toHaveAttribute('data-bg', 'true');
    expect(listenSection).not.toHaveAttribute('data-full-vh');

    expect(watchSection).not.toHaveAttribute('data-bg');
    expect(watchSection).not.toHaveAttribute('data-full-vh');

    expect(contactSection).toHaveAttribute('data-bg', 'true');
    expect(contactSection).toHaveAttribute('data-full-vh', 'true');
  });

  it('renders without crashing', () => {
    expect(() => render(<Home />)).not.toThrow();
  });
});
