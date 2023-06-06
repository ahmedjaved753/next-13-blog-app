"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

function EmptyBlogs() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center mt-10">
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
        You don&apos;t have any blogs
      </h4>
      <Button onClick={() => router.push("add-blog")} className="mt-2">
        Get Started
      </Button>
    </div>
  );
}

export default EmptyBlogs;
