import { Suspense } from "react";

import { Bio, Gigs } from "@/components";
import { PerformanceMonitor } from "@/components/analytics/PerformanceMonitor";
import Contact from "@/components/contact";
import Copyright from "@/components/copyright";
import Header from "@/components/header";
import Landing from "@/components/landing";
import LandingBg from "@/components/landingBg";
import Listen from "@/components/listen";
import { PWARegistration } from "@/components/pwa/PWARegistration";
import { Section } from "@/components/section";
import { StructuredData } from "@/components/seo/StructuredData";
import { PageLoading, SectionLoading } from "@/components/ui/Loading";
import Watch from "@/components/watch";

export default function Home() {
  return (
    <>
      <StructuredData />
      <PWARegistration />
      <PerformanceMonitor />

      <Suspense fallback={<PageLoading />}>
        <LandingBg />
      </Suspense>

      <Header />

      <Section id="landing" fullVh>
        <Suspense fallback={<SectionLoading height="full" />}>
          <Landing />
        </Suspense>
      </Section>

      <Section id="gigs" bg>
        <Suspense fallback={<SectionLoading height="md" />}>
          <Gigs />
        </Suspense>
      </Section>

      <Section id="bio">
        <Suspense fallback={<SectionLoading height="md" />}>
          <Bio />
        </Suspense>
      </Section>

      <Section id="listen" bg>
        <Suspense fallback={<SectionLoading height="md" />}>
          <Listen />
        </Suspense>
      </Section>

      <Section id="watch">
        <Suspense fallback={<SectionLoading height="md" />}>
          <Watch />
        </Suspense>
      </Section>

      <Section bg fullVh id="contact">
        <Suspense fallback={<SectionLoading height="full" />}>
          <Contact />
        </Suspense>
      </Section>

      <Copyright />
    </>
  );
}
