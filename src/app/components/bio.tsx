import { Title } from "./title";
import Image from "next/image";
import "./border.css";

export default function Bio() {
  return (
    <div>
      <Title subTitle="Bio" right={true} />
      <div className="flex">
        <div className="flex flex-wrap align-center w-6/12 ">
          <div className="flex">
            <div className="w-4/12 m-4">
              <Image
                src="/images/a1.jpg"
                width={200}
                height={300}
                className="object-cover w-full h-full rounded-3xl fancy-border"
                alt="Picture of the author"
              />
            </div>
            <div className="w-4/12 m-4">
              <Image
                src="/images/a2.jpg"
                width={200}
                height={200}
                className="object-cover w-full h-full rounded-3xl fancy-border"
                alt="Picture of the author"
              />
            </div>
            <div className="w-4/12 m-4">
              <Image
                src="/images/a3.jpg"
                width={200}
                height={200}
                className="object-cover w-full h-full rounded-3xl fancy-border"
                alt="Picture of the author"
              />
            </div>
          </div>
          <div className="w-full m-4 max-h-64">
            <Image
              src="/images/a4.jpg"
              width={1000}
              height={200}
              className="object-cover w-full h-full rounded-3xl fancy-border"
              alt="Picture of the author"
            />
          </div>
        </div>
        <div className="w-6/12 flex flex-col justify-center">
          <p className="mb-3 text-gray-500 dark:text-gray-400 first-letter:text-7xl first-letter:font-bold first-letter:text-gray-900 dark:first-letter:text-gray-100 first-letter:mr-3 first-letter:mt-2 first-letter:float-left">
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
          <p className="text-gray-500 dark:text-gray-400">
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
