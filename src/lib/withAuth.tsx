/* eslint-disable @typescript-eslint/no-explicit-any */
// hoc/withAuth.tsx
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { useCurrentToken } from "../lib/redux/features/authSlice";
import { useAppSelector } from "../lib/redux/hooks"; // Adjust based on your Redux setup

const withAuth = (WrappedComponent: React.ComponentType) => {
  const AuthComponent = (props: any) => {
    const router = useRouter();
    const token = useAppSelector(useCurrentToken);

    useEffect(() => {
      // If no token is found, redirect to login
      if (!token) {
        toast.warning("Please login to access this page");
        router.replace("/login");
      }
    }, [token, router]);

    // If the token is not available, return null to prevent rendering the protected component
    if (!token) {
      return null; // Or you could render a loading spinner
    }

    // Render the wrapped component once the token is verified
    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
