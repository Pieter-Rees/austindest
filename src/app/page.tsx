import Header from "./components/header";
import { Section } from "./components/section";
import Landing from "./components/landing";
import LandingBg from "./components/landingBg";
import Watch from "./components/watch";
import Gigs from "./components/gigs";
import Bio from "./components/bio";
import Listen from "./components/listen";
import Contact from "./components/contact";
import Copyright from "./components/copyright";

export default function Home() {
  return (
    <>
      <LandingBg />

      <Section fullVh={true}>
        <Landing />
      </Section>
      <Section bg={true}>
        <Gigs />
      </Section>

      <Section bg={false}>
        <Bio />
      </Section>

      <Section bg={true}>
        <Listen />
      </Section>

      <Section>
        <Watch />
      </Section>

      <Section bg={true} fullVh={true}>
        <Contact />
      </Section>
      <Copyright />

      <Header />
    </>
  );
}
