"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { deleteCookie, getCookie } from "@/lib/utils";
import { LogOut, User2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, memo } from "react";

// Client tarafida username qiymatini olish
const Profile = () => {
  // State - username va popover holatini saqlash
  const [username, setUsername] = useState<string | null>(null);
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
  const router = useRouter();

  // Username'ni fetch qilish va state'ni yangilash
  const fetchUsername = () => {
    const user = getCookie("username");
    setUsername(user);
  };

  useEffect(() => {
    fetchUsername(); // Boshlang'ich fetch
    // Cookie o'zgarishini tekshirish uchun polling
    const intervalId = setTimeout(fetchUsername, 2);

    // Komponent unmount qilinganda intervalni to'xtatish
    return () => clearInterval(intervalId);
  }, [popoverOpen]); // `popoverOpen` o'zgarishi bilan qayta ishga tushadi

  // Logout handler
  const handleLogout = () => {
    deleteCookie("username"); // Cookie'ni o'chirish
    router.push("/"); // Bosh sahifaga yo'naltirish
    setPopoverOpen(false); // Popover'ni yopish
  };

  // Popover tashqarisiga bosilganda popover'ni yopish
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !target.closest(".popover-trigger") &&
        !target.closest(".popover-content")
      ) {
        setPopoverOpen(false); // Popover'ni yopish
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger
        onClick={() => setPopoverOpen(prev => !prev)}
        asChild
        className="popover-trigger"
      >
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
          <AvatarFallback>US</AvatarFallback>
        </Avatar>
      </PopoverTrigger>

      <PopoverContent className="popover-content">
        <div className="flex items-center gap-2">
          <User2 className="size-4" /> <h2>{username || "user null"}</h2>
        </div>

        <Separator className="my-1" />

        <div
          className="flex items-center gap-2 bg-destructive p-1 justify-center text-white rounded-md cursor-pointer"
          onClick={handleLogout}
        >
          <LogOut className="size-4" /> <h2>Chiqish</h2>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default memo(Profile);
