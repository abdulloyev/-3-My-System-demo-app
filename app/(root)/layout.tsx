import { ChildProps } from "@/types";
import TopBar from "./_components/topBar";

const Layout = ({ children }: ChildProps) => {
  return (
    <>
      <div className="relative">
        <TopBar />
      </div>
      <main className="">{children}</main>
    </>
  );
};

export default Layout;
