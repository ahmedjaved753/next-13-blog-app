"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const signUpFormSchema = z
  .object({
    email: z.string().min(1, { message: "Required" }).email(),
    password: z
      .string()
      .min(8, { message: "Password must be 8 characters long" }),
    confirmPassword: z.string(),
    firstname: z.string(),
    lastname: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignUpFormValuesType = z.infer<typeof signUpFormSchema>;

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValuesType>({
    resolver: zodResolver(signUpFormSchema),
  });

  const onSubmit: SubmitHandler<SignUpFormValuesType> = (data) =>
    console.log(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-screen h-screen grid place-items-center"
    >
      <Card className="w-4/5 sm:w-3/5 md:w-2/5 lg:w-1/3">
        <CardHeader>
          <CardTitle className="text-center">Sign Up Form</CardTitle>
          <CardDescription className="text-center">
            Please sign up to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="user@example.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email?.message}</p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="Pasword"
                type="password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-xs text-red-500">
                  {errors.password?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                placeholder="Confirm Pasword"
                type="password"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-xs text-red-500">
                  {errors.confirmPassword?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="firstname">First Name</Label>
              <Input
                id="firstname"
                placeholder="John"
                {...register("firstname")}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="lastname">Last Name</Label>
              <Input
                id="lastname"
                placeholder="Doe"
                {...register("lastname")}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col">
          <Button className="mb-4">Register</Button>
          <span className="text-sm">
            Already have an account?&nbsp;
            <Link className="underline" href="/login">
              Login
            </Link>
          </span>
        </CardFooter>
      </Card>
    </form>
  );
}

export default Register;
