import { Title } from "./title";
import Socials from "./socials";

export default function Landing() {
  return (
    <div id="landing" className="w-full h-full my-6 lg:my-0 relative z-2">
      <Title
        margin={true}
        left={true}
        center={true}
        title="Austin"
        subTitle="All About The Groove"
      />
      <div className="flex justify-center lg:justify-end mt-16">
        <Socials />
      </div>
    </div>
  );
}
