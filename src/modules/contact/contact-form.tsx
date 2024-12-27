import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { isValidPhoneNumber } from "libphonenumber-js";
import { AlertError } from "@/components/ui/alert";

const phoneSchema = z
  .string()
  .refine((value) => isValidPhoneNumber(value), {
    message: "Invalid phone number format",
  })
  .or(z.literal(""));

const contactFormSchema = z.object({
  firstName: z.string().nonempty({ message: "First name is required" }),
  lastName: z.string().nonempty({ message: "Last name is required" }),
  email: z
    .string()
    .email({ message: "Please type a valid email address" })
    .optional()
    .or(z.literal("")),
  phone: phoneSchema,
  textMessage: z.string().nonempty(),
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
  });

  return (
    <div>
      <form onSubmit={onSubmit} className="flex flex-col gap-2 max-w-md ">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            {...register("firstName")}
            id="firstName"
            type="text"
            placeholder="John"
          />
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

        <div>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
}
