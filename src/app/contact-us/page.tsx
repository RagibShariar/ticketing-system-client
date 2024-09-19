/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
// components/ContactForm.js
import { Button } from "@/components/ui/button";
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
import withAuth from "@/lib/withAuth";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";

const ContactForm = () => {
  const { register, handleSubmit, setValue } = useForm();
  const [createRequest] = useCreateRequestMutation();

  // const [captchaVerified, setCaptchaVerified] = useState(false);

  // const handleChange = (e:any) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const handleFormSubmit = async (data: FieldValues) => {
    const submitData = {
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      requestType: data.requestType,
    };

    // if (!captchaVerified) {
    //   alert("Please verify that you are not a robot.");
    //   return;
    // }
    // console.log("Form data submitted:", submitData);
    // Handle form submission logic here (e.g., send to server)
    const toastId = toast.loading("Sending data...");
    try {
      const res = await createRequest(submitData);

      if (res?.data?.success) {
        toast.success(res?.data?.message, { id: toastId, duration: 1000 });
      }
    } catch (error: any) {
      // console.log(error);
      toast.error(error?.data?.message || "Something went wrong", {
        id: toastId,
      });
    }
  };

  // const onCaptchaChange = (value) => {
  //   setCaptchaVerified(!!value);
  // };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="my-20 space-y-5 max-w-5xl mx-auto "
    >
      <h2 className="text-2xl font-bold">Have any Project or Idea?</h2>
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
            {...register("name", { required: true })}
            required
          />
        </div>

        <div className="w-full">
          <Label htmlFor="email">
            Email <span className="text-red-500">*</span>
          </Label>
          <Input
            className="text-md py-6 rounded-none shadow-none  border-gray-400"
            type="email"
            id="email"
            {...register("email", { required: true })}
            required
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

      <div>
        {/* <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_SITE_KEY} // Replace with your actual site key
          onChange={onCaptchaChange}
        /> */}
      </div>

      <Button type="submit">Send Message</Button>
    </form>
  );
};

export default withAuth(ContactForm);
