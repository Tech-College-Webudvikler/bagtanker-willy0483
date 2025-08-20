// components/signUpForm.tsx
import { useActionState } from "react";
import {
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  MailIcon,
  UserIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { signup } from "@/lib/auth";
import SubmitButton from "./submitButton";
import { toast } from "sonner";

export const SignUpForm = () => {
  const [state, action] = useActionState(signup, undefined);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (state?.success) {
      toast.success("Account created. Please log in.", {
        id: "signup-success",
      });
      navigate({ to: "/login" });
    }
  }, [state?.success, state?.message, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const errorMessage =
    state?.message ||
    state?.error?.name ||
    state?.error?.email ||
    state?.error?.password;

  return (
    <form
      action={action}
      className="w-full h-100 flex flex-col justify-center max-w-xs space-y-4 text-black"
    >
      {errorMessage && (
        <p className="text-sm text-red-500 text-center">{errorMessage}</p>
      )}

      <div className="relative flex items-center gap-2 rounded-md border border-gray-300 px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500">
        <UserIcon className="h-5 w-5 text-gray-500" />
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          className="flex-1 border-none outline-0 bg-transparent focus:ring-0 p-0"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          required
        />
      </div>

      <div className="relative flex items-center gap-2 rounded-md border border-gray-300 px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500">
        <MailIcon className="h-5 w-5 text-gray-500" />
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          className="flex-1 border-none outline-0 bg-transparent focus:ring-0 p-0"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />
      </div>

      <div className="relative flex items-center gap-2 rounded-md border border-gray-300 px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500">
        <LockIcon className="h-5 w-5 text-gray-500" />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          id="password"
          name="password"
          className="flex-1 border-none outline-0 bg-transparent focus:ring-0 p-0"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          required
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="text-gray-500 hover:text-gray-700"
        >
          {showPassword ? (
            <EyeOffIcon className="h-5 w-5" />
          ) : (
            <EyeIcon className="h-5 w-5" />
          )}
        </button>
      </div>

      <SubmitButton>Sign Up</SubmitButton>

      <div className="flex justify-center text-sm gap-1">
        <p className="text-gray-600">Already have an account?</p>
        <a
          className="font-medium text-indigo-600 hover:underline"
          href="/login"
        >
          Log In
        </a>
      </div>
    </form>
  );
};
