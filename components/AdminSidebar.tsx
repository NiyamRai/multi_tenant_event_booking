"use client";
import { AiFillHome } from "react-icons/ai";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const navItems = [
  { name: "Home", icon: <AiFillHome />, navLink: "/client" },
  { name: "About Us", icon: "", navLink: "/client/about-us" },
  { name: "Gallery", icon: "", navLink: "/client/gallery" },
  { name: "Management", icon: "", navLink: "/client/management" },
  { name: "News & Events", icon: "", navLink: "/client/news-n-events" },
  { name: "Contact us", icon: "", navLink: "/client/contact-us" },
];
export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden lg:flex flex-col w-64 h-screen bg-white text-gray-800 border-r border-gray-200  items-center py-6 fixed left-0 top-0 shadow-sm">
      {/* Logo */}
      <img
        src={"/images/logo.png"}
        alt="travel blog"
        width={150}
        className=" mb-10 drop-shadow"
      />

      {/* Nav Items */}
      <nav className="flex flex-col gap-2 w-full px-4">
        {navItems.map((item, index) => {
          const isActive = pathname === item.navLink;

          return (
            <Link
              key={item.name}
              href={item.navLink}
              className={`flex items-center gap-3 p-3 rounded-md transition text-sm font-medium ${
                isActive
                  ? "bg-blue-100 border-l-4 border-blue-500 text-blue-700"
                  : "hover:bg-gray-100 text-gray-600 "
              }`}>
              <div className="w-6 text-center">
                {item.icon ? (
                  <span>{item.icon}</span>
                ) : (
                  <span className="text-gray-400">{index + 1}</span>
                )}
              </div>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
