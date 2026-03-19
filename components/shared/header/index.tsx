"use client";

import Image from "next/image";
import Link from "next/link";
import { APP_NAME } from "@/lib/costants";
import Menu from "./menu";

const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex-between">
        <Link href="/" className="flex-start">
          <Image
            src="/images/logo-icon.svg"
            alt="Logo"
            height={100}
            width={100}
            priority
          />
          <h1 className="hidden lg:block ml-2 font-semibold">{APP_NAME}</h1>
        </Link>

        <div className="flex gap-2 "></div>
        <Menu></Menu>
      </div>
    </header>
  );
};

export default Header;
