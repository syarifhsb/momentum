import { isValidPhoneNumber } from "libphonenumber-js";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertError } from "@/components/ui/alert";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const phoneSchema = z
  .string()
  .refine((value) => isValidPhoneNumber(value), {
    message: "Invalid phone number format",
  })
  .or(z.literal(""));

const contactFormSchema = z
  .object({
    firstName: z.string().nonempty({ message: "First name is required" }),
    lastName: z.string().nonempty({ message: "Last name is required" }),
    email: z
      .string()
      .email({ message: "Please type a valid email address" })
      .or(z.literal("")),
    phone: phoneSchema,
    textMessage: z.string().nonempty(),
  })
  .superRefine((data, ctx) => {
    if (data.email.length == 0 && data.phone.length == 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Email or phone number is required",
        path: ["email"],
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Email or phone number is required",
        path: ["phone"],
      });
    }
  });

type ContactFormSchema = z.infer<typeof contactFormSchema>;

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormSchema>({ resolver: zodResolver(contactFormSchema) });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    toast.message("Form submitted", {
      description: (
        <div>
          <p>First name: {data.firstName}</p>
          <p>Last name: {data.lastName}</p>
          <p>Email: {data.email}</p>
          <p>Phone: {data.phone}</p>
          <p>Message: {data.textMessage}</p>
        </div>
      ),
    });
  });

  console.log(errors);
  return (
    <div className="w-full max-w-md">
      <form onSubmit={onSubmit} className="flex flex-col gap-2 max-w-md">
        <div className="space-y-2">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              {...register("firstName")}
              id="firstName"
              type="text"
              placeholder="John"
            />
            {errors.firstName && (
              <AlertError message={errors.firstName.message} />
            )}
          </div>

          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              {...register("lastName")}
              id="lastName"
              type="text"
              placeholder="Doe"
            />
            {errors.lastName && (
              <AlertError message={errors.lastName.message} />
            )}
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              {...register("email")}
              id="email"
              placeholder="john@doe.com"
            />
            {errors.email && <AlertError message={errors.email.message} />}
          </div>

          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              {...register("phone")}
              id="phone"
              type="tel"
              placeholder="+1234567890"
            />
            {errors.phone && <AlertError message={errors.phone.message} />}
          </div>

          <div>
            <Label htmlFor="textMessage">Message</Label>
            <Textarea
              {...register("textMessage")}
              id="textMessage"
              rows={5}
              cols={30}
            />
            {errors.textMessage && (
              <AlertError message={errors.textMessage.message} />
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
}
