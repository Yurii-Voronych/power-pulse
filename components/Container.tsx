interface containerProps {
  className?: string;
  children: React.ReactNode;
}
export default function Container({ children, className }: containerProps) {
  return (
    <div
      className={`
        ${className}
        w-full
        max-w-312     
        mx-auto
        px-5           
        md:px-8       
        xl:px-0 
      `}
    >
      {children}
    </div>
  );
}
