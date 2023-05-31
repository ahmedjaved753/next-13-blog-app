import * as z from "zod";
import { signUpFormSchema } from "@/lib/validationSchemas";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hash } from "bcrypt";

type SignUpFormValuesType = z.infer<typeof signUpFormSchema>;

export async function POST(req: Request) {
  const body: SignUpFormValuesType = await req.json();
  try {
    signUpFormSchema.parse(body);
  } catch (e: any) {
    return NextResponse.json(
      { message: JSON.parse(e.message) },
      { status: 400 }
    );
  }

  const user = await db.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (user) {
    return NextResponse.json(
      { message: "Email already exists" },
      { status: 400 }
    );
  }

  await db.user.create({
    data: {
      email: body.email,
      password: await hash(body.password, 10),
      firstname: body.firstname,
      lastname: body.lastname,
    },
  });

  return NextResponse.json(
    { message: "Signed Up successfully" },
    { status: 201 }
  );
}
