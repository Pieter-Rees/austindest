import { render, screen } from '@testing-library/react';
import Landing from '@/components/features/Landing';

interface TitleProps {
  title?: string;
  subTitle?: string;
  margin?: boolean;
  left?: boolean;
  center?: boolean;
}

jest.mock('@/components/ui/Title', () => ({
  Title: ({ title, subTitle, margin, left, center }: TitleProps) => (
    <div data-testid='title'>
      {title && <h1>{title}</h1>}
      {subTitle && <h2>{subTitle}</h2>}
      <span data-testid='props'>
        margin:{margin ? 'true' : 'false'} left:{left ? 'true' : 'false'}{' '}
        center:{center ? 'true' : 'false'}
      </span>
    </div>
  ),
}));

jest.mock('@/components/features/Socials', () => {
  return function MockSocials() {
    return <div data-testid='socials'>Socials</div>;
  };
});

describe('Landing', () => {
  it('renders title with correct props', () => {
    render(<Landing />);

    expect(screen.getByText('Austin')).toBeInTheDocument();
    expect(screen.getByText('All About The Groove')).toBeInTheDocument();
    expect(screen.getByTestId('props')).toHaveTextContent(
      'margin:true left:true center:true'
    );
  });

  it('renders socials component', () => {
    render(<Landing />);

    expect(screen.getByTestId('socials')).toBeInTheDocument();
  });

  it('has proper container structure', () => {
    render(<Landing />);

    const container = screen.getByTestId('title').closest('div')?.parentElement;
    expect(container).toHaveClass(
      'w-full',
      'h-full',
      'my-6',
      'lg:my-0',
      'relative',
      'z-2'
    );
  });

  it('has proper socials container', () => {
    render(<Landing />);

    const socialsContainer = screen
      .getByTestId('socials')
      .closest('div')?.parentElement;
    expect(socialsContainer).toHaveClass(
      'flex',
      'justify-center',
      'lg:justify-end',
      'mt-16'
    );
  });

  it('renders without crashing', () => {
    render(<Landing />);
    expect(screen.getByTestId('title')).toBeInTheDocument();
  });
});
