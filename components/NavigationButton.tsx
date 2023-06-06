"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

type NavigationButtonPropsType = {
  className: string;
  route: string;
  children: React.ReactNode;
};

function NavigationButton({
  className,
  route,
  children,
}: NavigationButtonPropsType) {
  const router = useRouter();
  return (
    <Button className={className} onClick={() => router.push(route)}>
      {children}
    </Button>
  );
}

export default NavigationButton;
