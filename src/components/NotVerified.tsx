import { useGenerateVerifyEmailTokenMutation } from "@/lib/redux/api/auth/authApi";
import { useAppSelector } from "@/lib/redux/hooks";
import { toast } from "sonner";
import { Button } from "./ui/button";

const NotVerified = () => {
  const [generateVerifyEmailToken, { isLoading }] =
    useGenerateVerifyEmailTokenMutation();
  const user = useAppSelector((state) => state.auth.user);

  const verifyEmailHandler = async () => {
    const email = user?.email;
    try {
      const res = await generateVerifyEmailToken({ email }).unwrap();
      if (res.success) {
        toast.success(res.message);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <>
      <div className="h-[85vh] flex flex-col items-center justify-center">
        <p className="text-2xl font-semibold mb-10">
          Please verify your email before accessing this page.
        </p>
        <Button
          onClick={verifyEmailHandler}
          className="text-sm px-12 py-6 rounded-sm bg-[#041340] hover:bg-[#041340]"
        >
          {isLoading ? "Verifying..." : "Verify Email"}
        </Button>
      </div>
    </>
  );
};

export default NotVerified;
