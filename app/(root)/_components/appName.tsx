import Link from "next/link";
import React, { memo } from "react";

const AppName = () => {
  return (
    <Link href={"/"} className="font-bold text-stone-800">
      Bolalar Informatikasi
    </Link>
  );
};

export default memo(AppName);
