type WarningIconProps = {
  className?: string;
};

export function WarningIcon({ className }: WarningIconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="12" cy="12" r="12" fill="#EFA082" />
      <path
        d="M12 19V19.01M12 15V5"
        stroke="#EFEDE8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
