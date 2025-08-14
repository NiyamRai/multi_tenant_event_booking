import Image from "next/image";
import { AiOutlineMail } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";

export default function SocialMedia () {
    return(
            <div>
                <h4 className="text-lg font-bold">Follow Us On</h4>
                    <div className="flex gap-4 mt-3">
                    <Image
                        src="/images/footer_facebook.svg"
                        alt="facebook"
                        width={32}
                        height={32}
                        className=" max-md:w-6 aspect-square "
                    />
                    <Image
                        src="/images/footer-linkedin.svg"
                        alt="linkedin"
                        width={32}
                        height={32}
                        className=" max-md:w-6 aspect-square"
                    />
                    <Image
                        src="/images/footer-twitter.svg"
                        alt="twitter"
                        width={32}
                        height={32}
                        className=" max-md:w-6 aspect-square"
                    />
                    <Image
                        src="/images/footer-insta.svg"
                        alt="instagram"
                        width={32}
                        height={32}
                        className=" max-md:w-6 aspect-square"
                    />
                    </div>
                </div>
    )
}

export function Logo () {
    return (
        <div className="">
          <Image
            src="/images/footer_logo.svg"
            alt="logo"
            width={128}
            height={112}
            className="mx-auto object-contain"
          />
        </div>
    )
}

export function LogoMobile () {
  return (
      <div className="">
        <Image
          src="/images/footer_logo.svg"
          alt="logo"
          width={80}
          height={80}
          className="ml-10 object-contain"
        />
      </div>
  )
}

export function Contact () {
    return (
        <>
        <div className="w-[304px]">
                        <h3 className="text-xl font-bold">Contact Us</h3>
                      <div className="mt-4 flex flex-col gap-5 text-sm font-normal ">
                        <div className="flex items-center gap-2">
                          <CiLocationOn size={35} />
                          <p className="w-[250px]">Second Industrial St - Industrial Area 5 - Industrial Area - Sharjah - United Arab Emirates</p>
                        </div>
                        <div className="flex items-center gap-2">
                        <AiOutlineMail size={25} />
                          <p>support@figma.com</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <IoCallOutline size={25} />
                          <p>+971 65422991</p>
                        </div>
                      </div>
                        </div>
        </>
    )
}