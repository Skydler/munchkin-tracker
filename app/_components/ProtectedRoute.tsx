"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/services/firebase/auth";
import Login from "../login/page";

export default function ProtectedRoute({ children }) {
  const [user, loading] = useAuthState(auth);

  if (!loading && !user) {
    return <Login />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return children;
}
