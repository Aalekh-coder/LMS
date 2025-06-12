// import Loader from "@/components/MyComponents/Loader";
// import { Skeleton } from "@/components/ui/skeleton";
import { initialSignInFormData, initialSignUpFormData } from "@/config";
import { checkAuth, loginService, registerService } from "@/services";

import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
  const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);
  const [auth, setAuth] = useState({
    authenticate: false,
    user: null,
  });

  // const [loading, setLoading] = useState(false);

  async function handleRegister(e) {
    e.preventDefault();
    const data = await registerService(signUpFormData);
    console.log(data);
  }

  async function handleLoginUser(e) {
    e.preventDefault();
    const data = await loginService(signInFormData);
    console.log(data);

    if (data.success) {
      sessionStorage.setItem(
        "accessToken",
        JSON.stringify(data?.data?.accessToken)
      );
      setAuth({
        authenticate: true,
        user: data.user,
      });
    } else {
      setAuth({
        authenticate: false,
        user: null,
      });
      // setLoading(true);

    }
  }

  // check auth

  async function checkAuthUser() {
    try {
      const data = await checkAuth();
      if (data?.success) {
        setAuth({
          authenticate: true,
          user: data?.data?.user,
        });
        // setLoading(false);
      } else {
        setAuth({
          authenticate: false,
          user: null,
        });
        // setLoading(true);

      }
    } catch (error) {
      // setLoading(true);
      console.log(error);
      if (!error?.response?.data?.success) {
        setAuth({
          authenticate: false,
          user: null,
        });
      }
    }
  }

  function resetCredentials() {
    setAuth({
      authenticate: false,
      user: null,
    });
  }

  useEffect(() => {
    checkAuthUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signInFormData,
        setSignInFormData,
        signUpFormData,
        setSignUpFormData,
        handleRegister,
        handleLoginUser,
        auth,
        resetCredentials
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
