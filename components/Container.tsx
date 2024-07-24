import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Container = ({ children, className }: Props) => {
  return <div className={cn("mx-auto max-w-7xl", className)}>{children}</div>;
};

export default Container;
