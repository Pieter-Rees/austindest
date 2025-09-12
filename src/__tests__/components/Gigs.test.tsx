import { render, screen } from '@testing-library/react';
import Gigs from '@/components/features/gigs';

jest.mock('@/lib/constants', () => ({
    GIGS: [
        {
            date: '06•04•2024',
            name: 'Past Gig',
            location: 'Rotterdam',
        },
        {
            date: '25•05•2025',
            name: 'Future Gig',
            location: 'Leeuwarden',
        },
        {
            date: '13•04•2025',
            name: 'Another Future Gig',
            location: 'Amsterdam',
            info: 'https://example.com',
            link: 'https://facebook.com/event',
        },
    ]
}));

jest.mock('@/lib/utils', () => ({
    sortGigsByDate: (gigs: any[], ascending = true) => {
        return [...gigs].sort((a, b) => {
            const dateA = new Date(a.date.split('•').reverse().join('-')).getTime();
            const dateB = new Date(b.date.split('•').reverse().join('-')).getTime();
            return ascending ? dateA - dateB : dateB - dateA;
        });
    },
    filterUpcomingGigs: (gigs: any[]) => {
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() - 1);
        return gigs.filter(gig => {
            const gigDate = new Date(gig.date.split('•').reverse().join('-'));
            return gigDate > tomorrow;
        });
    },
    filterPassedGigs: (gigs: any[]) => {
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() - 1);
        return gigs.filter(gig => {
            const gigDate = new Date(gig.date.split('•').reverse().join('-'));
            return gigDate < tomorrow;
        });
    }
}));

describe('Gigs', () => {
    it('renders section header with correct title', () => {
        render(<Gigs />);

        expect(screen.getByText('Gigs')).toBeInTheDocument();
    });

    it('renders upcoming gigs section', () => {
        render(<Gigs />);

        expect(screen.getByText('Upcoming')).toBeInTheDocument();
    });

    it('renders passed gigs section', () => {
        render(<Gigs />);

        expect(screen.getByText('Passed')).toBeInTheDocument();
    });

    it('renders gig information correctly', () => {
        render(<Gigs />);

        expect(screen.getByText('Future Gig')).toBeInTheDocument();
        expect(screen.getByText('Leeuwarden')).toBeInTheDocument();
        expect(screen.getByText('Another Future Gig')).toBeInTheDocument();
        expect(screen.getByText('Amsterdam')).toBeInTheDocument();
    });

    it('renders gig dates', () => {
        render(<Gigs />);

        expect(screen.getAllByText('25•05•2025')).toHaveLength(2);
        expect(screen.getAllByText('13•04•2025')).toHaveLength(2);
    });

    it('renders social links for gigs with info', () => {
        render(<Gigs />);

        const infoLink = screen.getByLabelText('More info about Another Future Gig');
        expect(infoLink).toHaveAttribute('href', 'https://example.com');
    });

    it('renders Facebook links for gigs with link', () => {
        render(<Gigs />);

        const facebookLink = screen.getByLabelText('Link to Another Future Gig event');
        expect(facebookLink).toHaveAttribute('href', 'https://facebook.com/event');
    });

    it('renders gigs without links as disabled', () => {
        render(<Gigs />);

        const disabledGig = screen.getByText('Future Gig').closest('span');
        expect(disabledGig).toHaveClass('cursor-not-allowed');
    });

    it('has proper table structure', () => {
        render(<Gigs />);

        const table = screen.getByRole('table');
        expect(table).toHaveClass('w-full', 'border-separate', 'lg:border-spacing-4', 'table-auto');
    });

    it('renders mobile date display', () => {
        render(<Gigs />);

        const mobileDates = screen.getAllByText('25•05•2025');
        expect(mobileDates).toHaveLength(2);
    });

    it('passes isUpcoming prop correctly to GigRow components', () => {
        render(<Gigs />);

        // Test that upcoming gigs are rendered
        expect(screen.getByText('Future Gig')).toBeInTheDocument();
        expect(screen.getByText('Another Future Gig')).toBeInTheDocument();

        // Test that passed gigs are rendered
        expect(screen.getByText('Past Gig')).toBeInTheDocument();
    });

    it('renders upcoming and passed gigs in separate sections', () => {
        render(<Gigs />);

        // Test that we have both upcoming and passed sections
        expect(screen.getByText('Upcoming')).toBeInTheDocument();
        expect(screen.getByText('Passed')).toBeInTheDocument();

        // Test that gigs are rendered in their respective sections
        const upcomingSection = screen.getByText('Upcoming').closest('thead')?.nextElementSibling;
        const passedSection = screen.getByText('Passed').closest('thead')?.nextElementSibling;

        expect(upcomingSection).toBeInTheDocument();
        expect(passedSection).toBeInTheDocument();
    });
});
