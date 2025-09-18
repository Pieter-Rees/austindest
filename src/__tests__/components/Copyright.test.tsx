import { render, screen, fireEvent } from '@testing-library/react';
import Copyright from '@/components/layout/Copyright';

jest.mock('react-scroll', () => ({
  animateScroll: {
    scrollToTop: jest.fn(),
  },
}));

jest.mock('@/components/ui/Logo', () => ({
  __esModule: true,
  default: () => <div data-testid='logo'>Logo</div>,
}));

jest.mock('@/components/features/Socials', () => ({
  __esModule: true,
  default: () => <div data-testid='socials'>Socials</div>,
}));

describe('Copyright', () => {
  it('renders socials component', () => {
    render(<Copyright />);

    expect(screen.getByTestId('socials')).toBeInTheDocument();
  });

  it('renders logo with click handler', () => {
    render(<Copyright />);

    const logo = screen.getByTestId('logo');
    expect(logo).toBeInTheDocument();
    const logoContainer = logo.closest('div')?.parentElement;
    expect(logoContainer).toHaveClass(
      'cursor-pointer',
      'transition-all',
      'fill-white',
      'hover:fill-bubblegum',
      'ease-in-out'
    );
  });

  it('renders current year in copyright text', () => {
    render(<Copyright />);

    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`Copyright © ${currentYear}`)).toBeInTheDocument();
  });

  it('renders artist name', () => {
    render(<Copyright />);

    expect(screen.getByText('Austin Dest')).toBeInTheDocument();
  });

  it('renders horizontal rule on mobile', () => {
    render(<Copyright />);

    const hr = screen.getByRole('separator');
    expect(hr).toBeInTheDocument();
    expect(hr.closest('div')).toHaveClass('block', 'lg:hidden');
  });

  it('has correct container structure and classes', () => {
    const { container } = render(<Copyright />);

    const mainDiv = container.firstChild as HTMLElement;
    expect(mainDiv).toHaveClass(
      'relative',
      'z-3',
      'grid',
      'lg:grid-cols-2',
      'gap-4',
      'p-8',
      'bg-black/90',
      'backdrop-blur-md'
    );
  });

  it('has correct copyright section classes', () => {
    render(<Copyright />);

    const copyrightSection = screen
      .getByText('Austin Dest')
      .closest('div')?.parentElement;
    expect(copyrightSection).toHaveClass(
      'flex-col',
      'justify-center',
      'flex',
      'items-center'
    );
  });

  it('calls scrollToTop when logo is clicked', async () => {
    const { animateScroll } = await import('react-scroll');
    render(<Copyright />);

    const logo = screen.getByTestId('logo');
    const logoContainer = logo.closest('div')?.parentElement;

    if (logoContainer) {
      fireEvent.click(logoContainer);
    }

    expect(animateScroll.scrollToTop).toHaveBeenCalled();
  });

  it('renders without crashing', () => {
    expect(() => render(<Copyright />)).not.toThrow();
  });
});
