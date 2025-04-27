import React, { useEffect, useState } from "react";
import useCustomer from "../../hooks/useCustomer";
import { InputChange } from "../../utils/input";
import { Source } from "../../utils/source";
import useSource from "../../hooks/useSource";
import CloseIcon from "../../assets/CloseIcon";
import TagModal from "./TagModal";

function Data({ customerId }) {
  const {
    customer,
    handleGetCustomerById,
    handleUpdateCustomer,
    handleAddCustomerTag,
    handleRemoveCustomerTag,
  } = useCustomer();
  const { handleGetSources, sources } = useSource();

  const [save, setSave] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [industry, setIndustry] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [_source, setSource] = useState({
    sourceId: {
      key: "",
      value: "",
    },
  });
  const [openSource, setOpenSource] = useState(false);

  const [openTagModal, setOpenTagModal] = useState(false);

  useEffect(() => {
    if (!customerId) return;
    handleGetCustomerById(customerId);
    handleGetSources();
  }, [customerId]);

  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      firstName,
      lastName,
      phone,
      gender,
      email,
      industry,
      monthlyIncome,
      sourceId: _source.sourceId.key,
    };
    handleUpdateCustomer(customerId, data);
    console.log(data);
    setSave(false);
  };

  useEffect(() => {
    if (customer) {
      setSource({
        sourceId: {
          key: customer.sourceId?._id,
          value: customer.sourceId?.name,
        },
      });
    }
  }, [customer]);

  const onSaveTag = (tag) => {
    handleAddCustomerTag(customerId, tag);
  };

  const onCloseModal = () => {
    setOpenTagModal(false);
  };
  return (
    <div className="h-full w-full bg-white flex flex-col overflow-hidden">
      {openTagModal && <TagModal onClose={onCloseModal} onSave={onSaveTag} />}
      {customer && (
        <div className="flex-1 overflow-y-auto px-5 py-6">
          <form onSubmit={onSubmit} className="space-y-10">
            <div className="flex items-center justify-between">
              <p className="text-xl font-bold pb-4 text-gray-500">Personal</p>
              <button
                type="submit"
                className={`px-2 py-1 rounded-lg text-sm font-semibold cursor-pointer ${
                  save ? "bg-gray-500 text-white" : "bg-gray-200 text-gray-400"
                }`}
              >
                Save
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="cursor-pointer">
                <p className="text-gray-500 text-sm mb-2">First name:</p>
                {save ? (
                  <InputChange
                    value={customer.firstName}
                    text={firstName}
                    setText={setFirstName}
                  />
                ) : (
                  <p
                    onClick={() => setSave(true)}
                    className="px-3 py-1 bg-gray-100 rounded-xl text-md text-gray-500"
                  >
                    {customer.firstName}
                  </p>
                )}
              </div>
              <div className="cursor-pointer">
                <p className="text-gray-500 text-sm mb-2">Last name:</p>
                {save ? (
                  <InputChange
                    value={customer.lastName}
                    text={lastName}
                    setText={setLastName}
                  />
                ) : (
                  <p
                    onClick={() => setSave(true)}
                    className="px-3 py-1 bg-gray-100 rounded-xl text-md text-gray-500"
                  >
                    {customer.lastName}
                  </p>
                )}
              </div>
              <div className="cursor-pointer">
                <p className="text-gray-500 text-sm mb-2">Phone number:</p>
                {save ? (
                  <InputChange
                    value={customer.phone}
                    text={phone}
                    setText={setPhone}
                  />
                ) : (
                  <p
                    onClick={() => setSave(true)}
                    className="px-3 py-1 bg-gray-100 rounded-xl text-md text-gray-500"
                  >
                    {customer.phone}
                  </p>
                )}
              </div>
              <div className="cursor-pointer">
                <p className="text-gray-500 text-sm mb-2">Gender:</p>
                {save ? (
                  <InputChange
                    value={customer.gender}
                    text={gender}
                    setText={setGender}
                  />
                ) : (
                  <p
                    onClick={() => setSave(true)}
                    className="px-3 py-1 bg-gray-100 rounded-xl text-md text-gray-500"
                  >
                    {customer.gender}
                  </p>
                )}
              </div>
            </div>

            <hr className="border-gray-300" />
            <p className="text-xl font-bold text-gray-500">Details</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
              <div className="cursor-pointer">
                <p className="text-gray-500 text-sm mb-2">Email:</p>
                {save ? (
                  <InputChange
                    value={customer.email}
                    text={email}
                    setText={setEmail}
                  />
                ) : (
                  <p
                    onClick={() => setSave(true)}
                    className="px-3 py-1 bg-gray-100 rounded-xl text-md text-gray-500"
                  >
                    {customer.email}
                  </p>
                )}
              </div>
              <div className="cursor-pointer">
                <p className="text-gray-500 text-sm mb-2">Industry:</p>
                {save ? (
                  <InputChange
                    value={customer.industry}
                    text={industry}
                    setText={setIndustry}
                  />
                ) : (
                  <p
                    onClick={() => setSave(true)}
                    className="px-3 py-1 bg-gray-100 rounded-xl text-md text-gray-500"
                  >
                    {customer.industry}
                  </p>
                )}
              </div>
              <div className="cursor-pointer">
                <p className="text-gray-500 text-sm mb-2">Monthly Income:</p>
                {save ? (
                  <InputChange
                    value={customer.monthlyIncome}
                    text={monthlyIncome}
                    setText={setMonthlyIncome}
                  />
                ) : (
                  <p
                    onClick={() => setSave(true)}
                    className="px-3 py-1 bg-gray-100 rounded-xl text-md text-gray-500"
                  >
                    {customer.monthlyIncome}
                  </p>
                )}
              </div>
              <div>
                <div
                  onClick={() => {
                    setSave(true);
                    setOpenSource(!openSource);
                  }}
                  className="cursor-pointer"
                >
                  <p className="text-gray-500 text-sm mb-2">Source:</p>
                  <p className="px-3 py-1 bg-gray-100 rounded-xl text-md text-gray-500">
                    {_source.sourceId.value}
                  </p>
                </div>
                {save && openSource && (
                  <Source
                    sources={sources}
                    setFormData={setSource}
                    setOpenSourceDropdown={setOpenSource}
                    required={false}
                  />
                )}
              </div>
            </div>

            <hr className="border-gray-300" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-500 text-sm mb-2">Total Revenue:</p>
                <p className="px-3 py-1 bg-gray-100 rounded-xl text-md text-gray-500 w-fit">
                  $8500
                </p>
              </div>
              <div>
                <div className="flex items-center justify-between pr-4">
                  <p className="text-gray-500 text-sm mb-2">Tags:</p>
                  <p
                    onClick={() => setOpenTagModal(true)}
                    className="text-xs bg-blue-300 w-fit px-2 py-1 text-white font-bold rounded-lg cursor-pointer hover:text-white hover:bg-blue-700"
                  >
                    Add Tag
                  </p>
                </div>
                {customer.tags && (
                  <div className="grid grid-cols-7 flex-wrap gap-2">
                    {customer.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium relative mr-2 w-fit h-fit mb-2"
                      >
                        {tag}
                        <div
                          onClick={() =>
                            handleRemoveCustomerTag(customerId, tag)
                          }
                          className="absolute bottom-[70%] left-[85%] bg-gray-200 rounded-full p-[2px] cursor-pointer"
                        >
                          <CloseIcon className={"w-3 h-3"} />
                        </div>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Data;
