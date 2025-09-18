import Bio from '@/components/features/Bio';
import Contact from '@/components/features/Contact';
import Gigs from '@/components/features/Gigs';
import Landing from '@/components/features/Landing';
import LandingBg from '@/components/features/LandingBg';
import Listen from '@/components/features/Listen';
import Watch from '@/components/features/Watch';
import Copyright from '@/components/layout/Copyright';
import Header from '@/components/layout/Header';
import { Section } from '@/components/layout/Section';

export default function Home() {
  return (
    <>
      <LandingBg />

      <Section id='landing' fullVh={true}>
        <Landing />
      </Section>

      <Section id='gigs' bg={true}>
        <Gigs />
      </Section>

      <Section id='bio'>
        <Bio />
      </Section>

      <Section id='listen' bg={true}>
        <Listen />
      </Section>

      <Section id='watch'>
        <Watch />
      </Section>

      <Section bg={true} fullVh={true} id='contact'>
        <Contact />
      </Section>
      <Copyright />

      <Header />
    </>
  );
}
