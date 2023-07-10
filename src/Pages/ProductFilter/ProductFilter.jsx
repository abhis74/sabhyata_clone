import React, { useEffect, useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import "./ProductFilter.css";
import { borderRadius } from "@mui/system";

const ProductFilter = ({ filter, OnAddedFilter }) => {
  console.log(filter, "filter");

  const [filterOptions, setFilterOptions] = useState(false);
  const [test, setTest] = useState(null);
  const [filterArray, setFilterArray] = useState([]);

  const closefilter = (e, i) => {
    console.log("tthis is close", i, e);
    setTest(i);
    setFilterOptions(true);
  };
  const openfilter = (e, i) => {
    console.log("this is open", i, e);
    setTest(i);
    setFilterOptions(false);
  };
  const handleChange = (e, filter_lable, value_key, value, code) => {
    if (e.target.checked) {
      var filtetValKey = value;
      console.log("filtetValKey", filtetValKey);
      setFilterArray((state) => {
        if (filter_lable.toLowerCase() === "price") {
          filtetValKey = filtetValKey.replace(",", " to ");
        }
        if (filter_lable.toLowerCase() === "discount") {
          filtetValKey = filtetValKey.replace(/\s/g, "+");
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
        filter
          .filter((filter) => {
            if (
              filter.filter_lable !== "USD Discount" &&
              filter.filter_lable !== "GBP Discount" &&
              filter.filter_lable !== "EUR Discount" &&
              filter.filter_lable !== "AUD Discount" &&
              filter.filter_lable !== "CAD Discount" &&
              filter.filter_lable !== "AED Discount"
            ) {
              return filter.filter_lable;
            }
          })
          .map((item, index) => {
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
                              {index === test && (
                                <li className="filterBox__lable__option">
                                  <label
                                    htmlFor={item.options[val].value_key}
                                    className="color_options"
                                  >
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
                                    <div className="colorSwites">
                                      <div
                                        style={{
                                          backgroundColor:
                                            item.options[val].value,
                                          height: "13px",
                                          width: "13px",
                                          borderRadius: "50%",
                                        }}
                                      ></div>{" "}
                                      <span>{item.options[val].value}</span>
                                    </div>
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
