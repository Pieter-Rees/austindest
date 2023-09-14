import { Title } from "../components/title";
export default function Contact() {
  return (
    <>
      <div id="contact">
        <div className="mb-4 lg:mb-8">
          <Title subTitle="Contact & Bookings" center={true} />
        </div>

        <div className="text-center">
          <div>
            <Title smallTitle="email" />
          </div>
          <div className="uppercase">
            <a
              className="text-lg lg:text-lg 2xl:text-xl"
              rel="noreferrer noopener"
              href="mailto:contact@austindest.com"
            >
              contact@austindest.com
            </a>
          </div>
          <hr />
          <div>
            <Title smallTitle="instagram" />
          </div>
          <div className="uppercase">
            <a
              className="text-lg lg:text-lg 2xl:text-xl"
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
