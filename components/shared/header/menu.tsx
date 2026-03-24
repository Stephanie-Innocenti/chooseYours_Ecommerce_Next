"use client";

import { EllipsisVertical, ShoppingCart, UserIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/shared/header/mode-toggle";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";


// for small menu items when media is phone or other
const Menu = () => {
  return (
    <div className="flex justify-end gap-3">
      <nav className="hidden md:flex w-full max-w-xs gap-1">
        <ModeToggle />
        <Button variant="ghost">
          <Link href="/cart">
            <ShoppingCart className="h-5 w-5 mr-1" />
            Cart
          </Link>
        </Button>

        <Button variant="ghost">
          <Link  href="sign-in">
            <UserIcon className="h-5 w-5 mr-1" />
            Sign-in
          </Link>
        </Button>
      </nav>
      <nav className="md:hidden">
        <Sheet>
          <SheetTrigger className="align-middle">
            <EllipsisVertical></EllipsisVertical>
          </SheetTrigger>
          <SheetContent className="flex flex-col imtes-start">
            <SheetTitle>Menu</SheetTitle>
            <ModeToggle></ModeToggle>
            <Button asChild variant="ghost">
              <Link href="cart">
                <ShoppingCart></ShoppingCart>
              </Link>
            </Button>
            <SheetDescription></SheetDescription>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default Menu;
