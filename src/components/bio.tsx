import Image from "next/image";

import { Title } from "./ui/Title";

export default function Bio() {
  return (
    <div className="space-y-8">
      <div className="my-6 lg:mb-8 lg:mt-0">
        <Title subtitle="Bio" align="left" size="lg" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div className="flex flex-wrap flex-col justify-center space-y-4">
          <div className="grid grid-cols-3 gap-4 lg:gap-6">
            <Image
              src="/images/a1.webp"
              width={200}
              height={300}
              className="object-cover w-full h-full rounded-lg border border-border"
              alt="Picture of the author"
            />
            <Image
              src="/images/a2.webp"
              width={200}
              height={200}
              className="object-cover w-full h-full rounded-lg border border-border"
              alt="Picture of the author"
            />
            <Image
              src="/images/a3.webp"
              width={200}
              height={200}
              className="object-cover w-full h-full rounded-lg border border-border"
              alt="Picture of the author"
            />
          </div>
          <div className="w-full max-h-64">
            <Image
              src="/images/a4.webp"
              width={1000}
              height={200}
              className="object-cover w-full h-full rounded-lg border border-border"
              alt="Picture of the author"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center text-base lg:text-lg space-y-6">
          <p className="text-foreground leading-relaxed first-letter:text-6xl first-letter:font-light first-letter:mr-2 first-letter:mt-1 first-letter:float-left first-letter:text-muted">
            For DJ and producer Austin Dest, her love for music has been a huge
            drive and source of inspiration throughout her life. She got
            introduced to House and Deep House around 2012, and from there her
            love for electronic music started growing and developing. A few
            years later she got inspired to get behind the decks herself. Her
            first love was Deep and Tech House with groovy basslines and old
            soul and funk samples. You can hear that this has greatly inspired
            her unique sound, which has developed over time into a mix of Deep
            House, House, Deep Tech and Progressive. During her energetic sets
            you will be carried away on a journey, and surprised by her musical
            choices.
          </p>
          <hr className="border-border" />
          <p className="text-foreground leading-relaxed">
            With the producer/DJ duo Austin Martin, founded in 2016, Austin
            released records on Cinematique Records and Particles/Proton. Her
            First solo record was released on Robin &apos;Jaydee&apos; Albers
            label First Impression in 2022, from whom she continues to receive
            support. She has played ADE for the first time in 2022, and is a
            well-known guest at ISLA Radio, Amsterdam&apos;s Most Wanted, Jaguar
            House, Henk & Ingrid Events. She has played all around the country
            and beyond, in clubs as Noorderlicht, ClubNL and Recycle Lounge
            Gallery Club (Amsterdam), Gebr. Nobel (Leiden), and Charlatan (Gent,
            BE).
          </p>
        </div>
      </div>
    </div>
  );
}
