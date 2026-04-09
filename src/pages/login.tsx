import React, { useState } from "react";
import type { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { authOptions } from "./api/auth/[...nextauth]";
import { useFormik } from "formik";
import { loginSchema } from "@/lib/validationSchemas";
import Head from "next/head";

export default function LoginPage() {
  const router = useRouter();
  const [authError, setAuthError] = useState("");

  const formik = useFormik({
    initialValues: { email: "", password: "", rememberMe: false },
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setAuthError("");
      const result = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });
      if (result?.error) {
        setAuthError("Invalid email or password. Please try again.");
      } else {
        router.push("/dashboard");
      }
      setSubmitting(false);
    },
  });

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting } = formik;

  return (
    <>
      <Head>
        <title>Sign in — ticktock</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <div className="min-h-screen flex" style={{ fontFamily: "Inter, sans-serif" }}>

        <div className="flex-1 flex items-center justify-center px-8 bg-white">
          <div className="w-full max-w-sm">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Welcome back</h1>

            {authError && (
              <div className="mb-4 px-3 py-2.5 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                {authError}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="name@example.com"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`input-base ${errors.email && touched.email ? "input-error" : ""}`}
                />
                {errors.email && touched.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••••"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`input-base ${errors.password && touched.password ? "input-error" : ""}`}
                />
                {errors.password && touched.password && (
                  <p className="mt-1 text-xs text-red-500">{errors.password}</p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={values.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <label htmlFor="rememberMe" className="text-sm text-gray-600 cursor-pointer select-none">
                  Remember me
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <><span className="spinner" /> Signing in…</>
                ) : "Sign in"}
              </button>
            </form>
          </div>
        </div>

        <div className="hidden md:flex flex-1 flex-col items-start justify-center p-14 bg-blue-600 text-white">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-bold mb-4 tracking-tight">ticktock</h2>
            <p className="text-blue-100 text-[15px] leading-relaxed">
              Introducing ticktock, our cutting-edge timesheet web application designed to
              revolutionize how you manage employee work hours. With ticktock, you can
              effortlessly track and monitor employee attendance and productivity from
              anywhere, anytime, using any internet-connected device.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  if (session) return { redirect: { destination: "/dashboard", permanent: false } };
  return { props: {} };
};