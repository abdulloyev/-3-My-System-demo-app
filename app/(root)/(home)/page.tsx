"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, FormProvider } from "react-hook-form";
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

// Validatsiya uchun schema yaratish
const schema = z.object({
  name: z.string().min(1, { message: "User name kiritilmadi!" }),
});

// Form ma'lumotlari uchun interfeys
interface FormData {
  name: string;
}

function HomePage() {
  // useForm ga schema va tur berish
  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  // Submit funksiyasi
  const onSubmit = (data: FormData) => {
    console.log(data);

    // User name localStorage ga saqlash
    localStorage.setItem("username", data.name);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card style={{ width: "400px", padding: "20px" }}>
        <CardHeader>
          <h2 style={{ textAlign: "center" }}>Profilga Kirish</h2>
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
                      <Input {...field} placeholder="User Nameni kiriting" />
                    </FormControl>
                    {errors.name && (
                      <FormMessage>{errors.name.message}</FormMessage>
                    )}
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                style={{ marginTop: "20px", width: "100%" }}
              >
                Kirish
              </Button>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
}

export default HomePage;
