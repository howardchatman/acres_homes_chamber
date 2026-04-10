import type { Metadata } from "next";
import LoginForm from "./login-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sign In — AcresHOME Chamber",
};

export default function LoginPage() {
  return <LoginForm />;
}
