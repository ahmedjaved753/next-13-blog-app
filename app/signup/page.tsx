"use client";
import { useState } from "react";
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
import { signUpFormSchema } from "@/lib/validationSchemas";
import { signUp } from "@/lib/api";
import { signIn } from "next-auth/react";
import Alert from "@/components/Alert";
import InputError from "@/components/InputError";

export type SignUpFormValuesType = z.infer<typeof signUpFormSchema>;

function Register() {
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpFormValuesType>({
    resolver: zodResolver(signUpFormSchema),
  });

  const onSubmit: SubmitHandler<SignUpFormValuesType> = async (data) => {
    try {
      await signUp(data);
      error && setError("");
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl: "/",
      });
      reset();
    } catch (e: any) {
      console.error(e);
      setError(e.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-screen h-screen flex flex-col justify-center items-center"
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
                <InputError errorMessage={errors.email?.message as string} />
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
                <InputError errorMessage={errors.password?.message as string} />
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
                <InputError
                  errorMessage={errors.confirmPassword?.message as string}
                />
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
      {error && (
        <Alert
          className="w-4/5 sm:w-3/5 md:w-2/5 lg:w-1/3 mt-4"
          variant="destructive"
          title="Error"
          description={error}
        />
      )}
    </form>
  );
}

export default Register;
