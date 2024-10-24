/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGenerateVerifyEmailTokenMutation } from "@/lib/redux/api/auth/authApi";
import { toast } from "sonner";

const WelcomeCard = (props: any) => {
  const { name, email } = props.userData;
  const [generateVerifyEmailToken] = useGenerateVerifyEmailTokenMutation();

  const verifyEmailHandler = async () => {
    try {
      const toastId = toast.loading("Sending verification email...");
      const res = await generateVerifyEmailToken({ email }).unwrap();
      if (res.success) {
        toast.success(res.message, { id: toastId, duration: 2000 });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="max-w-5xl mx-auto my-10 lg:my-28 rounded-lg border px-10 py-14 bg-gray-100">
        <p className="text-2xl font-semibold mb-4">Activate Your Account</p>
        <div className="">
          <h2 className="text-4xl font-semibold mb-3">
            {" "}
            🎉 Welcome to Solar-ICT, <span>{name}</span>
          </h2>
          <p className="mb-6">
            Thanks for registering with Solar-ICT Support. You&apos;ll soon
            receive an email from us to activate your account. Please check your
            spam folder if it does not arrive in your inbox.
          </p>
          <p>
            Didn&apos;t receive the email?{" "}
            <span>
              <button
                onClick={verifyEmailHandler}
                className="underline text-blue-600 font-medium"
              >
                Resend activation email.
              </button>
            </span>{" "}
          </p>
        </div>
      </div>
    </>
  );
};

export default WelcomeCard;
