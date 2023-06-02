import * as z from "zod";
import { blogFormSchema } from "@/lib/validationSchemas";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

type BodyType = z.infer<typeof blogFormSchema>;

export async function POST(req: Request) {
  const body: BodyType = await req.json();
  try {
    blogFormSchema.parse(body);
  } catch {
    return NextResponse.json({ message: "Invalid body" }, { status: 400 });
  }

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized. Please login" },
      { status: 401 }
    );
  }

  await db.blog.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: session?.user.id,
    },
  });

  return NextResponse.json(
    { message: "Blog published successfully" },
    { status: 201 }
  );
}
