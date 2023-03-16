import React, { useEffect, useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import "./ProductFilter.css";

const ProductFilter = ({ filter, OnAddedFilter }) => {
  console.log(filter, "filter");

  const [filterOptions, setFilterOptions] = useState(false);
  const [test, setTest] = useState(null);
  const [filterArray, setFilterArray] = useState([]);
  const [toggleFilterArray, settoggleFilterArray] = useState([]);

  const closefilter = (e, i) => {
    console.log("tthis is close", i, e);
    // var index = toggleFilterArray.indexOf(i);
    // if (index !== -1) {
    //   settoggleFilterArray(splice(index, 1));
    //   console.log("toggleFilterArray Open", toggleFilterArray);
    // }
    setTest(i);
    setFilterOptions(true);
  };
  const openfilter = (e, i) => {
    console.log("this is open", i, e);
    // settoggleFilterArray(toggleFilterArray.push(i));
    // console.log("toggleFilterArray close", toggleFilterArray);
    setTest(i);
    setFilterOptions(false);
  };

  // console.log("toggleFilterArray", toggleFilterArray);
  let toggleFilter = (i) => {
    if (toggleFilterArray.includes(i)) {
      return true;
    } else {
      return false;
    }
  };

  const handleChange = (e, filter_lable, value_key, value, code) => {
    if (e.target.checked) {
      var filtetValKey = value_key;
      setFilterArray((state) => {
        if (filter_lable.toLowerCase() === "price") {
          filtetValKey = filtetValKey.replace(",", " to ");
        }

        if (e.target.value) {
          return [...state, code + "~" + filtetValKey];
        }
      });
    } else {
      var filtetValKey = value_key;
      setFilterArray((state) => {
        if (filter_lable.toLowerCase() === "price") {
          filtetValKey = filtetValKey.replace(",", " to ");
        }

        if (e.target.value) {
          return [state.pop(filtetValKey)];
        }
      });
    }

    // filterData.splice(data, 1);

    console.log(filter_lable, value, value_key, code, "value,value_key,code");

    //  (filterArray);
  };

  useEffect(() => {
    OnAddedFilter(filterArray);
    console.log("state if condition", filterArray);
  }, [filterArray]);

  return (
    <div className="filterBox">
      {filter &&
        filter.map((item, index) => {
          return (
            <>
              <div key={index} className="filterBox__lable">
                <div className="heading">
                  {item.filter_lable}
                  {filterOptions === false && (
                    <ArrowDropDownIcon
                      onClick={(e) => {
                        closefilter(e, index);
                      }}
                    />
                  )}
                  {filterOptions === true && (
                    <ArrowDropUpIcon
                      onClick={(e) => {
                        openfilter(e, index);
                      }}
                    />
                  )}
                </div>

                {
                  <div>
                    <ul>
                      {item.options &&
                        Object.keys(item.options).map((val) => (
                          <>
                            {index == test && (
                              <li className="filterBox__lable__option">
                                <label htmlFor={item.options[val].value_key}>
                                  <input
                                    type="checkbox"
                                    id={item.options[val].value_key}
                                    value={item.options[val].value}
                                    onChange={(e) =>
                                      handleChange(
                                        e,
                                        item.filter_lable,
                                        item.options[val].value_key,
                                        item.options[val].value,
                                        item.options[val].code
                                      )
                                    }
                                  />{" "}
                                  {item.options[val].value}
                                </label>
                              </li>
                            )}
                          </>
                        ))}
                    </ul>
                  </div>
                }
              </div>
            </>
          );
        })}
    </div>
  );
};

export default ProductFilter;
