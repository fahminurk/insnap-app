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
import { useToast } from "@/components/ui/use-toast";
import {
  useCreateAccountMutation,
  useSignInAccount,
} from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/useUserContext";

const SignupForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const { mutateAsync: createUserAccount, isPending: isCreatingLoading } =
    useCreateAccountMutation();
  const { mutateAsync: signInAccount, isPending: isSignInLoading } =
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

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignUpSchema>) {
    try {
      const newUser = await createUserAccount(values);

      if (!newUser)
        return toast({
          variant: "destructive",
          title: "something went wrong",
        });

      const session = await signInAccount({
        email: values.email,
        password: values.password,
      });

      if (!session)
        return toast({
          variant: "destructive",
          title: "sign in failed, try again",
        });

      const isLoggedIn = await checkAuthUser();

      if (isLoggedIn) {
        toast({
          variant: "default",
          title: "account created",
          duration: 2000,
        });
        form.reset();
        navigate("/");
      } else {
        return toast({
          variant: "destructive",
          title: "something went wrong",
        });
      }
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
          <Button type="submit" className="shad-button_primary">
            {isCreatingLoading ? <Loader /> : "Sign up"}
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
