import { HeadingOne } from "@/components/ui/typography";
import { ContactForm } from "@/modules/contact/contact-form";

export function ContactRoute() {
  return (
    <div className="flex flex-col items-center">
      <HeadingOne>Contact</HeadingOne>
      <ContactForm />
    </div>
  );
}
