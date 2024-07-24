import React from "react";
import Box from "@/components/Box";
import { cn } from "@/lib/utils";

interface FilterContainerProps {
  children: React.ReactNode;
  className?: string;
}

const FilterContainer = ({ children, className }: FilterContainerProps) => {
  return <Box className={cn("flex-col gap-4", className)}>{children}</Box>;
};

export default FilterContainer;
