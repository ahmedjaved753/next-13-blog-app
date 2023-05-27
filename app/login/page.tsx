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

function Login() {
  return (
    <div className="w-screen h-screen grid place-items-center">
      <Card className="w-4/5 sm:w-3/5 md:w-2/5 lg:w-1/3">
        <CardHeader>
          <CardTitle className="text-center">Login Form</CardTitle>
          <CardDescription className="text-center">
            Please Login to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Email</Label>
                <Input id="name" placeholder="user@example.com" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Password</Label>
                <Input id="name" placeholder="Pasword" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col">
          <Button className="mb-4">Login</Button>
          <span className="text-sm">
            Don&apos;t have an account?
            <Link className="underline" href="/signup">
              Sign up
            </Link>
          </span>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Login;
