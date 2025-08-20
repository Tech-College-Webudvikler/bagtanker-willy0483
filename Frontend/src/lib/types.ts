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
        email?: string[];
        password?: string[];
      };
      message?: string;
      success?: boolean;
      session?: Session;
    }
  | undefined;

export const LoginFormSchema = z.object({
  email: z.email({ message: "Please enter a valid email." }),
  password: z.string().min(1, {
    message: "Password field must not be empty.",
  }),
});

export interface Session {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface User {
  id: number;
  name: string;
}
