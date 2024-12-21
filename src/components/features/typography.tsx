export function HeadingOne({ children }: { children: React.ReactNode }) {
  return <h1 className="text-4xl font-bold">{children}</h1>;
}

export function HeadingTwo({ children }: { children: React.ReactNode }) {
  return <h2 className="text-3xl font-bold">{children}</h2>;
}
