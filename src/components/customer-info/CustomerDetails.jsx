// import React, { useEffect } from "react";
// import userImg from "../assets/user.png";
// import useCustomer from "../../hooks/useCustomer";

// function CustomerDetails({ customerId }) {
//   const { handleGetCustomerById, customer } = useCustomer();
//   useEffect(() => {
//     if (!customerId) return;
//     handleGetCustomerById(customerId);
//   }, [customerId]);
//   return (
//     <>
//       {customer ? (
//         <div className="w-full h-full bg-white shadow-lg rounded-lg overflow-hidden">
//           <div className="flex items-center p-6 bg-gray-100">
//             <img
//               src={userImg}
//               alt=""
//               style={{ width: 60, height: 60 }}
//               className="rounded-full mr-4 border-2 border-gray-300"
//             />
//             <div className="text-lg font-bold">
//               <p className="text-gray-800">{`${customer.firstName} ${customer.lastName}`}</p>
//               <p className="text-sm font-normal text-gray-600">
//                 Gender: {customer.gender}
//               </p>
//             </div>
//           </div>
//           <hr className="border-gray-300" />
//           <div className="p-6">
//             <p className="font-semibold text-gray-700 mb-4">Details</p>
//             <ul className="space-y-3">
//               <li className="flex items-center">
//                 <p className="text-gray-500 w-32 text-sm">Lead owner</p>
//                 <p className="text-md break-words w-[45%] text-gray-800">
//                   {customer?.userId?.name}
//                 </p>
//               </li>
//               <li className="flex items-center">
//                 <p className="text-gray-500 w-32 text-sm">First name</p>
//                 <p className="text-md break-words w-[45%] text-gray-800">
//                   {customer.firstName}
//                 </p>
//               </li>
//               <li className="flex items-center">
//                 <p className="text-gray-500 w-32 text-sm">Last name</p>
//                 <p className="text-md break-words w-[45%] text-gray-800">
//                   {customer.lastName}
//                 </p>
//               </li>
//               <li className="flex items-center">
//                 <p className="text-gray-500 w-32 text-sm">Email</p>
//                 <p className="text-md break-words w-[45%] text-gray-800">
//                   {customer.email}
//                 </p>
//               </li>
//               <li className="flex items-center">
//                 <p className="text-gray-500 w-32 text-sm">Gender</p>
//                 <p className="text-md break-words w-[45%] text-gray-800">
//                   {customer.gender}
//                 </p>
//               </li>
//               <li className="flex items-center">
//                 <p className="text-gray-500 w-32 text-sm">Phone</p>
//                 <p className="text-md break-words w-[45%] text-gray-800">
//                   {customer.phone}
//                 </p>
//               </li>
//               <li className="flex items-center">
//                 <p className="text-gray-500 w-32 text-sm">Source</p>
//                 <p className="text-md break-words w-[45%] text-gray-800">
//                   {customer.sourceId?.name}
//                 </p>
//               </li>
//               <li className="flex items-center">
//                 <p className="text-gray-500 w-32 text-sm">Monthly income</p>
//                 <p className="text-md break-words w-[45%] text-gray-800">
//                   ${customer.monthlyIncome}
//                 </p>
//               </li>
//               <li className="flex items-center">
//                 <p className="text-gray-500 w-32 text-sm">Industry</p>
//                 <p className="text-md break-words w-[45%] text-gray-800">
//                   {customer.industry}
//                 </p>
//               </li>
//             </ul>
//           </div>
//         </div>
//       ) : (
//         <p>....Loading</p>
//       )}
//     </>
//   );
// }

// export default CustomerDetails;
