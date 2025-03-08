import { useDispatch, useSelector } from "react-redux";
import {
  setLeads,
  sortLead,
  filterLead,
  searchLeads,
  addNewLead,
} from "../redux/slice/LeadSlice";

const data = [
  {
    id: 1,
    lastName: "Doe",
    firstName: "John",
    email: "john1@example.com",
    phone: "1234567891",
    gender: "Male",
    monthlyIncome: "3500",
    source: "Referral",
    industry: "IT",
  },
  {
    id: 2,
    lastName: "Smith",
    firstName: "Jane",
    email: "jane2@example.com",
    phone: "1234567892",
    gender: "Female",
    monthlyIncome: "4000",
    source: "Social Media",
    industry: "Marketing",
  },
  {
    id: 3,
    lastName: "Brown",
    firstName: "Michael",
    email: "michael3@example.com",
    phone: "1234567893",
    gender: "Male",
    monthlyIncome: "4500",
    source: "Website",
    industry: "Finance",
  },
  {
    id: 4,
    lastName: "Johnson",
    firstName: "Emily",
    email: "emily4@example.com",
    phone: "1234567894",
    gender: "Female",
    monthlyIncome: "3200",
    source: "Advertisement",
    industry: "Education",
  },
  {
    id: 5,
    lastName: "Davis",
    firstName: "Chris",
    email: "chris5@example.com",
    phone: "1234567895",
    gender: "Male",
    monthlyIncome: "5000",
    source: "Networking",
    industry: "Healthcare",
  },
  {
    id: 6,
    lastName: "Martinez",
    firstName: "Sophia",
    email: "sophia6@example.com",
    phone: "1234567896",
    gender: "Female",
    monthlyIncome: "3800",
    source: "Referral",
    industry: "Retail",
  },
  {
    id: 7,
    lastName: "Anderson",
    firstName: "David",
    email: "david7@example.com",
    phone: "1234567897",
    gender: "Male",
    monthlyIncome: "4300",
    source: "Cold Call",
    industry: "Real Estate",
  },
  {
    id: 8,
    lastName: "Taylor",
    firstName: "Olivia",
    email: "olivia8@example.com",
    phone: "1234567898",
    gender: "Female",
    monthlyIncome: "4700",
    source: "Email Campaign",
    industry: "Hospitality",
  },
  {
    id: 9,
    lastName: "Wilson",
    firstName: "Ethan",
    email: "ethan9@example.com",
    phone: "1234567899",
    gender: "Male",
    monthlyIncome: "5200",
    source: "Event",
    industry: "Automotive",
  },
  {
    id: 10,
    lastName: "Moore",
    firstName: "Ava",
    email: "ava10@example.com",
    phone: "1234567890",
    gender: "Female",
    monthlyIncome: "3600",
    source: "Website",
    industry: "Fashion",
  },
];

const useLead = () => {
  const { filteredLeads, isLoading } = useSelector((state) => state.lead);
  const dispatch = useDispatch();

  const handleSetLeads = () => {
    try {
      dispatch(setLeads(data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilterleads = async (field, value) => {
    try {
      if (!field || value === undefined) {
        return;
      }

      dispatch(filterLead({ field, value }));
    } catch (error) {
      console.error("Error in handleFilterleads:", error);
    }
  };

  const handleSortLeads = async (field, order) => {
    try {
      if (!field || order === undefined) {
        return;
      }

      dispatch(sortLead({ field, order }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchLead = (field, value) => {
    try {
      const payload = {
        field,
        value,
      };
      dispatch(searchLeads(payload));
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddNewLead = async (lead) => {
    try {
      if (!lead) {
        return;
      }

      dispatch(addNewLead(lead));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    isLoading,
    leads: filteredLeads,
    handleSetLeads,
    handleFilterleads,
    handleSortLeads,
    handleSearchLead,
    handleAddNewLead,
  };
};

export default useLead;
