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
            ----Dastur haqida-----
          </SheetDescription>
        </SheetHeader>
        <nav className="mt-4">
          <ul className="space-y-4">
            <li>
              <Link
                href="/home"
                className="text-lg font-medium hover:text-blue-500"
              >
                Bosh sayifa
              </Link>
            </li>
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default memo(MenuBar);
