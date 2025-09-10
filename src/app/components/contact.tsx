import { Title } from '../components/title';
export default function Contact() {
  return (
    <div>
      <div className="my-6 lg:mb-8 lg:mt-0">
        <Title subTitle="Contact & Bookings" center={true} />
      </div>

      <div className="text-center">
        <div>
          <a
            className="text-lg lg:text-lg 2xl:text-2xl text-white md:hover:text-bubblegum"
            rel="noreferrer noopener"
            href="mailto:contact@austindest.com"
          >
            contact@austindest.com
          </a>
        </div>
        <div>
          <a
            className="text-lg lg:text-lg 2xl:text-2xl text-white md:hover:text-bubblegum"
            target="_blank"
            rel="noreferrer noopener"
            href="https://www.instagram.com/austindestmusic/"
          >
            @austindestmusic
          </a>
        </div>
      </div>
    </div>
  );
}
