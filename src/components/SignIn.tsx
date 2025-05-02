import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { User, KeyRound } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type SignInProps = {
  isOpen: boolean;
  onClose: () => void;
  onSignIn: (values: z.infer<typeof formSchema>) => void;
};

const SignIn: React.FC<SignInProps> = ({ isOpen, onClose, onSignIn }) => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSignIn(values);
    toast({
      title: "Signed in successfully",
      description: "Welcome back to UMatch!",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-[#FAF8F6] rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#2F2F2F]">
            Welcome Back
          </DialogTitle>
          <DialogDescription className="text-[#4C5A72]">
            Sign in to your account to continue your journey
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#2F2F2F]">Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-[#4C5A72]" />
                      <Input
                        className="pl-10 bg-white border border-[#D86D70] rounded-md"
                        placeholder="your.email@example.com"
                        {...field}
                      />
                    </div>
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
                  <FormLabel className="text-[#2F2F2F]">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <KeyRound className="absolute left-3 top-3 h-4 w-4 text-[#4C5A72]" />
                      <Input
                        type="password"
                        className="pl-10 bg-white border border-[#D86D70] rounded-md"
                        placeholder="••••••••"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between items-center">
              <Button type="button" variant="link" className="text-sm text-[#9F262A] p-0 h-auto">
                Forgot password?
              </Button>
              <div className="flex space-x-2">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#9F262A] hover:bg-[#D86D70] text-white"
                >
                  Sign In
                </Button>
              </div>
            </div>
          </form>
        </Form>

        <div className="mt-4 pt-4 border-t text-center">
          <p className="text-sm text-[#4C5A72]">
            Don't have an account?{" "}
            <Button variant="link" className="text-[#9F262A] p-0 h-auto">
              Create one
            </Button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignIn;
