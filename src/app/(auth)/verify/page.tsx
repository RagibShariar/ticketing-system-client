/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useVerifyLoginMutation } from "@/lib/redux/api/auth/authApi";
import { setUser, TUser } from "@/lib/redux/features/authSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const VerifyOtpPage = () => {
  const email = localStorage.getItem("userEmail");
  const [verifyLogin] = useVerifyLoginMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleOTP = async (e: any) => {
    e.preventDefault();
    const otp = e.target.otp.value;
    const toastId = toast.loading("Logging in...");
    const verifyInfo = {
      email,
      otp,
    };

    try {
      const res = await verifyLogin(verifyInfo).unwrap();
      const user = jwtDecode(res.token) as TUser;

      console.log(res?.data);

      dispatch(setUser({ user: user, token: res.token, userInfo: res?.data }));
      toast.success("Login Successful", { id: toastId, duration: 2000 });
      router.push("/");
      localStorage.removeItem("userEmail");
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong", {
        id: toastId,
      });
    }
  };

  return (
    <section className="lg:max-w-7xl h-[85vh] mx-auto  flex flex-col items-center justify-center">
      <Card className="w-full max-w-sm shadow-2xl">
        <form onSubmit={handleOTP}>
          <CardHeader>
            <CardTitle className="text-2xl">Verify OTP </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Enter OTP</Label>
              <Input
                className="text-lg  tracking-widest"
                name="otp"
                type="text"
                placeholder="Your OTP here"
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full ">
              Verify
            </Button>
          </CardFooter>
        </form>
      </Card>
    </section>
  );
};

export default VerifyOtpPage;
