"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("polly-admin-auth") === "true") {
      router.replace("/admin/dashboard");
    } else {
      setChecking(false);
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (username === "admin" && password === "admin") {
      sessionStorage.setItem("polly-admin-auth", "true");
      router.push("/admin/dashboard");
    } else {
      setError("Invalid credentials. Try admin / admin.");
    }
  };

  if (checking) return null;

  return (
    <div className="flex min-h-screen items-center justify-center px-4" style={{ background: "#f0ebe4" }}>
      <div className="w-full max-w-sm">
        {/* Brand */}
        <div className="mb-8 text-center">
          <p className="brand-shadow">
            <span className="font-[family-name:var(--font-nunito)] text-2xl uppercase tracking-[0.08em] brand-painted">
              <span className="font-light">Poly</span>
              <span className="font-black">snifferous</span>
            </span>
          </p>
          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[#8a6218]/50">
            Admin Portal
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-[#c8b898]/40 bg-[#e8e1d8] p-6 shadow-xl shadow-[#8a6218]/5"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#7a6e62]">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-lg border border-[#c8b898]/50 bg-[#f0ebe4] px-3 py-2.5 text-sm text-[#3d352c] placeholder:text-[#7a6e62]/30 focus:border-[#8a6218] focus:outline-none focus:ring-1 focus:ring-[#8a6218]/50"
                placeholder="Enter username"
                autoComplete="username"
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#7a6e62]">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-[#c8b898]/50 bg-[#f0ebe4] px-3 py-2.5 text-sm text-[#3d352c] placeholder:text-[#7a6e62]/30 focus:border-[#8a6218] focus:outline-none focus:ring-1 focus:ring-[#8a6218]/50"
                placeholder="Enter password"
                autoComplete="current-password"
              />
            </div>
          </div>

          {error && (
            <p className="mt-3 text-xs text-[#8b2e1c]">{error}</p>
          )}

          <button
            type="submit"
            className="mt-6 w-full rounded-lg bg-[#8a6218] px-4 py-2.5 text-sm font-semibold text-[#f0ebe4] transition-colors hover:bg-[#a37520]"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-[11px] text-[#7a6e62]/40">
          Demo credentials: admin / admin
        </p>
      </div>
    </div>
  );
}
