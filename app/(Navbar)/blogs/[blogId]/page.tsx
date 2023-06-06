import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import NavigationButton from "@/components/NavigationButton";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

type ShowBlogPropsType = { params: { blogId: string } };

async function page({ params: { blogId } }: ShowBlogPropsType) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const blog = await db.blog.findFirst({
    where: {
      id: blogId,
      authorId: session?.user.id,
    },
  });

  return (
    <div className="flex flex-col w-full items-center mt-10">
      <div className="w-5/6">
        <div className="flex w-full justify-between">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            {blog?.title}
          </h2>
          <NavigationButton route={`/update-blog/${blogId}`} className="ml-6">
            Edit
          </NavigationButton>
        </div>

        <p className="leading-7 [&:not(:first-child)]:mt-6">{blog?.content}</p>
      </div>
    </div>
  );
}

export default page;
