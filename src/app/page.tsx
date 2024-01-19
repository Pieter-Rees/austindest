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

      <Section id="landing" fullVh={true}>
        <Landing />
      </Section>

      <Section id="gigs" bg={true}>
        <Gigs />
      </Section>

      <Section id="bio">
        <Bio />
      </Section>

      <Section id="listen" bg={true}>
        <Listen />
      </Section>

      <Section id="watch">
        <Watch />
      </Section>

      <Section bg={true} fullVh={true} id="contact">
        <Contact />
      </Section>
      <Copyright />

      <Header />
    </>
  );
}
