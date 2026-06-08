"use client";

import { useAuthStore } from "@/store";
import { getApiErrorMessage } from "@/utils/api/apiClient";
import { login } from "@/utils/api/boxOfficeApi";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const auth = useAuthStore((state) => state);
  const router = useRouter();
  const [form, setForm] = useState({ emailOrMobile: "", password: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (auth.isAuthenticated) {
      router.push("/client");
    }
  }, [auth.isAuthenticated, router]);

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const response = await login(form);
    setLoading(false);

    if (response.status !== 1) {
      toast.error(getApiErrorMessage(response.error, "Login failed"));
      return;
    }

    auth.login({
      id: Number(response.data.userId ?? 0),
      userId: response.data.userId,
      tenantId: response.data.tenantId,
      name: form.emailOrMobile,
      email: form.emailOrMobile,
      accessToken: response.data.accessToken,
      tokenType: response.data.tokenType,
      role: response.data.role,
      permissions: response.data.permissions ?? [],
    });
    toast.success("Logged in successfully");
    router.push("/client");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8fafc] px-6 text-slate-950">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-14 border border-slate-200 bg-white p-8 shadow-xl">
        <p className="text-sm font-black uppercase tracking-sm28 text-amber-700">
          Box-Awfis admin
        </p>
        <h1 className="mt-2 text-3xl font-black">Sign in</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Use your backend credentials to manage companies, events, tickets,
          and bookings.
        </p>

        <label className="mt-6 flex flex-col gap-2 text-sm font-black text-slate-700">
          Email or mobile
          <input
            value={form.emailOrMobile}
            onChange={(eventValue) =>
              setForm((current) => ({
                ...current,
                emailOrMobile: eventValue.target.value,
              }))
            }
            required
            className="rounded-10 border border-slate-300 px-4 py-3 text-sm font-bold outline-none transition focus:border-amber-500"
          />
        </label>

        <label className="mt-4 flex flex-col gap-2 text-sm font-black text-slate-700">
          Password
          <input
            type="password"
            value={form.password}
            onChange={(eventValue) =>
              setForm((current) => ({
                ...current,
                password: eventValue.target.value,
              }))
            }
            required
            className="rounded-10 border border-slate-300 px-4 py-3 text-sm font-bold outline-none transition focus:border-amber-500"
          />
        </label>

        <button
          disabled={loading}
          className="mt-6 w-full rounded-10 bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-amber-500 hover:text-slate-950 disabled:opacity-60">
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>
    </main>
  );
}
