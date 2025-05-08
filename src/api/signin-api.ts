import { SignInFormData, SignInResults } from "../types/interfaces";

export const signIn = async (
  credentials: SignInFormData
): Promise<{ token: string }> => {
  try {
    const response = await fetch(
      "https://gklvv4xam9.execute-api.eu-west-1.amazonaws.com/prod/auth/signin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: credentials.username,
          password: credentials.password,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Sign-in failed");
    }

    const data: SignInResults = await response.json();
    localStorage.setItem("authToken", data.token);

    return data;
  } catch (error) {
    console.error("Sign-in error:", error);
    throw error;
  }
};