import React, { useEffect, useState } from "react";
import useLead from "../hooks/useLead";
import close from "../assets/closeBtn.png";

function LeadBody({ columns }) {
  const [data, setData] = useState([
    {
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
  ]);

  const { leads, handleSetLeads, handleDeleteLead } = useLead();

  useEffect(() => {
    handleSetLeads();
  }, []);
  return (
    <div>
      {/* Table */}
      <div className="overflow-x-auto px-5">
        <table className="table-auto border-collapse w-full  ">
          <thead>
            <tr className="bg-gray-100 text-gray-500 text-md font-thin">
              {columns.map((col) => (
                <th key={col.key} className="p-2 relative">
                  {col.value}
                </th>
              ))}
              <th className="p-2 relative">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((row, index) => (
              <tr key={index} className="border-b">
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="px-3 py-4 border-b border-gray-300 w-max whitespace-nowrap text-center"
                  >
                    {row[col.key] || "-"}
                  </td>
                ))}
                <td className="px-3 py-4 border-b border-gray-300 w-max whitespace-nowrap text-center mx-auto">
                  <div className="flex justify-center">
                    <img
                      onClick={() => handleDeleteLead(row.id)}
                      src={close}
                      alt=""
                      style={{ width: 25, height: 25 }}
                      className="bg-gray-300 p-1 rounded-md"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LeadBody;
