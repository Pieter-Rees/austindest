import { render, screen } from '@testing-library/react';
import Landing from '@/components/features/landing';

jest.mock('@/components/ui/title', () => ({
  Title: ({ margin, left, center, title, subTitle }: any) => (
    <div data-testid='title'>
      <h1>{title}</h1>
      <h2>{subTitle}</h2>
      <span data-testid='title-props'>
        margin:{margin ? 'true' : 'false'} left:{left ? 'true' : 'false'}{' '}
        center:{center ? 'true' : 'false'}
      </span>
    </div>
  ),
}));

jest.mock('@/components/features/socials', () => ({
  __esModule: true,
  default: () => <div data-testid='socials'>Socials</div>,
}));

describe('Landing', () => {
  it('renders title with correct props', () => {
    render(<Landing />);

    expect(screen.getByText('Austin')).toBeInTheDocument();
    expect(screen.getByText('All About The Groove')).toBeInTheDocument();
    expect(screen.getByTestId('title-props')).toHaveTextContent(
      'margin:true left:true center:true'
    );
  });

  it('renders socials component', () => {
    render(<Landing />);

    expect(screen.getByTestId('socials')).toBeInTheDocument();
  });

  it('has correct container structure and classes', () => {
    const { container } = render(<Landing />);

    const mainDiv = container.firstChild as HTMLElement;
    expect(mainDiv).toHaveClass(
      'w-full',
      'h-full',
      'my-6',
      'lg:my-0',
      'relative',
      'z-2'
    );

    const socialsContainer = screen.getByTestId('socials').parentElement;
    expect(socialsContainer).toHaveClass(
      'flex',
      'justify-center',
      'lg:justify-end',
      'mt-16'
    );
  });

  it('renders without crashing', () => {
    expect(() => render(<Landing />)).not.toThrow();
  });
});
