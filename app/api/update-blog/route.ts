import * as z from "zod";
import { updateBlogSchems } from "@/lib/validationSchemas";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

type BodyType = z.infer<typeof updateBlogSchems>;

export async function PUT(req: Request) {
  const body: BodyType = await req.json();
  try {
    updateBlogSchems.parse(body);
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

  await db.blog.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });

  return NextResponse.json(
    { message: "Blog updated successfully" },
    { status: 200 }
  );
}
