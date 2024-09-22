import { ChildProps } from "@/types";
import TopBar from "./_components/topBar";
import { Toaster } from "@/components/ui/sonner";

const Layout = ({ children }: ChildProps) => {
  return (
    <>
      <div className="relative">
        <TopBar />
      </div>
      <main className="">
        {children}
        <Toaster position="top-center" />
      </main>
    </>
  );
};

export default Layout;
