import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const verifyToken = (): boolean => {
    const token = Cookies.get("token");
    if(token){
        return true;
    }
    return false;
  }

export const deleteToken = () => {
  Cookies.remove("token");
  localStorage.removeItem("user");
}

export function useAuthGuard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const isTokenValid = verifyToken();
      if (!isTokenValid) {
        router.push("/sign-in");
      } else {
        setIsLoading(false); // Set loading selesai jika token valid
      }
    };

    checkToken();
  }, [router]);

  return { isLoading };
}

export function getUserFromLocalStorage() {
  try {
      return JSON.parse(localStorage.getItem("user") || "{}");
  } catch {
      return {}; // Fallback to an empty object
  }
}
