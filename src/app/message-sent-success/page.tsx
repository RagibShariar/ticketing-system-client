// pages/message-sent-success.tsx
import contactImg from "@/assets/contact.svg";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function MessageSentSuccess() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-10rem)]">
      <Image src={contactImg} alt="contact" width={300} height={300} />

      <h1 className="text-3xl font-bold my-4">Message Sent Successfully!</h1>
      <p className="my-3">We will get back to you shortly.</p>
      <Button>
        <Link href="/">Back to Dashboard</Link>
      </Button>
    </div>
  );
}
