import Header from "./components/header";
import { Section } from "./components/section";
import Landing from "./components/landing";
import LandingBg from "./components/landingBg";
import Watch from "./components/watch";
import Gigs from "./components/gigs";
import Bio from "./components/bio";
import Listen from "./components/listen";
import Contact from "./components/contact";

export default function Home() {
  return (
    <>
      <LandingBg />

      <Section fullVh={true}>
        <Landing />
      </Section>
      <Section>
        <Gigs />
      </Section>

      <Section>
        <Bio />
      </Section>

      <Section>
        <Listen />
      </Section>

      <Section>
        <Watch />
      </Section>

      <Section fullVh={true}>
        <Contact />
      </Section>
      <Header />
    </>
  );
}
