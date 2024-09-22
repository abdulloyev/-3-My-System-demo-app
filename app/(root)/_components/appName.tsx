import Link from "next/link";
import React, { memo } from "react";

const AppName = () => {
  return <Link href={"/"}>AppName</Link>;
};

export default memo(AppName);
