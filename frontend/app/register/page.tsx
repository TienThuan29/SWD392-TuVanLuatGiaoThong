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
import { toast } from "sonner";
import { Color } from "@/configs/CssConstant";
import { FaArrowLeft } from "react-icons/fa";

const formSchema = z.object({
  username: z.string().min(3, {
    message: "Tên người dùng phải có ít nhất 3 ký tự.",
  }),
  email: z.string().email({
    message: "Email không hợp lệ.",
  }),
  password: z.string().min(8, {
    message: "Mật khẩu phải có ít nhất 8 ký tự.",
  }),
  repeatPassword: z.string().min(8, {
    message: "Vui lòng nhập lại mật khẩu.",
  }),
  fullname: z.string().min(1, {
    message: "Họ tên không được để trống.",
  }),
});

function RegisterForm() {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
      repeatPassword: "",
      fullname: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  // Use form.handleSubmit for proper validation and submission
  const handleRegister = form.handleSubmit(async (data) => {
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
      //   await loginUser(data.username, data.password);
      setSubmitted(true);
    } catch (ex) {
      console.error(ex);
      toast.error("Register failed");
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100 px-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-8">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-900">
          Đăng ký tài khoản
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
            <form className="space-y-6" onSubmit={handleRegister} noValidate>
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email của bạn"
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
                name="fullname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">
                      Họ và tên
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Họ và tên của bạn"
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

              <FormField
                control={form.control}
                name="repeatPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">
                      Nhập lại mật khẩu
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

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-maincolor text-white font-semibold py-3 rounded-md shadow-md hover:bg-[#005bb5] transition disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: Color.MainColor }}
              >
                {isLoading ? "Đăng ký..." : "Đăng ký"}
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
                  href="/login"
                  className="text-indigo-600 hover:text-indigo-800 transition"
                >
                  Đã có tài khoản? Đăng nhập
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
  return <RegisterForm />;
}
