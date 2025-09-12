import { render, screen } from '@testing-library/react';
import { SocialLink } from '@/components/ui/SocialLink';

describe('SocialLink', () => {
  it('renders as a link with href', () => {
    render(
      <SocialLink href='https://example.com' ariaLabel='Test Link'>
        Test Content
      </SocialLink>
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('aria-label', 'Test Link');
    expect(link).toHaveTextContent('Test Content');
  });

  it('renders with default className', () => {
    render(
      <SocialLink href='https://example.com' ariaLabel='Test Link'>
        Test Content
      </SocialLink>
    );

    const link = screen.getByRole('link');
    expect(link).toHaveClass(
      'text-lg',
      'lg:text-lg',
      '2xl:text-2xl',
      'text-white',
      'md:hover:text-bubblegum'
    );
  });

  it('renders with custom className', () => {
    render(
      <SocialLink
        href='https://example.com'
        ariaLabel='Test Link'
        className='custom-class'
      >
        Test Content
      </SocialLink>
    );

    const link = screen.getByRole('link');
    expect(link).toHaveClass('custom-class');
  });

  it('opens in new tab by default', () => {
    render(
      <SocialLink href='https://example.com' ariaLabel='Test Link'>
        Test Content
      </SocialLink>
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noreferrer noopener');
  });

  it('renders children correctly', () => {
    render(
      <SocialLink href='https://example.com' ariaLabel='Test Link'>
        <span>Icon</span>
        <span>Text</span>
      </SocialLink>
    );

    expect(screen.getByText('Icon')).toBeInTheDocument();
    expect(screen.getByText('Text')).toBeInTheDocument();
  });
});
