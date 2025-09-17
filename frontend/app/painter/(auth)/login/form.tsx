import PasswordField from "@/components/form/password-field";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const PainterLoginForm = () => {
  return (
    <Card className="w-full max-w-sm">
      <CardContent className="p-6">
        <form>
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col items-start space-y-2 font-mono">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                required
              />
            </div>
            <PasswordField />
          </div>
          <Button className="w-full mt-6">Sign in</Button>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <p>
          Haven&apos;t registered yet?{" "}
          <Link
            href="/painter/register"
            className="text-blue-700 underline-offset-4 hover:underline"
          >
            Sign up here
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default PainterLoginForm;
