export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="
  w-full
  max-w-312
  mx-auto
  px-5
  md:px-8
  2xl:px-0
  "
    >
      {children}
    </div>
  );
}
