import Image from "next/image";

const HomePage = () => {
  return (
    <div className="flex px-3 flex-col md:flex-row items-center justify-between py-8 md:px-10 bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-800">
      <div className="pb-8 md:pb-0">
        <p className="text-white md:text-5xl text-3xl md:pb-5 pb-3 text-center md:text-start">
          Welcome to Hunting Coder
        </p>
        <p className="text-zinc-400 text-xl px-2 font-medium text-center md:text-start">
          " Unleash Your Coding Potential, Join the Hunt! "
        </p>
      </div>
      <Image
        src={"/developer.png"}
        alt="Developer Image"
        width={500}
        height={500}
        className="object-contain"
      />
    </div>
  );
};
export default HomePage;
