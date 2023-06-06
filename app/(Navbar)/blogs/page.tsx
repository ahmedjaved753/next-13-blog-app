import BlogCard from "@/components/BlogCard";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import EmptyBlogs from "@/components/EmptyBlogs";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  const blogs = await db.blog.findMany({
    where: {
      authorId: session.user.id,
    },
  });

  if (true) return <EmptyBlogs />;

  return (
    <div className="flex flex-col items-center w-full space-x-100 mt-10">
      <div className="flex flex-col w-5/6 gap-x-20 space-y-4">
        <div>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            My Blogs
          </h2>
        </div>
        {blogs.map((blog) => (
          <Link key={blog.id} href={`/blogs/${blog.id}`}>
            <BlogCard title={blog.title} content={blog.content} />
          </Link>
        ))}
      </div>
    </div>
  );
}
