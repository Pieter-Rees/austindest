import { render, screen } from '@testing-library/react';
import Contact from '@/components/features/Contact';

interface SectionHeaderProps {
  subTitle?: string;
  right?: boolean;
  center?: boolean;
}

interface SocialLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

jest.mock('@/components/ui/SectionHeader', () => ({
  SectionHeader: ({ subTitle, right, center }: SectionHeaderProps) => (
    <div data-testid='section-header'>
      <h2>{subTitle}</h2>
      <span data-testid='props'>
        right:{right ? 'true' : 'false'} center:{center ? 'true' : 'false'}
      </span>
    </div>
  ),
}));

jest.mock('@/components/ui/SocialLink', () => ({
  SocialLink: ({ href, children, className, ariaLabel }: SocialLinkProps) => (
    <a
      href={href}
      className={className}
      aria-label={ariaLabel}
      data-testid='social-link'
    >
      {children}
    </a>
  ),
}));

jest.mock('@/lib/constants', () => ({
  SOCIAL_LINKS: {
    email: 'contact@austindest.com',
    instagram: 'https://www.instagram.com/austindestmusic/',
    instagramHandle: '@austindestmusic',
  },
}));

describe('Contact', () => {
  it('renders section header with correct props', () => {
    render(<Contact />);

    expect(screen.getByText('Contact & Bookings')).toBeInTheDocument();
    expect(screen.getByTestId('props')).toHaveTextContent(
      'right:false center:true'
    );
  });

  it('renders email link', () => {
    render(<Contact />);

    const emailLink = screen.getByLabelText('Email Contact');
    expect(emailLink).toHaveAttribute('href', 'mailto:contact@austindest.com');
    expect(emailLink).toHaveTextContent('contact@austindest.com');
  });

  it('renders Instagram handle link', () => {
    render(<Contact />);

    const instagramLink = screen.getByLabelText('Instagram Handle');
    expect(instagramLink).toHaveAttribute(
      'href',
      'https://www.instagram.com/austindestmusic/'
    );
    expect(instagramLink).toHaveTextContent('@austindestmusic');
  });

  it('has proper container structure', () => {
    render(<Contact />);

    expect(screen.getByTestId('section-header')).toBeInTheDocument();
  });

  it('has proper social links container', () => {
    render(<Contact />);

    expect(screen.getByLabelText('Email Contact')).toBeInTheDocument();
  });

  it('renders without crashing', () => {
    render(<Contact />);
    expect(screen.getByTestId('section-header')).toBeInTheDocument();
  });
});
