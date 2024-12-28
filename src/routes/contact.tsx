import { HeadingOne } from "@/components/ui/typography";
import { ContactForm } from "@/modules/contact/contact-form";

export function ContactRoute() {
  return (
    <div className="flex flex-col items-center space-y-4">
      <HeadingOne>Contact</HeadingOne>
      <p>Demonstrate the use of React Hook Form and Zod validation library.</p>
      <ContactForm />
    </div>
  );
}
