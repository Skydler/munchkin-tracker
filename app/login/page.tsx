"use client";
import { auth } from "@/services/firebase/auth";
import { redirect } from "next/navigation";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";

export default function Login() {
  const [signInWithGoogle, , loading, error] = useSignInWithGoogle(auth);
  const [user] = useAuthState(auth);

  if (user) {
    redirect("/");
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <button className="btn btn-primary" onClick={() => signInWithGoogle()}>
      Sign in with Google
    </button>
  );
}
