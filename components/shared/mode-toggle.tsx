"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
const ModeToggle = () => {
  // State - Dark modeni o'qish uchun
  const [mount, setMount] = useState<boolean>(false);

  // Themeni o'qish uchun
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMount(true), []);

  return mount && resolvedTheme === "dark" ? (
    <Button
      size={"icon"}
      variant={"secondary"}
      onClick={() => setTheme("light")}
      aria-label="light"
      className="w-full"
    >
      <Sun className="pr-2 size-6" /> <h2>Oq fon</h2>
    </Button>
  ) : (
    <Button
      size={"icon"}
      variant={"ghost"}
      onClick={() => setTheme("dark")}
      aria-label="dark"
      className="w-full"
    >
      <Moon className="pr-2 size-6" /> <h2>Qora fon</h2>
    </Button>
  );
};
export default ModeToggle;
