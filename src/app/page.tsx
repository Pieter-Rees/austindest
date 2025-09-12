import Header from "@/components/layout/header";
import { Section } from "@/components/layout/section";
import Landing from "@/components/features/landing";
import LandingBg from "@/components/features/landingBg";
import Watch from "@/components/features/watch";
import Gigs from "@/components/features/gigs";
import Bio from "@/components/features/bio";
import Listen from "@/components/features/listen";
import Contact from "@/components/features/contact";
import Copyright from "@/components/layout/copyright";

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
