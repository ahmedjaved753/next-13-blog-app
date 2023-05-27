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

function Register() {
  return (
    <div className="w-screen h-screen grid place-items-center">
      <Card className="w-4/5 sm:w-3/5 md:w-2/5 lg:w-1/3">
        <CardHeader>
          <CardTitle className="text-center">Sign Up Form</CardTitle>
          <CardDescription className="text-center">
            Please sign up to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="user@example.com" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" placeholder="Pasword" type="password" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  placeholder="Pasword"
                  type="password"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="firstname">First Name</Label>
                <Input id="firstname" placeholder="John" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="lastname">Last Name</Label>
                <Input id="lastname" placeholder="Doe" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col">
          <Button className="mb-4">Register</Button>
          <span className="text-sm">
            Already have an account?
            <Link className="underline" href="/login">
              Login
            </Link>
          </span>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Register;
