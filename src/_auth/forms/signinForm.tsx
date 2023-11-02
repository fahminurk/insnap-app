import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignInSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Loader from "@/components/loader";
import { Link, useNavigate } from "react-router-dom";
import { useSignInAccount } from "@/lib/react-query/userQueries";
import { useUserContext } from "@/context/useUserContext";
import { toast } from "sonner";

const SignInForm = () => {
  const navigate = useNavigate();
  const { checkAuthUser, isLoading } = useUserContext();
  const { mutateAsync: signInAccount, isPending: isSignInLoading } =
    useSignInAccount();

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SignInSchema>) {
    try {
      const session = await signInAccount({
        email: values.email,
        password: values.password,
      });

      if (!session) return toast.error("email or password is incorrect");

      const isLoggedIn = await checkAuthUser();

      if (isLoggedIn) {
        toast.success("you are logged in");
        form.reset();
        navigate("/");
      } else {
        toast.error("something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <div className="flex-center flex-col">
        <p className="h1-bold italic underline">Insnap</p>
        <p className="h3-bold">Log in to your account</p>
        <p className="text-light-3 small-medium md:base-regular">
          to see photos and videos from your friends
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
            {isSignInLoading || isLoading ? <Loader /> : "Sign in"}
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-2">
            Don't have an account?
            <Link
              to={"/sign-up"}
              className="text-primary-500 text-small-semibold ml-1"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignInForm;
