import { Title } from "./title";
import Image from "next/image";

export default function Bio() {
  return (
    <div>
      <Title subTitle="Bio" right={true} />
      <div className="flex">
        <div className="flex flex-wrap w-6/12 ">
          <Image
            src="/profile.png"
            width={200}
            height={200}
            alt="Picture of the author"
          />
          <Image
            src="/profile.png"
            width={200}
            height={200}
            alt="Picture of the author"
          />
          <Image
            src="/profile.png"
            width={200}
            height={200}
            alt="Picture of the author"
          />
          <Image
            src="/profile.png"
            width={400}
            height={100}
            alt="Picture of the author"
          />
        </div>
        <div className="w-6/12">
          <p>
            For DJ and producer Austin Dest, her love for music has been a huge
            drive and source of inspiration throughout her life. She got
            introducted to House and Deep House around 2012, and from there her
            love for electronic music started growing and developing. A few
            years later she got inspired to get behind the decks herself. Her
            first love was Deep and Tech House with groovy basslines and old
            soul and funk samples. You can hear that this has greatly inspired
            her unique sound, which has developed over time into a mix of Deep
            House, House, Deep Tech and Progressive. During her energetic sets
            you will be carried away on a journey, and surprised by her musical
            choices.
          </p>
          <p>
            With the producer/DJ duo Austin Martin, founded in 2016, Austin
            released records on Cinematique Records and Particles/Proton. She
            released her first solo record in 2022 on Jaydee's label First
            Impression, with more to follow. She has played ADE for the first
            time in 2022, and is a well-known guest at ISLA Radio, Amsterdam's
            Most Wanted, and played in clubs such as Noorderlicht Amsterdam,
            ClubNL and Recycle Lounge Gallery club.
          </p>
        </div>
      </div>
    </div>
  );
}
