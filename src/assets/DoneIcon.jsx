const DoneIcon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-label="Done"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm3.173-9.015a.5.5 0 0 0-.772-.636l-3.45 4.183L5.612 7.8a.5.5 0 1 0-.792.612l1.725 2.228a.5.5 0 0 0 .781.013l3.848-4.667Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default DoneIcon;
