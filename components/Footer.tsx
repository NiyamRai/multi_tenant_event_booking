import Image from "next/image";
import Link from "next/link";

const navOptions = [
  {
    name: "About",
    link: "/#about",
  },
  {
    name: "Services",
    link: "/#services",
  },
  {
    name: "Images",
    link: "/#images",
  },
];

export default function Footer() {
  return (
    <footer className="w-full relative overflow-hidden text-white bg-primary-max py-4 ">
      {/* mobile */}
      <div className=" flex w-full items-center justify-between px-8">
        <Image
          src="/images/logo.png"
          alt="logo"
          width={100}
          height={100}
          className=" h-10 drop-shadow-xl"
        />
        <div className="text-lg flex gap-4">
          {navOptions?.map((option, i) => (
            <Link
              key={option.name}
              href={option.link}
              className=" font-outfit font-medium">
              {option.name}
            </Link>
          ))}
        </div>
        <div></div>
      </div>
    </footer>
  );
}
