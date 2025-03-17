const InProgressIcon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-label="In Progress"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm0-1.75a5.25 5.25 0 1 1 0-10.5 5.25 5.25 0 0 1 0 10.5Zm2.828-2.422A4 4 0 0 1 8 12V4a4 4 0 0 1 2.828 6.828Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default InProgressIcon;
