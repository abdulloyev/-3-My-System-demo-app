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
    router.push("/home"); // /home page push
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

export default HubPage;
