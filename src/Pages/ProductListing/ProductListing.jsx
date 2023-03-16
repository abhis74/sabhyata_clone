import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ProductFilter from "../ProductFilter/ProductFilter.jsx";
import axios from "../../Api/Axios/axios.js";
import requests from "../../Api/Requests/request";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Productisting.css";

const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrow: true,
  fade: true,
};

const ProductListing = ({}) => {
  const [Products, setProducts] = useState();
  const [ProductFilterArray, setProductFilterArray] = useState([]);
  const [appliedFilter, setappliedFilter] = useState("");
  const [errorMsg, setErrorMag] = useState("");
  const [sorting, setSorting] = useState([]);
  const [selectedOption, setselectedOption] = useState("");
  let param = useParams();
  let location = useLocation();
  const appliedFilterHandler = (data) => {
    console.log("data", data);
    if (data) {
      const filterData = data.join("|");
      setappliedFilter(filterData);
    }
  };
  // console.log("applied filterksfnvks", ...data);
  // console.log("applied filter", appliedFilter);
  const handleChange = (event) => {
    setselectedOption(event.target.value);
    console.log(event.target.value);
  };

  console.log("applied filter", appliedFilter);

  // console.log(location);
  let url_key_pass = param.id.split(".")[0] ? param.id.split(".")[0] : param.id;
  // console.log(url_key_pass, "param.id");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchProductList, {
        params: {
          service: "category",
          store: "1",
          url_key: url_key_pass,
          page: 1,
          count: 20,
          sort_by: "",
          sort_dir: "",
          filter: "",
        },
      });
      setSorting(request.data.result.sort);

      console.log("ProductFilter", request.data.result.sort);

      // console.log("request", request.data.result);

      console.log("sorting", sorting);
      // return request;
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchProductList, {
        params: {
          service: "category",
          store: "1",
          url_key: url_key_pass,
          page: 1,
          count: 20,
          sort_by: selectedOption,
          sort_dir: "",
          filter: appliedFilter,
        },
      });

      setErrorMag(request.data.response);
      setProducts(request.data.result.products);
      setProductFilterArray(request.data.result.filters);
      setSorting(request.data.result.sort);
    }
    fetchData();
  }, [url_key_pass, appliedFilter, selectedOption]);

  return (
    <>
      <div className="propductListingPage">
        <ProductFilter
          filter={ProductFilterArray}
          OnAddedFilter={appliedFilterHandler}
        />
        <div className="container">
          {Products &&
            Products.length > 0 &&
            Products.map((item, index) => (
              <div className="productsBox">
                <Link
                  to={`/products/${url_key_pass}/` + item.url_key}
                  key={item.id_product + index}
                >
                  <Slider {...settings}>
                    {item.gallery &&
                      item.gallery.map((gallery, index) => (
                        <img
                          src={gallery.image}
                          alt={gallery.largeimage}
                          key={item.largeimage + index}
                        />
                      ))}
                  </Slider>
                </Link>
              </div>
            ))}
          <div>
            {errorMsg && errorMsg.error === 0 && (
              <div>
                <p>{errorMsg.error_message}</p>
              </div>
            )}
          </div>
        </div>
        <div className="sorting_box">
          <p>Sort By</p>
          {sorting && (
            <select
              name=""
              id=""
              value={selectedOption}
              onChange={handleChange}
            >
              {sorting.map((sortingItem, code, index) => (
                <option value={sortingItem.code}>{sortingItem.label}</option>
              ))}
            </select>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductListing;
