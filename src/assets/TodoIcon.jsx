const TodoIcon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-label="Todo"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M8 13A5 5 0 1 0 8 3a5 5 0 0 0 0 10Zm0 2A7 7 0 1 0 8 1a7 7 0 0 0 0 14Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default TodoIcon;
