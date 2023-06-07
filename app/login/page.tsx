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
import { loginFormSchema } from "@/lib/validationSchemas";
import { signIn } from "next-auth/react";
import Alert from "@/components/Alert";
import InputError from "@/components/InputError";

type LoginFormValuesType = z.infer<typeof loginFormSchema>;

const ERROR_MESSAGE = "Please check your credentials and try again.";
const CREDENTIALS_SIGNIN_ERROR = "CredentialsSignin";

function Login({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormValuesType>({ resolver: zodResolver(loginFormSchema) });

  const onSubmit: SubmitHandler<LoginFormValuesType> = async (data) => {
    try {
      await signIn("credentials", {
        ...data,
        callbackUrl: "/",
      });
      reset();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-screen h-screen flex flex-col justify-center items-center"
    >
      <Card className="w-4/5 sm:w-3/5 md:w-2/5 lg:w-1/3">
        <CardHeader>
          <CardTitle className="text-center">Login Form</CardTitle>
          <CardDescription className="text-center">
            Please Login to continue
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
                {...register("password")}
                type="password"
              />
              {errors.password && (
                <InputError errorMessage={errors.password?.message as string} />
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col">
          <Button className="mb-4">Login</Button>
          <span className="text-sm">
            Don&apos;t have an account?&nbsp;
            <Link className="underline" href="/signup">
              Sign up
            </Link>
          </span>
        </CardFooter>
      </Card>
      {searchParams.error === CREDENTIALS_SIGNIN_ERROR && (
        <Alert
          className="w-4/5 sm:w-3/5 md:w-2/5 lg:w-1/3 mt-4"
          variant="destructive"
          title="Error"
          description={ERROR_MESSAGE}
        />
      )}
    </form>
  );
}

export default Login;
