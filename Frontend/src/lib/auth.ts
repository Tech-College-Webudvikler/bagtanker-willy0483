import { z } from "zod";
import { BACKEND_URL } from "./constants";
import {
  LoginFormSchema,
  ReviewFormSchema,
  SignupFormSchema,
  type createReviewState,
  type FormState,
} from "./types";

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

export const signup = async (
  _state: FormState,
  formData: FormData
): Promise<FormState> => {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    const treeifiedErrors = z.treeifyError(validatedFields.error);
    return {
      error: {
        name: treeifiedErrors.properties?.name?.errors,
        email: treeifiedErrors.properties?.email?.errors,
        password: treeifiedErrors.properties?.password?.errors,
      },
    };
  }

  const response = await fetch(`${BACKEND_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...validatedFields.data,
      image: "1",
      isActive: 1,
      description: "test",
      refreshToken: "refreshToken",
    }),
  });

  if (response.ok) {
    return { success: true };
  } else {
    return {
      message:
        response.status === 409
          ? "The user already existed!"
          : response.statusText,
    };
  }
};

export const createReview = async (
  _state: createReviewState,
  formData: FormData
): Promise<createReviewState> => {
  const validatedFields = ReviewFormSchema.safeParse({
    title: formData.get("title"),
    comment: formData.get("comment"),
    numStars: Number(formData.get("numStars")),
    productId: formData.get("productId"),
  });

  if (!validatedFields.success) {
    const treeifiedErrors = z.treeifyError(validatedFields.error);
    return {
      error: {
        title: treeifiedErrors.properties?.title?.errors,
        comment: treeifiedErrors.properties?.comment?.errors,
        numStars: treeifiedErrors.properties?.numStars?.errors,
      },
    };
  }

  const response = await fetch(`${BACKEND_URL}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validatedFields.data),
  });

  if (response.ok) {
    const data = await response.json();
    return { success: true, data };
  } else {
    return {
      message:
        response.status === 409
          ? "Review already exists!"
          : response.statusText,
    };
  }
};
