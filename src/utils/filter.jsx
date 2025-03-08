import { useEffect, useState } from "react";
import dropdown from "../assets/dropdown30.png";
import Clear from "../assets/clear.png";

export const FilterOptions = ({
  openOptions,
  setOpenOptions,
  isSelected,
  setIsSelected,
  filterBy,
  setFilterBy,
  input,
  setInput,
  defaultColumns,
}) => {
  return (
    <>
      {isSelected ? (
        <FilterValue
          filterBy={filterBy}
          setFilterBy={setFilterBy}
          value={input}
          setValue={setInput}
          setIsSelected={setIsSelected}
          setOpenOptions={setOpenOptions}
          openOptions={openOptions}
          defaultColumns={defaultColumns}
        />
      ) : (
        <div onClick={(e) => e.stopPropagation()} className="relative">
          <p className="pb-5">Empty - choose a field to filter by</p>
          <p
            className="bg-gray-500 text-white w-fit px-2 py-1 rounded-lg"
            onClick={() => setOpenOptions(!openOptions)}
          >
            + Add filter
          </p>

          {openOptions && (
            <div className="absolute left-0">
              <ListOptions
                setIsSelected={setIsSelected}
                setFilterBy={setFilterBy}
                openOptions={openOptions}
                setOpenOptions={setOpenOptions}
                defaultColumns={defaultColumns}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

const ListOptions = ({
  setIsSelected,
  setFilterBy,
  openOptions,
  setOpenOptions,
  defaultColumns,
}) => {
  const handleSelect = (e) => {
    setFilterBy({ key: e.key, value: e.value });
    setIsSelected(true);
    setOpenOptions(!openOptions);
  };
  return (
    <div className="flex flex-col items-start bg-white p-2  mt-2 shadow-xl rounded-xl w-40">
      {defaultColumns.map((item) => (
        <p
          onClick={() => handleSelect(item)}
          className="bg-gray-200 w-full py-1 px-2 rounded-lg mt-1 hover:bg-gray-100 cursor-pointer"
          key={item.key}
        >
          {item.value}
        </p>
      ))}
    </div>
  );
};

const FilterValue = ({
  filterBy,
  setFilterBy,
  value,
  setValue,
  setIsSelected,
  setOpenOptions,
  openOptions,
  defaultColumns,
}) => {
  const handleClick = () => {
    setIsSelected(false);
    setOpenOptions(false);
    setValue("");
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex items-center justify-evenly w-140 "
    >
      <p>Where</p>
      <div>
        <p
          onClick={() => setOpenOptions(!openOptions)}
          className="bg-gray-200 px-7 py-1 rounded-lg hover:shadow-xl flex items-center"
        >
          {filterBy.value}
          <img
            src={dropdown}
            alt=""
            style={{ width: 15, height: 15, marginLeft: 10 }}
          />
        </p>

        {openOptions && (
          <div className="absolute left-0">
            <ListOptions
              setIsSelected={setIsSelected}
              setFilterBy={setFilterBy}
              openOptions={openOptions}
              setOpenOptions={setOpenOptions}
              defaultColumns={defaultColumns}
            />
          </div>
        )}
      </div>

      <p>Like</p>
      <input
        className="bg-gray-200 rounded-lg py-1 pl-3"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <p
        onClick={handleClick}
        className="text-gray-400 text-sm cursor-pointer hover:text-black"
      >
        <img src={Clear} alt="" />
      </p>
    </div>
  );
};
