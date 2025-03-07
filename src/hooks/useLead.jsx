import { useDispatch, useSelector } from "react-redux";
import {
  setLeads,
  sortLead,
  filterLead,
  searchLeads,
} from "../redux/slice/LeadSlice";

const data = [
  {
    _id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@email.com",
    phone: "123-456-7890",
    sourceName: "123 Main St, New York, NY",
  },
  {
    _id: 2,
    name: "Bob Smith",
    email: "bob.smith@email.com",
    phone: "987-654-3210",
    sourceName: "45 Elm St, London, UK",
  },
  {
    _id: 3,
    name: "Charlie Brown",
    email: "charlie.brown@email.com",
    phone: "555-123-4567",
    sourceName: "78 Maple St, Tokyo, Japan",
  },
  {
    _id: 4,
    name: "Diana Prince",
    email: "diana.prince@email.com",
    phone: "321-654-9870",
    sourceName: "22 King St, São Paulo, Brazil",
  },
  {
    _id: 5,
    name: "Edward Norton",
    email: "edward.norton@email.com",
    phone: "444-888-9999",
    sourceName: "99 Green St, Sydney, Australia",
  },
  {
    _id: 6,
    name: "Fiona Davis",
    email: "fiona.davis@email.com",
    phone: "222-333-4444",
    sourceName: "10 Wellness St, Cape Town, South Africa",
  },
  {
    _id: 7,
    name: "George Miller",
    email: "george.miller@email.com",
    phone: "111-222-3333",
    sourceName: "77 Justice St, Los Angeles, CA",
  },
  {
    _id: 8,
    name: "Hannah White",
    email: "hannah.white@email.com",
    phone: "999-888-7777",
    sourceName: "56 Trendy St, Milan, Italy",
  },
  {
    _id: 9,
    name: "Ian Black",
    email: "ian.black@email.com",
    phone: "666-555-4444",
    sourceName: "33 Drive St, Seoul, South Korea",
  },
  {
    _id: 10,
    name: "Jane Doe",
    email: "jane.doe@email.com",
    phone: "777-999-8888",
    sourceName: "101 Online St, Singapore",
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

  return {
    isLoading,
    leads: filteredLeads,
    handleSetLeads,
    handleFilterleads,
    handleSortLeads,
    handleSearchLead,
  };
};

export default useLead;
