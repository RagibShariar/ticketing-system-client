import { UserServiceRequests } from "@/components/userServiceRequests";

export default function Home() {
  return (
    <div className="grid items-center justify-items-center lg:px-12">
      {/* <h1>Home page</h1> */}
      <UserServiceRequests />
    </div>
  );
}
