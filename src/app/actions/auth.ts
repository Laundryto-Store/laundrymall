"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const MEDUSA_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "https://backend-production-3a66.up.railway.app";
const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "";

const getHeaders = (token?: string) => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (PUBLISHABLE_KEY) {
    headers["x-publishable-api-key"] = PUBLISHABLE_KEY;
  }
  if (token) {
    headers["Authorization"] = "Bearer " + token;
  }
  return headers;
};

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const res = await fetch(MEDUSA_URL + "/auth/customer/emailpass", {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const error = await res.json();
      return { error: error.message || "Invalid email or password" };
    }

    const data = await res.json();
    if (data.token) {
      cookies().set("_medusa_jwt", data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });
      return { success: true };
    } else {
      return { error: "Authentication failed. No token received." };
    }
  } catch (error) {
    console.error("Login error:", error);
    return { error: "An unexpected error occurred during login." };
  }
}

export async function signupAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const firstName = formData.get("first_name") as string;
  const lastName = formData.get("last_name") as string;

  try {
    const authRes = await fetch(MEDUSA_URL + "/auth/customer/emailpass/register", {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ email, password }),
    });

    if (!authRes.ok) {
      const error = await authRes.json();
      return { error: error.message || "Failed to register authentication identity" };
    }

    const authData = await authRes.json();
    const token = authData.token;

    if (!token) {
      return { error: "Failed to obtain authentication token during signup." };
    }

    cookies().set("_medusa_jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    const customerRes = await fetch(MEDUSA_URL + "/store/customers", {
      method: "POST",
      headers: getHeaders(token),
      body: JSON.stringify({ email, first_name: firstName, last_name: lastName }),
    });

    if (!customerRes.ok) {
      const error = await customerRes.json();
      console.error("Customer creation error:", error);
      return { success: true, message: "Account created but profile setup incomplete." };
    }

    return { success: true };
  } catch (error) {
    console.error("Signup error:", error);
    return { error: "An unexpected error occurred during signup." };
  }
}

export async function logoutAction() {
  cookies().delete("_medusa_jwt");
  redirect("/");
}

export async function getCustomer() {
  const token = cookies().get("_medusa_jwt")?.value;
  if (!token) return null;

  try {
    const res = await fetch(MEDUSA_URL + "/store/customers/me", {
      method: "GET",
      headers: getHeaders(token),
      next: { revalidate: 0 }
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data.customer;
  } catch (error) {
    return null;
  }
}
