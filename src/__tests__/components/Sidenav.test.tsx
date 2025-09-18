import { render, screen, fireEvent } from '@testing-library/react';
import Sidenav from '@/components/layout/Sidenav';

interface ScrollLinkProps {
  children: React.ReactNode;
  to: string;
  onClick?: () => void;
  activeClass?: string;
  spy?: boolean;
  smooth?: boolean;
  offset?: number;
  duration?: number;
  className?: string;
  [key: string]: unknown;
}

jest.mock('react-scroll', () => ({
  Link: ({
    children,
    to,
    onClick,
    activeClass,
    spy,
    smooth,
    offset,
    duration,
    className,
    ...props
  }: ScrollLinkProps) => (
    <a
      href={`#${to}`}
      onClick={onClick}
      className={className}
      data-active-class={activeClass}
      data-spy={spy}
      data-smooth={smooth}
      data-offset={offset}
      data-duration={duration}
      {...props}
    >
      {children}
    </a>
  ),
}));

jest.mock('@/components/features/Socials', () => ({
  __esModule: true,
  default: () => <div data-testid='socials'>Socials</div>,
}));

describe('Sidenav', () => {
  const mockHandleToggle = jest.fn();

  beforeEach(() => {
    mockHandleToggle.mockClear();
  });

  it('renders navigation links when showSideNav is true', () => {
    render(<Sidenav handleToggle={mockHandleToggle} showSideNav={true} />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Gigs')).toBeInTheDocument();
    expect(screen.getByText('Bio')).toBeInTheDocument();
    expect(screen.getByText('Listen')).toBeInTheDocument();
    expect(screen.getByText('Watch')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders overlay when showSideNav is true', () => {
    render(<Sidenav handleToggle={mockHandleToggle} showSideNav={true} />);

    const overlays = screen.getAllByRole('generic');
    const overlay = overlays.find(
      el =>
        el.classList.contains('fixed') &&
        el.classList.contains('inset-0') &&
        el.classList.contains('bg-black/30')
    );
    expect(overlay).toHaveClass(
      'fixed',
      'inset-0',
      'bg-black/30',
      'backdrop-blur-sm',
      'z-40',
      'lg:hidden'
    );
  });

  it('does not render overlay when showSideNav is false', () => {
    render(<Sidenav handleToggle={mockHandleToggle} showSideNav={false} />);

    const overlays = screen.queryAllByRole('generic');
    const overlay = overlays.find(
      el =>
        el.classList.contains('fixed') &&
        el.classList.contains('inset-0') &&
        el.classList.contains('bg-black/30')
    );
    expect(overlay).toBeUndefined();
  });

  it('applies correct nav classes when showSideNav is true', () => {
    render(<Sidenav handleToggle={mockHandleToggle} showSideNav={true} />);

    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass(
      'block',
      'lg:hidden',
      'transition-all',
      'fixed',
      'left-0',
      'top-0',
      'h-full',
      'w-full',
      'overflow-hidden',
      'bg-black/80',
      'backdrop-blur-xl',
      'border-r',
      'border-white/10',
      'transform-gpu',
      'z-50'
    );
  });

  it('applies translate class when showSideNav is false', () => {
    render(<Sidenav handleToggle={mockHandleToggle} showSideNav={false} />);

    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('-translate-x-full');
  });

  it('calls handleToggle when navigation links are clicked', () => {
    render(<Sidenav handleToggle={mockHandleToggle} showSideNav={true} />);

    const homeLink = screen.getByText('Home');
    fireEvent.click(homeLink);

    expect(mockHandleToggle).toHaveBeenCalledTimes(1);
  });

  it('renders socials component', () => {
    render(<Sidenav handleToggle={mockHandleToggle} showSideNav={true} />);

    expect(screen.getByTestId('socials')).toBeInTheDocument();
  });

  it('has correct navigation structure', () => {
    render(<Sidenav handleToggle={mockHandleToggle} showSideNav={true} />);

    const nav = screen.getByRole('navigation');
    const container = nav.querySelector('div');
    expect(container).toHaveClass(
      'flex',
      'flex-col',
      'justify-center',
      'items-center',
      'h-full'
    );
  });

  it('has correct links container structure', () => {
    render(<Sidenav handleToggle={mockHandleToggle} showSideNav={true} />);

    const linksContainer = screen.getByText('Home').closest('div');
    expect(linksContainer).toHaveClass(
      'flex',
      'flex-col',
      'justify-center',
      'items-center',
      'uppercase',
      'gap-8'
    );
  });

  it('has correct socials container structure', () => {
    render(<Sidenav handleToggle={mockHandleToggle} showSideNav={true} />);

    const socialsContainer = screen
      .getByTestId('socials')
      .closest('div')?.parentElement;
    expect(socialsContainer).toHaveClass('mt-12');
  });

  it('renders all individual navigation links with correct props', () => {
    render(<Sidenav handleToggle={mockHandleToggle} showSideNav={true} />);

    // Test each individual link
    const homeLink = screen.getByText('Home').closest('a');
    const gigsLink = screen.getByText('Gigs').closest('a');
    const bioLink = screen.getByText('Bio').closest('a');
    const listenLink = screen.getByText('Listen').closest('a');
    const watchLink = screen.getByText('Watch').closest('a');
    const contactLink = screen.getByText('Contact').closest('a');

    expect(homeLink).toHaveAttribute('href', '#landing');
    expect(gigsLink).toHaveAttribute('href', '#gigs');
    expect(bioLink).toHaveAttribute('href', '#bio');
    expect(listenLink).toHaveAttribute('href', '#listen');
    expect(watchLink).toHaveAttribute('href', '#watch');
    expect(contactLink).toHaveAttribute('href', '#contact');
  });

  it('calls handleToggle when each navigation link is clicked', () => {
    render(<Sidenav handleToggle={mockHandleToggle} showSideNav={true} />);

    const links = ['Home', 'Gigs', 'Bio', 'Listen', 'Watch', 'Contact'];

    links.forEach(linkText => {
      const link = screen.getByText(linkText);
      fireEvent.click(link);
    });

    expect(mockHandleToggle).toHaveBeenCalledTimes(6);
  });

  it('renders without crashing', () => {
    expect(() =>
      render(<Sidenav handleToggle={mockHandleToggle} showSideNav={true} />)
    ).not.toThrow();
  });
});
