type PlayIconProps = {
  className?: string;
};

export function PlayIcon({ className }: PlayIconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M15 8.66028L0 17.3205L0 2.38419e-05L15 8.66028Z"
        fill="#EFEDE8"
      />
    </svg>
  );
}
