import React, { useEffect, useRef, useState } from "react";
import Clear from "../assets/clear.png";
import FilterImg from "../assets/filter.png";
import ascSort from "../assets/ascsort.png";
import dscSort from "../assets/dscsort.png";
import Column from "../assets/column.png";
import { FilterOptions } from "../utils/filter";

function Filter({
  addColumn,
  removeColumn,
  columns,
  defaultColumns,
  handleSort,
  handleFilter,
  handleSetDefaultData,
}) {
  //column
  const [isOpenColumn, setIsOpenColumn] = useState(false);
  //filter
  const [openFilter, setOpenFilter] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const [isSelectedFilter, setIsSelectedFilter] = useState(false);
  const [filterBy, setFilterBy] = useState({ key: "", value: "" });
  const [filterValue, setFilterValue] = useState("");

  //sort
  const [isOpenSort, setIsOpenSort] = useState(false);
  const [sortBy, setSortBy] = useState({ key: "", value: "" });
  const [order, setOrder] = useState("asc");

  //reset
  const handleReset = () => {
    if (handleSetDefaultData) {
      setIsOpenColumn(false);
      setOpenFilter(false);
      setOpenOptions(false);
      setIsSelectedFilter(false);
      setFilterBy("");
      setFilterValue("");
      setIsOpenSort(false);
      setSortBy({ key: "", value: "" });
      setOrder("asc");
      handleSetDefaultData();
    }
  };
  //ref
  const dropdownRef = useRef(null);
  const filterRef = useRef(null);
  const sortSelection = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        filterRef.current &&
        !filterRef.current.contains(e.target) &&
        sortSelection.current &&
        !sortSelection.current.contains(e.target)
      ) {
        setIsOpenColumn(false);
        setOpenFilter(false);
        setIsOpenSort(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (handleSort && sortBy.key) {
      handleSort(sortBy.key, order);
    }
  }, [sortBy, order]);

  useEffect(() => {
    if (handleFilter && filterBy && filterValue !== undefined) {
      handleFilter(filterBy.key, filterValue);
    }
  }, [filterBy, filterValue]);
  return (
    <div className="flex justify-end my-5 px-5">
      <ul className="flex items-center w-120 justify-evenly">
        <li onClick={handleReset}>
          <img
            src={Clear}
            alt=""
            className="bg-gray-200 p-1 rounded-lg cursor-pointer"
          />
        </li>
        <li
          ref={filterRef}
          onClick={(e) => {
            e.stopPropagation();
            setOpenFilter((prev) => !prev);
            setOpenOptions(false);
            setIsOpenSort(false);
            setIsOpenColumn(false);
          }}
          className="flex items-center bg-gray-200 py-1 px-3 rounded-lg cursor-pointer relative"
        >
          <img src={FilterImg} alt="" className="mr-2" />
          Filter
          {openFilter && (
            <div className=" w-max absolute top-10 right-0 mt-2 w-64 bg-white shadow-lg border border-gray-300 rounded-2xl p-3 z-10">
              <FilterOptions
                openOptions={openOptions}
                setOpenOptions={setOpenOptions}
                isSelected={isSelectedFilter}
                setIsSelected={setIsSelectedFilter}
                filterBy={filterBy}
                setFilterBy={setFilterBy}
                input={filterValue}
                setInput={setFilterValue}
                defaultColumns={defaultColumns}
              />
            </div>
          )}
        </li>
        <li
          ref={sortSelection}
          className="flex items-center bg-gray-200 py-1 px-3 rounded-lg cursor-pointer relative"
        >
          <img
            src={order === "asc" ? ascSort : dscSort}
            alt=""
            className="mr-2"
            onClick={() =>
              order === "asc" ? setOrder("dsc") : setOrder("asc")
            }
            style={{ width: 30, height: 30 }}
          />
          <div
            onClick={() => {
              setOpenFilter(false);
              setIsOpenColumn(false);
              setIsOpenSort(!isOpenSort);
            }}
            className="flex items-center"
          >
            Sort{" "}
            {sortBy.key && (
              <>
                <p>: {sortBy.value}</p>
              </>
            )}
          </div>

          {isOpenSort && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-10 mt-2 w-48 bg-white shadow-lg border border-gray-300 rounded-2xl z-10"
            >
              {defaultColumns.map((col) => {
                return (
                  <div
                    key={col.key}
                    onClick={() => {
                      setSortBy((prev) =>
                        prev.key === col.key
                          ? { key: "", value: "" }
                          : { key: col.key, value: col.value }
                      );
                      setIsOpenSort(false);
                    }}
                    className="flex items-center px-3 py-2 hover:bg-gray-100"
                  >
                    {col.value}
                  </div>
                );
              })}
            </div>
          )}
        </li>
        <li
          className="flex items-center bg-gray-200 py-1 px-3 rounded-lg cursor-pointer relative"
          onClick={() => {
            setIsOpenColumn((prev) => !prev);
            setOpenFilter(false);
            setIsOpenSort(false);
          }}
          ref={dropdownRef}
        >
          <img src={Column} alt="" className="mr-2" />
          Column
          {isOpenColumn && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-10 mt-2 w-48 bg-white shadow-lg border border-gray-300 rounded-2xl z-10"
            >
              {defaultColumns.map((col) => {
                const isChecked = columns.some((c) => c.key === col.key);
                return (
                  <div
                    key={col.key}
                    onClick={() => {
                      isChecked
                        ? removeColumn(col.key)
                        : addColumn(col.key, col.value);
                    }}
                    className="flex items-center px-3 py-2 hover:bg-gray-100"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      readOnly
                      className="mr-2"
                    />
                    {col.value}
                  </div>
                );
              })}
            </div>
          )}
        </li>
      </ul>
    </div>
  );
}

export default Filter;
