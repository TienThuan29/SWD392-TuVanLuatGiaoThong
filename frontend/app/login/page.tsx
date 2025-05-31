"use client";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/modern-ui/form";
import { Input } from "@/components/modern-ui/input";
import { Button } from "@/components/modern-ui/button";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Env from "@/configs/Env";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Color } from "@/configs/CssConstant";
import { FaArrowLeft } from "react-icons/fa";

const formSchema = z.object({
  username: z.string().min(3, {
    message: "Tên người dùng phải có ít nhất 3 ký tự.",
  }),
  password: z.string().min(8, {
    message: "Mật khẩu phải có ít nhất 8 ký tự.",
  }),
});

function LoginForm() {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { loginUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Use form.handleSubmit for proper validation and submission
  const handleLogin = form.handleSubmit(async (data) => {
    if (!data.username) {
      toast.error("Tên đăng nhập không được để trống!");
      return;
    }
    if (!data.password) {
      toast.error("Mật khẩu không được để trống");
      return;
    }

    try {
      setIsLoading(true);
      await loginUser(data.username, data.password);
      setSubmitted(true);
    } catch (ex) {
      console.error(ex);
      toast.error("Login failed");
    } finally {
      setIsLoading(false);
    }
  });

  const handleLoginWithGoogle = () => {
    window.location.href = Env.backendOAuth2Url?.toString() || "";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100 px-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-8">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-900">
          Đăng nhập
        </h2>

        <Form {...form}>
          {submitted ? (
            <div className="text-center p-4">
              <p className="text-green-600 text-lg font-medium mb-4">
                Form submitted successfully!
              </p>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  form.reset();
                  setSubmitted(false);
                }}
              >
                Reset Form
              </Button>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleLogin} noValidate>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">
                      Tên đăng nhập
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Tên đăng nhập của bạn"
                        {...field}
                        className="focus:ring-indigo-500 focus:border-indigo-500"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage className="text-red-600 mt-1" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">
                      Mật khẩu
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        {...field}
                        className="focus:ring-indigo-500 focus:border-indigo-500"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage className="text-red-600 mt-1" />
                  </FormItem>
                )}
              />

              <div className="flex justify-end text-sm">
                <a href="/register"
                  className="text-indigo-600 hover:text-indigo-800 transition">
                  Chưa có tài khoản? Đăng ký
                </a>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-maincolor text-white font-semibold py-3 rounded-md shadow-md hover:bg-[#005bb5] transition disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: Color.MainColor }}
              >
                {isLoading ? "Đăng nhập..." : "Đăng nhập"}
              </Button>

              {/* Sign in with Google Button */}
              <Button
                type="button"
                onClick={handleLoginWithGoogle}
                variant="outline"
                className="w-full flex items-center justify-center gap-3 border border-gray-300 hover:bg-gray-100 transition mt-3 py-3 rounded-md font-semibold"
                disabled={isLoading}
              >
                {/* Google Logo SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 533.5 544.3"
                  className="w-5 h-5"
                  fill="none"
                >
                  <path
                    d="M533.5 278.4c0-18.6-1.5-37.5-4.7-55.4H272.1v104.9h147.5c-6.4 34.4-26.4 63.5-56.5 83v68h91.5c53.5-49.2 84.9-121.8 84.9-200.5z"
                    fill="#4285F4"
                  />
                  <path
                    d="M272.1 544.3c76.7 0 141.2-25.4 188.2-68.8l-91.5-68c-25.4 17-58 27.2-96.7 27.2-74.3 0-137.4-50.1-159.8-117.4h-94v73.8c46.6 92.5 142.6 153.2 253.8 153.2z"
                    fill="#34A853"
                  />
                  <path
                    d="M112.3 322.3c-11.5-34.2-11.5-70.7 0-104.9v-73.8h-94c-38.7 75.3-38.7 164.6 0 239.9l94-61.2z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M272.1 107.7c40.6-.6 79.8 14.5 109.3 42.9l82-82.3C405 24.9 342 0 272.1 0 160.9 0 64.9 60.7 18.3 153.2l94 73.8c22.4-67.3 85.5-117.4 159.8-119.3z"
                    fill="#EA4335"
                  />
                </svg>
                Đăng nhập với Google
              </Button>

              <div className="flex justify-between text-sm">
                <a
                  href="/"
                  className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition"
                >
                  <FaArrowLeft className="w-4 h-4 mr-1" />
                  Trở về trang chủ
                </a>
                <a
                  href="#"
                  className="text-indigo-600 hover:text-indigo-800 transition"
                >
                  Quên mật khẩu?
                </a>
              </div>
            </form>
          )}
        </Form>
      </div>
    </div>
  );
}

export default function Page() {
  return <LoginForm />;
}
