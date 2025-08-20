import { z } from "zod";
import { BACKEND_URL } from "./constants";
import { LoginFormSchema, type FormState } from "./types";

export const login = async (
  _state: FormState,
  formData: FormData
): Promise<FormState> => {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    const treeifiedErrors = z.treeifyError(validatedFields.error);
    return {
      error: {
        email: treeifiedErrors.properties?.email?.errors,
        password: treeifiedErrors.properties?.password?.errors,
      },
    };
  }

  const data = {
    username: validatedFields.data.email,
    password: validatedFields.data.password,
  };

  const response = await fetch(`${BACKEND_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const result = await response.json();
    console.log(result);
    return { success: true, session: result };
  } else {
    return {
      message:
        response.status === 401 ? "Invalid Credentials!" : response.statusText,
    };
  }
};
