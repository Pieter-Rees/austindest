import { render, screen } from '@testing-library/react';
import { Section } from '@/components/layout/section';

describe('Section', () => {
    it('renders children correctly', () => {
        render(
            <Section>
                <div data-testid="test-content">Test Content</div>
            </Section>
        );

        expect(screen.getByTestId('test-content')).toBeInTheDocument();
    });

    it('renders with default props', () => {
        render(
            <Section>
                <div>Test Content</div>
            </Section>
        );

        const section = screen.getByText('Test Content').closest('section');
        expect(section).toHaveClass('w-full', 'flex', 'justify-center', 'items-center', 'relative', 'z-2');
    });

    it('renders with custom id', () => {
        render(
            <Section id="test-section">
                <div>Test Content</div>
            </Section>
        );

        const section = screen.getByText('Test Content').closest('section');
        expect(section).toHaveAttribute('id', 'test-section');
    });

    it('applies background when bg prop is true', () => {
        render(
            <Section bg={true}>
                <div>Test Content</div>
            </Section>
        );

        const section = screen.getByText('Test Content').closest('section');
        expect(section).toHaveClass('bg-gradient-to-b', 'from-bubblegum/20', 'to-blue/20', 'backdrop-blur-md');
    });

    it('applies full viewport height when fullVh prop is true', () => {
        render(
            <Section fullVh={true}>
                <div>Test Content</div>
            </Section>
        );

        const section = screen.getByText('Test Content').closest('section');
        expect(section).toHaveClass('h-screen');
    });

    it('applies custom className', () => {
        render(
            <Section className="custom-class">
                <div>Test Content</div>
            </Section>
        );

        const section = screen.getByText('Test Content').closest('section');
        expect(section).toHaveClass('w-full', 'flex', 'justify-center', 'items-center', 'relative', 'z-2');
    });

    it('combines multiple props correctly', () => {
        render(
            <Section id="test" bg={true} fullVh={true} className="custom">
                <div>Test Content</div>
            </Section>
        );

        const section = screen.getByText('Test Content').closest('section');
        expect(section).toHaveAttribute('id', 'test');
        expect(section).toHaveClass('bg-gradient-to-b', 'from-bubblegum/20', 'to-blue/20', 'backdrop-blur-md', 'h-screen');
    });

    it('renders without children', () => {
        render(<Section />);
        const containers = screen.getAllByRole('generic');
        expect(containers[0]).toBeInTheDocument();
    });
});
