import z from "zod";

export interface T_News {
  id: number;
  title: string;
  slug: string;
  teaser: string;
  imageUrl: string;
  createdAt: string;
}

export interface T_Product {
  id: number;
  title: string;
  slug: string;
  imageUrl: string;
  price: number;
  description: string;
}

export interface T_ProductDetails {
  id: number;
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  procedure: string;
  durationInMinutes: number;
  amount: number;
  price: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  productIngredients: ProductIngredient[];
}

export interface ProductIngredient {
  id: number;
  productId: number;
  ingredientId: number;
  unitId: number;
  amount: number;
  orderNum: number;
  ingredients: Ingredients;
  units: Units;
}

export interface Ingredients {
  title: string;
}

export interface Units {
  name: string;
  abbreviation: string;
}

export interface T_Message {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export type FormState =
  | {
      error?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
      success?: boolean;
      session?: Session;
    }
  | undefined;

export type createReviewState =
  | {
      error?: {
        title?: string[];
        comment?: string[];
        numStars?: string[];
      };
      message?: string;
      success?: boolean;
      session?: Session;
      data?: Reviews_Create;
    }
  | undefined;

export const LoginFormSchema = z.object({
  email: z.email({ message: "Please enter a valid email." }),
  password: z.string().min(1, {
    message: "Password field must not be empty.",
  }),
});

export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters long.",
    })
    .trim(),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, {
      message: "Contain at least one letter.",
    })
    .regex(/[0-9]/, {
      message: "Contain at least one number.",
    })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
});

export const ReviewFormSchema = z.object({
  title: z.string().min(1, { message: "Titel må ikke være tom." }),
  comment: z.string().min(1, { message: "Kommentar må ikke være tom." }),
  numStars: z.number().min(1, { message: "Vælg antal stjerner." }),
  productId: z.number(),
});

export interface Session {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface CreateUser {
  name: string;
  email: string;
  password: string;
  image: string;
}

export interface User {
  id: number;
  name: string;
}

export interface T_Reviews {
  title: string;
  comment: string;
  numStars: number;
  user: Reviews_User;
  createdAt: string;
}

export interface Reviews_User {
  name: string;
  email: string;
  image: string;
}

export interface Reviews_Create {
  title: string;
  comment: string;
  numStars: number;
  productId: number;
  isActive: boolean;
}
