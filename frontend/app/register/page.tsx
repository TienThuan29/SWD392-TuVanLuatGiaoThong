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
import useAxios from "@/hooks/useAxios";
import { Api } from "@/configs/Api";
import HttpStatus from "@/configs/HttpStatus";
import { useRouter } from "next/navigation";
import axios from "axios";

const formSchema = z.object({
  username: z.string().min(3, {
    message: "Tên người dùng phải có ít nhất 3 ký tự.",
  }),
  email: z.string().email({
    message: "Email không hợp lệ.",
  }),
  password: z.string().min(5, {
    message: "Mật khẩu phải có ít nhất 5 ký tự.",
  }),
  repeatPassword: z.string().min(5, {
    message: "Vui lòng nhập lại mật khẩu.",
  }),
  fullname: z.string().min(1, {
    message: "Họ tên không được để trống.",
  }),
});

function RegisterForm() {

  const router = useRouter();

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
      const response = await axios.post(Api.BASE_API + Api.Authenticaion.REGISTER, {
        username: data.username,
        email: data.email,
        password: data.password,
        fullname: data.fullname
      })
      if (response.status == HttpStatus.OK && response.data.status == 'success') {
        toast.success("Mã OTP đã được gửi đến email của bạn, vui lòng kiểm tra và xác thực email");
        router.push(`/register/verify-email?email=${encodeURIComponent(data.email)}`);
      }
      else if (response.status == HttpStatus.OK && response.data.status == 'fail') {
        toast.error(response.data.message)
      }
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
          {
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
          }
        </Form>
      </div>
    </div>
  );
}

export default function Page() {
  return <RegisterForm />;
}
