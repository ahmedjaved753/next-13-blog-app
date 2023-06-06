import BlogForm from "@/components/BlogForm";
import React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function AddBlog() {
  const session = await getServerSession(authOptions);

  if (!session?.user) redirect("/login");

  return <BlogForm />;
}

export default AddBlog;
