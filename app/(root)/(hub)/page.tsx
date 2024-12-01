"use client";

import { useRouter } from "next/navigation";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { serialize } from "cookie";

const schema = z.object({
  name: z.string().min(1, { message: "User name kiritilmadi!" }),
});

interface FormData {
  name: string;
}

function HubPage() {
  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    // Cookie orqali username saqlash
    document.cookie = serialize("username", data.name, { path: "/" });
    console.log("User name saqlandi:", data.name);

    // LocalStorage dan mavjud ma'lumotlarni olish
    const existingLessons = localStorage.getItem("lesson");
    const lessons = existingLessons ? JSON.parse(existingLessons) : {};

    // lesson1: true qo'shish
    lessons.lesson1 = true;

    // Yangilangan ma'lumotni saqlash
    localStorage.setItem("lesson", JSON.stringify(lessons));

    router.push("/home"); // /home page push
  };

  return (
    <div className="flex justify-center items-center h-[100vh] bg-muted bg-gradient-to-r from-blue-300 via-pink-200 to-yellow-100 ">
      <Card className="w-[400px] p-[20px] bg-popover">
        <CardHeader>
          <h2 className="text-center">Profilga Kirish</h2>
        </CardHeader>
        <CardContent>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ism</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Ismingizni kiriting" />
                    </FormControl>
                    {errors.name && (
                      <FormMessage className="text-destructive">
                        {errors.name.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
              <Button type="submit" className="mt-[20px] w-full text-white">
                Kirish
              </Button>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
}

export default HubPage;
