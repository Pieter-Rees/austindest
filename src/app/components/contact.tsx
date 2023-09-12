import { Title } from "../components/title";

export default function Contact() {
  return (
    <div>
      <div className="mb-4 lg:mb-8">
        <Title subTitle="Contact & Bookings" center={true} />
      </div>

      <div className="text-center">
        <div>
          <Title smallTitle="email" />
        </div>
        <div>
          <Title smallTitle="contact@austindest.com" />
        </div>
        <div>
          <Title smallTitle="instagram" />
        </div>
        <div>
          <Title smallTitle="@austindestmusic" />
        </div>
      </div>
    </div>
  );
}
