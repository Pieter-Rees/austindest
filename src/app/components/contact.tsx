import { Title } from "../components/title";
export default function Contact() {
  return (
    <>
      <div id="contact">
        <div className="my-6 lg:mb-8 lg:mt-0">
          <Title subTitle="Contact & Bookings" center={true} />
        </div>

        <div className="text-center">
          <div className="uppercase">
            <a
              className="text-lg lg:text-lg 2xl:text-2xl md:hover:text-bubblegum"
              rel="noreferrer noopener"
              href="mailto:contact@austindest.com"
            >
              contact@austindest.com
            </a>
          </div>
          <div className="uppercase">
            <a
              className="text-lg lg:text-lg 2xl:text-2xl md:hover:text-bubblegum"
              target="_blank"
              rel="noreferrer noopener"
              href="https://www.instagram.com/austindestmusic/"
            >
              @austindestmusic
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
