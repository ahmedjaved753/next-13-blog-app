import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BlogForm from "@/components/BlogForm";
import { db } from "@/lib/db";

type UpdateBlogPropsType = { params: { blogId: string } };

async function UpdateBlog({ params: { blogId } }: UpdateBlogPropsType) {
  const session = await getServerSession(authOptions);

  if (!session?.user) redirect("/login");

  const blog = await db.blog.findUnique({
    where: {
      id: blogId,
    },
  });

  if (!blog) return null;
  return <BlogForm defaultValues={blog} />;
}

export default UpdateBlog;
