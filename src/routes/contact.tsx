import { HeadingOne } from "@/components/ui/typography";
import { ContactForm } from "@/modules/contact/contact-form";

export function Contact() {
  return (
    <div className="flex flex-col items-center">
      <HeadingOne className="text-center p-2">Contact</HeadingOne>
      <ContactForm />
    </div>
  );
}
