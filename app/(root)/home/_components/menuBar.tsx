import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignLeft } from "lucide-react";
import { memo } from "react";
import Link from "next/link"; // Agar siz Next.js ishlatayotgan bo'lsangiz, Link komponentidan foydalaning
import { AppName } from "../../_components";

const MenuBar = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <AlignLeft className="h-6 w-6 cursor-pointer" />
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle className="text-xl font-semibold">
            <AppName />
          </SheetTitle>
          <SheetDescription className="text-gray-500">
            ----Text-----
          </SheetDescription>
        </SheetHeader>
        <nav className="mt-4">
          <ul className="space-y-4">
            <li>
              <Link
                href="/"
                className="text-lg font-medium hover:text-blue-500"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-lg font-medium hover:text-blue-500"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className="text-lg font-medium hover:text-blue-500"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className="text-lg font-medium hover:text-blue-500"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-lg font-medium hover:text-blue-500"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default memo(MenuBar);
