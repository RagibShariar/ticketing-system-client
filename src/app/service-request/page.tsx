/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
// components/ContactForm.js
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCreateRequestMutation } from "@/lib/redux/api/service-request/serviceRequestApi";
import {
  useGetEmailSuggestionsQuery,
  useLazyGetUserDetailsQuery,
} from "@/lib/redux/api/user/userApi";
import { useCurrentToken } from "@/lib/redux/features/authSlice";
import { useAppSelector } from "@/lib/redux/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";

const ContactForm = () => {
  const { register, handleSubmit, setValue } = useForm();
  const [createRequest] = useCreateRequestMutation();
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const userInfo = useAppSelector((state) => state.auth.userInfo);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const router = useRouter();
  const token = useAppSelector(useCurrentToken);
  const [suggestions, setSuggestions] = useState([]);
  const [triggerGetUserDetails] = useLazyGetUserDetailsQuery();
  const [email, setEmail] = useState("");

  const { data: emailSuggestions } = useGetEmailSuggestionsQuery(email, {
    skip: !email,
  });

  const handleEmailChange = (event: { target: { value: any } }) => {
    const email = event.target.value;
    setEmail(email);
    if (email) {
      // Fetch suggestions based on the email input
      setSuggestions(emailSuggestions || []);
    } else {
      setSuggestions([]);
    }
  };

  const handleEmailSelect = (selectedEmail: never) => {
    setValue("email", selectedEmail);
    setSuggestions([]);
    triggerGetUserDetails(selectedEmail).then((response) => {
      if (response.data) {
        const { name, companyName, designation } = response.data;
        setValue("name", name);
        setValue("companyName", companyName);
        setValue("designation", designation);
      }
    });
  };

  const handleFormSubmit = async (data: FieldValues) => {
    const submitData = new FormData();

    submitData.append("name", data.name);
    submitData.append("email", data.email);
    submitData.append("subject", data.subject);
    submitData.append("message", data.message);
    submitData.append("requestType", data.requestType);
    submitData.append("companyName", data.companyName);
    submitData.append("designation", data.designation);

    // Append image file if it exists
    if (data.image && data.image.length > 0) {
      submitData.append("image", data.image[0]); // Get the first image file
    }

    // console.log(submitData); // Debugging

    if (!captchaVerified) {
      toast.warning("Please verify that you are not a robot.");
      return;
    }
    // console.log("Form data submitted:", submitData);
    // Handle form submission logic here (e.g., send to server)
    const toastId = toast.loading("Sending data...");
    try {
      const res = await createRequest(submitData);
      // console.log(res.error);
      if (res?.data?.success) {
        toast.success(res?.data?.message, { id: toastId, duration: 1000 });
        router.push("/message-sent-success"); // Redirect to the success page
      } else {
        toast.error(`"${data.email}" is not registered`, {
          id: toastId,
          duration: 1000,
        });
      }

      if (!token) {
        toast.warning("Please login to access this page");
        router.replace("/login");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message || "Something went wrong", {
        id: toastId,
      });
    }
  };

  const onCaptchaChange = (value: any) => {
    setCaptchaVerified(!!value);
  };

  // Handle file input change and set image preview
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string); // Set the image preview URL
      };
      reader.readAsDataURL(file); // Read the image file as a data URL
    } else {
      setImagePreview(null); // Clear preview if no file is selected
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="my-20 space-y-5 max-w-5xl mx-auto px-4"
    >
      <h2 className="text-2xl font-bold">Create a new Service Request.</h2>
      <p>We would love to hear from you.</p>

      <div className="flex justify-center items-center  gap-6">
        <div className="w-full">
          <Label htmlFor="name">
            Name <span className="text-red-500">*</span>
          </Label>
          <Input
            className="text-md py-6 rounded-none shadow-none  border-gray-400"
            type="text"
            id="name"
            value={userInfo?.role === "user" ? userInfo?.name : undefined}
            {...register("name", { required: true })}
          />
        </div>

        <div className="w-full relative">
          <Label htmlFor="email">
            Email <span className="text-red-500">*</span>
          </Label>
          <Input
            className=" text-md py-6 rounded-none shadow-none  border-gray-400"
            type="email"
            id="email"
            value={userInfo?.role === "user" ? userInfo?.email : undefined}
            {...register("email", { required: true })}
            onChange={handleEmailChange}
          />
          {suggestions.length > 0 && (
            <ul className="suggestions-list absolute bg-white w-full  border cursor-pointer z-50">
              {suggestions.map((email) => (
                <li
                  key={email}
                  onClick={() => handleEmailSelect(email)}
                  className="py-2 px-3 border border-gray-400 bg-blue-200 hover:bg-gray-200"
                >
                  {email}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="flex justify-center items-center  gap-6">
        <div className="w-full">
          <Label htmlFor="companyName">
            Company Name <span className="text-red-500">*</span>
          </Label>
          <Input
            className="text-md py-6 rounded-none shadow-none  border-gray-400"
            type="text"
            id="companyName"
            value={
              userInfo?.role === "user" ? userInfo?.companyName : undefined
            }
            {...register("companyName", { required: true })}
          />
        </div>

        <div className="w-full">
          <Label htmlFor="designation">
            Designation <span className="text-red-500">*</span>
          </Label>
          <Input
            className="text-md py-6 rounded-none shadow-none  border-gray-400"
            type="text"
            id="designation"
            value={
              userInfo?.role === "user" ? userInfo?.designation : undefined
            }
            {...register("designation", { required: true })}
          />
        </div>
      </div>

      <div className="flex gap-6 items-center justify-center">
        <div className="w-full">
          <Label htmlFor="subject">
            Subject <span className="text-red-500">*</span>
          </Label>
          <Input
            className="text-md py-6 rounded-none shadow-none border-gray-400"
            type="text"
            id="subject"
            {...register("subject", { required: true })}
            required
          />
        </div>

        <div className="w-full">
          <Label htmlFor="requestType">
            Request Type <span className="text-red-500">*</span>
          </Label>

          <Select
            required
            {...register("requestType", { required: true })}
            onValueChange={(value) => setValue("requestType", value)}
          >
            <SelectTrigger
              id="requestType"
              className="w-full py-6 text-md  rounded-none shadow-none  border-gray-400"
            >
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Request Type</SelectLabel>
                <SelectItem className="py-3 text-md" value="incident">
                  Incident
                </SelectItem>
                <SelectItem className="py-3 text-md" value="request">
                  Request
                </SelectItem>
                <SelectItem className="py-3 text-md" value="change">
                  Change
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="message">
          Your Message <span className="text-red-500">*</span>
        </Label>
        <Textarea
          className="h-[150px] shadow-none rounded-none  border-gray-400"
          id="message"
          {...register("message", { required: true })}
          required
        />
      </div>

      <div className="grid w-full  items-center gap-1.5 ">
        <Label htmlFor="image">Picture</Label>
        <Input
          {...register("image")}
          className="grid w-full items-center gap-1.5 shadow-none rounded-none  border-gray-400 "
          id="image"
          type="file"
          accept="image/*" // Restrict file input to images only
          onChange={handleImageChange} // Handle file change to show preview
        />
        {/* Image Preview */}
        {imagePreview && (
          <div className="mt-4">
            <p>Image Preview:</p>
            <Image
              src={imagePreview}
              alt="Preview"
              width={500}
              height={200}
              className="h-40 w-40 object-cover"
            />
          </div>
        )}
      </div>

      <div>
        <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_SITE_KEY as string} // Replace with your actual site key
          onChange={onCaptchaChange}
        />
      </div>

      <Button
        type="submit"
        className="bg-[#041340] rounded-sm py-3 px-6 text-white"
      >
        Send Message
      </Button>
    </form>
  );
};

export default ContactForm;
