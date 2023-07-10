import React, { useState } from "react";
import { useEffect } from "react";
import requests from "../../Api/Requests/request";
import axios from "axios";
import { getCookie } from "../../commonFunctions/commonFunctions";
import "./cart.css";
const Cart = () => {
  let cart_id_value = getCookie("cart_id");
  let cart_session_value = getCookie("cart_session");

  const [productsDetails, setproductsDetails] = useState([]);

  console.log(cart_id_value, cart_session_value);
  useEffect(() => {
    async function fetchData() {
      var form = new FormData();
      form.append("cart_id", cart_id_value);
      form.append("cart_session", cart_session_value);
      form.append("curr_type", "inr");
      const request = await axios.post(requests.getCartApi, form);

      setproductsDetails(request.data.data.products);

      console.log(request.data.data, "getCartApi");

      return request;
    }
    fetchData();
  }, []);
  console.log("productsDetails", productsDetails);

  return (
    <>
      {productsDetails &&
        productsDetails.map((product) => (
          <div className="products_in_cart">
            <div className="productImg">
              <img src={product.image} alt={product.name} />
              <p>{product.name}</p>
            </div>
            <div className="price">{product.price}</div>
          </div>
        ))}
    </>
  );
};

export default Cart;
