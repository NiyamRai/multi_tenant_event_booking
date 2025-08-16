// const navOptions = [
//   {
//     name: "About",
//     link: "/#about",
//   },
//   {
//     name: "Services",
//     link: "/#services",
//   },
//   {
//     name: "Images",
//     link: "/#images",
//   },
// ];

export default function Footer() {
  return (
    <footer className="w-full relative overflow-hidden   dark:bg-brand-primary-900 ">
      {/* mobile */}
      <div className=" flex w-full items-center justify-between px-8">
        <div className="text-xs flex gap-4">
          {/* {navOptions?.map((option, i) => (
            <Link
              key={option.name}
              href={option.link}
              className=" font-outfit font-medium">
              {option.name}
            </Link>
          ))}
           */}
          All Rights Reserved
        </div>
        <div></div>
      </div>
    </footer>
  );
}
