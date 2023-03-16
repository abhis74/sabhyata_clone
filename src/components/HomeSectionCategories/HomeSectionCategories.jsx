import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../Api/Axios/axios.js";

const HomeSectionCategories = ({
  categories,
  title,
  Collection,
  new_arrivals,
}) => {
  const [featured_category, setfeatured_category] = useState([]);
  const [collection, setcollection] = useState([]);
  const [NewArrival, setNewArrival] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(categories);

      console.log("requestAbhishek", request);
      setfeatured_category(request.data.result.featured_category);

      return request;
    }
    fetchData();
  }, [categories]);
  useEffect(() => {
    async function fetchCollection() {
      const request = await axios.get(Collection);
      setcollection(request.data.result.collection);

      return request;
    }
    fetchCollection();
  }, [Collection]);

  useEffect(() => {
    async function fetchsetNewArrival() {
      const request = await axios.get(new_arrivals);
      setNewArrival(request.data.result.new_arrivals);

      return request;
    }
    fetchsetNewArrival();
  }, [new_arrivals]);

  return (
    <>
      <h1>{title}</h1>
      {featured_category &&
        featured_category.map((item) => (
          <Link
            to={item.url.replace("category", "products")}
            key={item.id_banner}
          >
            <img src={item.image} alt="" />
          </Link>
        ))}

      {NewArrival &&
        NewArrival.filter((NewArrival) => NewArrival.device === "desktop").map(
          (item) => (
            <Link
              to={item.url.replace("category", "products")}
              key={item.id_banner}
            >
              <img src={item.image} alt="" />
            </Link>
          )
        )}

      {collection &&
        collection
          .filter((collection) => collection.device === "desktop")
          .map((item) => (
            <Link
              to={item.url.replace("category", "products")}
              key={item.id_banner}
            >
              <img src={item.image} alt="" />
            </Link>
          ))}
    </>
  );
};

export default HomeSectionCategories;
