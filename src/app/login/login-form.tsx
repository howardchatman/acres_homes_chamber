"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"login" | "signup" | "reset">("login");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
    } else {
      router.push("/dashboard");
    }
    setLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) {
      setError(error.message);
    } else {
      setMessage("Check your email for a confirmation link to complete sign-up.");
    }
    setLoading(false);
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?type=recovery`,
    });
    if (error) {
      setError(error.message);
    } else {
      setMessage("Password reset link sent. Check your email.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#f9f6f2] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-1 text-2xl font-bold mb-2">
            <span className="text-[#1a1a1a]">Acres</span>
            <span className="text-[#c41230]">HOME</span>
          </Link>
          <p className="text-[#6b6560] text-sm">Chamber Member Portal</p>
        </div>

        <div className="bg-white rounded-xl border border-[#e0d8ce] p-8 shadow-sm">
          {/* Mode tabs */}
          <div className="flex gap-1 bg-[#f9f6f2] rounded-lg p-1 mb-6">
            {(["login", "signup"] as const).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setError(""); setMessage(""); }}
                className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${mode === m ? "bg-white text-[#1a1a1a] shadow-sm" : "text-[#6b6560] hover:text-[#1a1a1a]"}`}
              >
                {m === "login" ? "Sign In" : "Create Account"}
              </button>
            ))}
          </div>

          {message && (
            <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-3 text-sm mb-4">
              {message}
            </div>
          )}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-3 text-sm mb-4">
              {error}
            </div>
          )}

          {mode === "reset" ? (
            <form onSubmit={handleReset} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="your@email.com" />
              </div>
              <Button type="submit" variant="red" className="w-full" disabled={loading}>
                {loading ? "Sending..." : "Send Reset Link"}
              </Button>
              <button type="button" onClick={() => setMode("login")} className="w-full text-sm text-[#c41230] hover:underline">
                Back to Sign In
              </button>
            </form>
          ) : (
            <form onSubmit={mode === "login" ? handleLogin : handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="your@email.com" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                  {mode === "login" && (
                    <button type="button" onClick={() => setMode("reset")} className="text-xs text-[#c41230] hover:underline">
                      Forgot password?
                    </button>
                  )}
                </div>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" minLength={8} />
              </div>
              <Button type="submit" variant="red" size="lg" className="w-full" disabled={loading}>
                {loading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
              </Button>
            </form>
          )}

          {mode === "signup" && (
            <p className="text-xs text-[#6b6560] text-center mt-4">
              By creating an account, you agree to our{" "}
              <Link href="/terms" className="text-[#c41230] hover:underline">Terms of Use</Link> and{" "}
              <Link href="/privacy" className="text-[#c41230] hover:underline">Privacy Policy</Link>.
            </p>
          )}
        </div>

        <p className="text-center text-sm text-[#6b6560] mt-6">
          Not a member yet?{" "}
          <Link href="/membership/apply" className="text-[#c41230] hover:underline font-medium">
            Apply for membership
          </Link>
        </p>
      </div>
    </div>
  );
}
