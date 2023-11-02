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
import { SignUpSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Loader from "@/components/loader";
import { Link, useNavigate } from "react-router-dom";
import {
  useCreateAccountMutation,
  useSignInAccount,
} from "@/lib/react-query/userQueries";
import { toast } from "sonner";

const SignupForm = () => {
  const navigate = useNavigate();
  const { mutateAsync: createUserAccount, isPending } =
    useCreateAccountMutation();
  useSignInAccount();

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username: "",
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SignUpSchema>) {
    try {
      // console.log(new Date(1698847200 * 1000));

      const newUser = await createUserAccount(values);
      console.log(newUser);
      if (newUser.code === 409) return toast.error("email alredy exist");
      if (newUser.code === 429)
        return toast.error(
          "Rate limit for the current endpoint has been exceeded. Please try again after some time."
        );
      toast.success("account created");
      navigate("/sign-in");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <div className="flex-center flex-col">
        <p className="h1-bold italic underline">Insnap</p>
        <p className="h3-bold">Create a new account</p>
        <p className="text-light-3 small-medium md:base-regular">
          to see photos and videos from your friends
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <Button
            type="submit"
            className="shad-button_primary"
            disabled={isPending}
          >
            {isPending ? <Loader /> : "Sign up"}
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-2">
            Alredy have an account?
            <Link
              to={"/sign-in"}
              className="text-primary-500 text-small-semibold ml-1"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignupForm;
