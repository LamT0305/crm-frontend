const WorkspaceIcon = ({ className }) => {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 32 32"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M16,17v8H6V17H16m0-2H6a2,2,0,0,0-2,2v8a2,2,0,0,0,2,2H16a2,2,0,0,0,2-2V17a2,2,0,0,0-2-2Z" />
      <path d="M27,6v5H17V6H27m0-2H17a2,2,0,0,0-2,2v5a2,2,0,0,0,2,2H27a2,2,0,0,0,2-2V6a2,2,0,0,0-2-2Z" />
      <path d="M27,17v5H22V17h5m0-2H22a2,2,0,0,0-2,2v5a2,2,0,0,0,2,2h5a2,2,0,0,0,2-2V17a2,2,0,0,0-2-2Z" />
      <path d="M11,6v5H6V6h5m0-2H6A2,2,0,0,0,4,6v5a2,2,0,0,0,2,2h5a2,2,0,0,0,2-2V6a2,2,0,0,0-2-2Z" />
    </svg>
  );
};

export default WorkspaceIcon;
