import { createSlice } from "@reduxjs/toolkit";

const data = [
  {
    _id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@email.com",
    phone: "123-456-7890",
    companyName: "Tech Solutions",
    industry: "Software",
    website: "www.techsolutions.com",
    territory: "North America",
    numberOfEmployees: 150,
    sourceName: "123 Main St, New York, NY",
  },
  {
    _id: 2,
    name: "Bob Smith",
    email: "bob.smith@email.com",
    phone: "987-654-3210",
    companyName: "Creative Designs",
    industry: "Design",
    website: "www.creativedesigns.com",
    territory: "Europe",
    numberOfEmployees: 75,
    sourceName: "45 Elm St, London, UK",
  },
  {
    _id: 3,
    name: "Charlie Brown",
    email: "charlie.brown@email.com",
    phone: "555-123-4567",
    companyName: "Finance Experts",
    industry: "Finance",
    website: "www.financeexperts.com",
    territory: "Asia",
    numberOfEmployees: 200,
    sourceName: "78 Maple St, Tokyo, Japan",
  },
  {
    _id: 4,
    name: "Diana Prince",
    email: "diana.prince@email.com",
    phone: "321-654-9870",
    companyName: "Marketing Gurus",
    industry: "Marketing",
    website: "www.marketinggurus.com",
    territory: "South America",
    numberOfEmployees: 120,
    sourceName: "22 King St, São Paulo, Brazil",
  },
  {
    _id: 5,
    name: "Edward Norton",
    email: "edward.norton@email.com",
    phone: "444-888-9999",
    companyName: "Eco Innovations",
    industry: "Renewable Energy",
    website: "www.ecoinnovations.com",
    territory: "Australia",
    numberOfEmployees: 60,
    sourceName: "99 Green St, Sydney, Australia",
  },
  {
    _id: 6,
    name: "Fiona Davis",
    email: "fiona.davis@email.com",
    phone: "222-333-4444",
    companyName: "Health Plus",
    industry: "Healthcare",
    website: "www.healthplus.com",
    territory: "Africa",
    numberOfEmployees: 90,
    sourceName: "10 Wellness St, Cape Town, South Africa",
  },
  {
    _id: 7,
    name: "George Miller",
    email: "george.miller@email.com",
    phone: "111-222-3333",
    companyName: "Legal Partners",
    industry: "Law",
    website: "www.legalpartners.com",
    territory: "North America",
    numberOfEmployees: 50,
    sourceName: "77 Justice St, Los Angeles, CA",
  },
  {
    _id: 8,
    name: "Hannah White",
    email: "hannah.white@email.com",
    phone: "999-888-7777",
    companyName: "Fashion World",
    industry: "Fashion",
    website: "www.fashionworld.com",
    territory: "Europe",
    numberOfEmployees: 180,
    sourceName: "56 Trendy St, Milan, Italy",
  },
  {
    _id: 9,
    name: "Ian Black",
    email: "ian.black@email.com",
    phone: "666-555-4444",
    companyName: "Automotive Tech",
    industry: "Automotive",
    website: "www.autotech.com",
    territory: "Asia",
    numberOfEmployees: 300,
    sourceName: "33 Drive St, Seoul, South Korea",
  },
  {
    _id: 10,
    name: "Jane Doe",
    email: "jane.doe@email.com",
    phone: "777-999-8888",
    companyName: "E-commerce Hub",
    industry: "E-commerce",
    website: "www.ecommercehub.com",
    territory: "Global",
    numberOfEmployees: 500,
    sourceName: "101 Online St, Singapore",
  },
];

const initialState = {
  leads: [],
  filteredLeads: [],
  totalPages: 0,
  isLoading: false,
};

const leadSlice = createSlice({
  name: "lead",
  initialState,
  reducers: {
    setLeads: (state, action) => {
      state.leads = action.payload;
      state.filteredLeads = action.payload;
    },
    sortLead: (state, action) => {
      const { field, order } = action.payload; // order can be 'asc' or 'desc'

      if (!field) {
        console.error("Invalid payload in sortLead:", action.payload);
        return;
      }

      const compareFunction = (a, b) => {
        if (typeof a[field] === "string" && typeof b[field] === "string") {
          return order === "asc"
            ? a[field].localeCompare(b[field])
            : b[field].localeCompare(a[field]);
        }
        if (typeof a[field] === "number" && typeof b[field] === "number") {
          return order === "asc" ? a[field] - b[field] : b[field] - a[field];
        }
        return 0;
      };

      state.filteredLeads = [...state.filteredLeads].sort(compareFunction);
    },

    filterLead: (state, action) => {
      if (
        !action.payload ||
        !action.payload.field ||
        action.payload.value === undefined
      ) {
        console.error("Invalid payload in filterLead:", action.payload);
        return;
      }

      const { field, value } = action.payload;

      if (!value || value.length === 0) {
        state.filteredLeads = state.leads;
        return;
      }

      state.filteredLeads = state.leads.filter((lead) => {
        return (
          lead[field] && lead[field].toLowerCase().includes(value.toLowerCase())
        );
      });
    },
    searchLeads: (state, action) => {
      const { field, value } = action.payload;
      state.filteredLeads = state.leads.filter((lead) =>
        lead[field].toLowerCase().includes(value.toLowerCase())
      );
    },
    addNewLead: (state, action) => {
      state.leads.unshift(action.payload);
      state.filteredLeads = [...state.leads];
    },
  },
});

export const { setLeads, sortLead, filterLead, searchLeads, addNewLead } =
  leadSlice.actions;
export default leadSlice.reducer;
