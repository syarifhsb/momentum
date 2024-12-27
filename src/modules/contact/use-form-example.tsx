import { FieldValues, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function UseFormExample() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: FieldValues) => console.log(data);
  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="text"
        placeholder="First name"
        {...register("First name", { required: true, maxLength: 80 })}
      />
      {/* <Input
        type="text"
        placeholder="Last name"
        {...register("Last name", { required: true, maxLength: 100 })}
      />
      <Input
        type="text"
        placeholder="Email"
        {...register("Email", { pattern: /^\S+@\S+$/i })}
      />
      <Input
        type="tel"
        placeholder="Mobile number"
        {...register("Mobile number", {
          required: true,
          minLength: 6,
          maxLength: 12,
        })}
      />
      <select {...register("Title", { required: true })}>
        <option value="Mr">Mr</option>
        <option value="Mrs">Mrs</option>
        <option value="Miss">Miss</option>
        <option value="Dr">Dr</option>
      </select>

      <Input
        {...register("Developer", { required: true })}
        type="radio"
        value="Yes"
      />
      <Input
        {...register("Developer", { required: true })}
        type="radio"
        value="No"
      /> */}

      <Button type="submit">Submit </Button>
    </form>
  );
}
