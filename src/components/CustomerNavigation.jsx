function CustomerNavigation({ tagName, setTagName }) {
  const navItems = [
    { id: "activity", label: "Activities" },
    { id: "email", label: "Emails" },
    { id: "comment", label: "Comments" },
    { id: "data", label: "Data" },
    { id: "task", label: "Tasks" },
    { id: "note", label: "Notes" },
    { id: "customer_care", label: "Customer Care" },
    { id: "deal", label: "Deals" },
  ];

  return (
    <nav className="w-full border-b border-gray-200">
      <ul className="flex items-center gap-2 px-6 bg-white">
        {navItems.map(({ id, label }) => (
          <li key={id}>
            <button
              onClick={() => setTagName(id)}
              className={`px-5 py-4 font-medium transition-colors duration-200
                ${
                  tagName === id
                    ? "text-blue-600 border-b-2 border-blue-600 -mb-px"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default CustomerNavigation;
