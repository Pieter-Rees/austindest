import { render, screen } from '@testing-library/react';
import { Title } from '@/components/ui/title';

describe('Title', () => {
    it('renders title only', () => {
        render(<Title title="Test Title" />);

        expect(screen.getAllByText('Test Title')).toHaveLength(2);
    });

    it('renders subTitle only', () => {
        render(<Title subTitle="Test Subtitle" />);

        expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
    });

    it('renders both title and subTitle', () => {
        render(
            <Title
                title="Test Title"
                subTitle="Test Subtitle"
            />
        );

        expect(screen.getAllByText('Test Title')).toHaveLength(2);
        expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
    });

    it('renders smallTitle', () => {
        render(<Title smallTitle="Small Title" />);

        expect(screen.getByText('Small Title')).toBeInTheDocument();
    });

    it('applies center alignment when center prop is true', () => {
        render(
            <Title
                title="Test Title"
                center={true}
            />
        );

        const titles = screen.getAllByText('Test Title');
        expect(titles[0]).toHaveClass('text-7xl', 'sm:text-8xl', 'lg:text-9xl', 'text-shine', 'text-neon-title');
    });

    it('applies left alignment when left prop is true', () => {
        render(
            <Title
                subTitle="Test Subtitle"
                left={true}
            />
        );

        const subtitle = screen.getByText('Test Subtitle');
        expect(subtitle).toHaveClass('text-center', 'lg:text-left');
    });

    it('applies right alignment when right prop is true', () => {
        render(
            <Title
                subTitle="Test Subtitle"
                right={true}
            />
        );

        const subtitle = screen.getByText('Test Subtitle');
        expect(subtitle).toHaveClass('text-center', 'lg:text-right');
    });

    it('applies margin when margin prop is true', () => {
        render(
            <Title
                subTitle="Test Subtitle"
                margin={true}
            />
        );

        const subtitle = screen.getByText('Test Subtitle');
        expect(subtitle).toHaveClass('mt-8');
    });

    it('applies centerText when centerText prop is true', () => {
        render(
            <Title
                subTitle="Test Subtitle"
                centerText={true}
            />
        );

        const subtitle = screen.getByText('Test Subtitle');
        expect(subtitle).toHaveClass('text-4xl', 'sm:text-5xl', 'lg:text-6xl', 'text-white', 'text-neon');
    });

    it('has proper title styling', () => {
        render(<Title title="Test Title" />);

        const titles = screen.getAllByText('Test Title');
        expect(titles[0]).toHaveClass('text-7xl', 'sm:text-8xl', 'lg:text-9xl', 'text-shine', 'text-neon-title');
    });

    it('has proper subtitle styling', () => {
        render(<Title subTitle="Test Subtitle" />);

        const subtitle = screen.getByText('Test Subtitle');
        expect(subtitle).toHaveClass('text-4xl', 'sm:text-5xl', 'lg:text-6xl', 'text-white', 'text-neon');
    });

    it('has proper small title styling', () => {
        render(<Title smallTitle="Small Title" />);

        const smallTitle = screen.getByText('Small Title');
        expect(smallTitle).toHaveClass('text-lg', 'lg:text-3xl', 'text-white');
    });

    it('renders without crashing when no props provided', () => {
        render(<Title />);
        const containers = screen.getAllByRole('generic');
        expect(containers[0]).toBeInTheDocument();
    });
});
