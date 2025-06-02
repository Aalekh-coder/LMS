import { Skeleton } from "@/components/ui/skeleton";
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

  const [loading, setLoading] = useState(true);

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
      sessionStorage.setItem("accessToken", JSON.stringify(data?.data?.accessToken))
      setAuth({
        authenticate: true,
        user:data.user
      })
      setLoading(false)
    } else {
      setAuth({
        authenticate: false,
        user: null
      })
    }
  }


  // check auth

  async function checkAuthUser() {
    const data = await checkAuth()
    if (data?.success) {
      setAuth({
        authenticate: true,
        user: data?.data?.user
      })
      setLoading(false)
    } else {
      setAuth({
        authenticate: false,
        user: null
      })
    }
  }

  console.log(auth);
 
  useEffect(() => {
    checkAuthUser()
  },[])

  return (
    <AuthContext.Provider
      value={{
        signInFormData,
        setSignInFormData,
        signUpFormData,
        setSignUpFormData,
        handleRegister,
        handleLoginUser,
        auth
      }}
    >
      {loading? <Skeleton/>:children}
    </AuthContext.Provider>
  );
}
