import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { FieldValues, useForm } from "react-hook-form";

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (values: FieldValues) => {
    console.log(values);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 max-w-md "
      >
        <Label htmlFor="firstName">First Name</Label>
        <Input
          {...register("firstName", { required: "First Name is required." })}
          type="text"
          placeholder="John"
        />
        <p className="text-red-500">
          {errors.firstName ? errors.firstName?.message?.toString() : ""}
        </p>

        <Label htmlFor="lastName">Last Name</Label>
        <Input
          {...register("lastName", { required: "Last Name is required." })}
          type="text"
          placeholder="Doe"
        />
        <p className="text-red-500">
          {errors.lastName ? errors.lastName?.message?.toString() : ""}
        </p>

        <Label htmlFor="email">Email</Label>
        <Input
          {...register("email", {
            required: "Email is required.",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
          })}
          placeholder="john@doe.com"
        />
        <p className="text-red-500">
          {errors.email ? errors.email?.message?.toString() : ""}
        </p>

        <Label htmlFor="message">Message</Label>
        <Textarea
          {...register("message", { required: "Message is required." })}
          rows={5}
          cols={30}
        />
        <p className="text-red-500">
          {errors.message ? errors.message?.message?.toString() : ""}
        </p>

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
