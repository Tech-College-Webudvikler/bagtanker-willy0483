import { SignUpForm } from "@/components/signUpForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/signup/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-8 w-96 flex flex-col justify-center items-center ">
      <h1 className="text-center text-2xl font-bold text-gray-500">Sign Up</h1>
      <SignUpForm />
    </div>
  );
}
