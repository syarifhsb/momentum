import { cn } from "@/lib/utils";

type HeadingProps = {
  children: React.ReactNode;
  className?: string;
};

export function HeadingOne({ children, className }: HeadingProps) {
  return <h1 className={cn("text-4xl font-bold", className)}>{children}</h1>;
}
