import { render, screen } from '@testing-library/react';
import Socials from '@/components/features/socials';

jest.mock('@/lib/constants', () => ({
    SOCIAL_LINKS: {
        soundcloud: 'https://soundcloud.com/austin_dest',
        instagram: 'https://www.instagram.com/austindestmusic/',
        facebook: 'https://www.facebook.com/austindest_music',
        spotify: 'https://open.spotify.com/artist/test',
        email: 'contact@austindest.com',
        instagramHandle: '@austindestmusic'
    }
}));

describe('Socials', () => {
    it('renders all social media links', () => {
        render(<Socials />);

        expect(screen.getByLabelText('SoundCloud Profile')).toBeInTheDocument();
        expect(screen.getByLabelText('Instagram Profile')).toBeInTheDocument();
        expect(screen.getByLabelText('Facebook Profile')).toBeInTheDocument();
        expect(screen.getByLabelText('Spotify Profile')).toBeInTheDocument();
    });

    it('renders email link', () => {
        render(<Socials />);

        const emailLink = screen.getByLabelText('Email Contact');
        expect(emailLink).toHaveAttribute('href', 'mailto:contact@austindest.com');
        expect(emailLink).toHaveTextContent('contact@austindest.com');
    });

    it('renders Instagram handle link', () => {
        render(<Socials />);

        const instagramHandle = screen.getByLabelText('Instagram Handle');
        expect(instagramHandle).toHaveAttribute('href', 'https://www.instagram.com/austindestmusic/');
        expect(instagramHandle).toHaveTextContent('@austindestmusic');
    });

    it('renders horizontal rule separator', () => {
        render(<Socials />);

        expect(screen.getByRole('separator')).toBeInTheDocument();
    });

    it('has proper container structure', () => {
        render(<Socials />);

        expect(screen.getByLabelText('SoundCloud Profile')).toBeInTheDocument();
    });

    it('has proper social links container', () => {
        render(<Socials />);

        const socialLinksContainer = screen.getByLabelText('SoundCloud Profile').closest('div');
        expect(socialLinksContainer).toHaveClass('flex', 'justify-center', 'gap-4');
    });

    it('has proper contact info container', () => {
        render(<Socials />);

        const contactContainer = screen.getByLabelText('Email Contact').closest('div');
        expect(contactContainer).toHaveClass('flex', 'items-center', 'flex-col', 'justify-center');
    });
});
