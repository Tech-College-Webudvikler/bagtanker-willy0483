import type { PropsWithChildren } from "react";
import { useFormStatus } from "react-dom";

const SubmitButton = ({ children }: PropsWithChildren) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-blue-grey text-white py-2 rounded-2xl hover:cursor-pointer"
    >
      {pending ? "Submitting..." : children}
    </button>
  );
};

export default SubmitButton;
