import Socials from "./socials";
import { Title } from "./ui/Title";

export default function Landing() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center text-center space-y-8">
      <Title
        margin={true}
        center={true}
        title="Austin"
        subtitle="All About The Groove"
        size="xl"
      />
      <div className="flex justify-center mt-8">
        <Socials />
      </div>
    </div>
  );
}
