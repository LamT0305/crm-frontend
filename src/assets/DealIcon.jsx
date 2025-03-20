const DealIcon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-label="Deal"
    >
      <path
        fill="currentColor"
        d="M3 6L6 9L8 7L10 9L13 6M2 6L6 10L8 8L10 10L14 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DealIcon;
