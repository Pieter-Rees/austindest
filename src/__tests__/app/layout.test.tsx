import { render } from '@testing-library/react';
import RootLayout, { metadata, viewport } from '@/app/layout';

jest.mock('next/font/google', () => ({
    Inter: () => ({
        className: 'inter-font-class',
    }),
}));

jest.mock('@/lib', () => ({
    SITE_CONFIG: {
        name: 'Test Site',
        description: 'Test Description',
        keywords: ['test', 'keywords'],
        creator: 'Test Creator',
        url: 'https://test.com',
        ogImage: 'https://test.com/og-image.jpg',
        themeColor: '#000000',
    },
}));

describe('RootLayout', () => {
    it('renders children correctly', () => {
        const { container } = render(
            <RootLayout>
                <div data-testid="child">Test Child</div>
            </RootLayout>
        );

        expect(container.querySelector('[data-testid="child"]')).toBeInTheDocument();
        expect(container.querySelector('[data-testid="child"]')).toHaveTextContent('Test Child');
    });

    it('applies correct HTML structure', () => {
        const { container } = render(
            <RootLayout>
                <div>Test</div>
            </RootLayout>
        );

        expect(container.firstChild).toBeInTheDocument();
    });

    it('renders without crashing', () => {
        expect(() => render(
            <RootLayout>
                <div>Test</div>
            </RootLayout>
        )).not.toThrow();
    });

    it('exports metadata correctly', () => {
        expect(metadata).toBeDefined();
        expect(metadata.title).toBe('Test Site');
        expect(metadata.description).toBe('Test Description');
        expect(metadata.creator).toBe('Test Creator');
        expect(metadata.openGraph).toBeDefined();
        expect(metadata.twitter).toBeDefined();
    });

    it('exports viewport correctly', () => {
        expect(viewport).toBeDefined();
        expect(viewport.themeColor).toBe('#000000');
    });
});
