import { LoginForm } from "@/components/logInForm";
import { Spinner } from "@/components/spinner";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/login/")({
  component: RouteComponent,
  pendingComponent: () => <Spinner />,
  errorComponent: () => <div>Error...</div>,
});

function RouteComponent() {
  return (
    <div className="p-8 w-96 flex flex-col justify-center items-center ">
      <h1 className="text-center text-2xl font-bold text-gray-500">
        Login In Page
      </h1>
      <LoginForm />
    </div>
  );
}
