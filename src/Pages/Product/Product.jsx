import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import axios from "../../Api/Axios/axios.js";
import requests from "../../Api/Requests/request";
import "./Product.css";

const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrow: true,
  fade: true,
};

const Product = () => {
  let param = useParams();
  const [singleProduct, setSingleProduct] = useState([]);
  console.log("paramparamparamparam", param.singleproduct);
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchProducts, {
        params: {
          service: "product",
          store: "1",
          url_key: param.singleproduct,
        },
      });
      setSingleProduct(request.data.result);
      console.log("setSingleProduct", request.data.result);
      return request;
    }
    fetchData();
  }, [param.singleproduct]);

  const addToCart = () => {
    console.log("add to cart");
  };

  return (
    <>
      <div className="singleProductContainer">
        <div className="productImages">
          <Slider {...settings}>
            {singleProduct.gallery &&
              singleProduct.gallery.map((gallery, index) => (
                <img
                  src={gallery.image}
                  alt={gallery.largeimage}
                  key={singleProduct.largeimage + index}
                />
              ))}
          </Slider>
          {/* <img src={singleProduct.image} alt={singleProduct.name} /> */}
        </div>
        <div className="product_details">
          <h1>{singleProduct.name}</h1>
          <p>{singleProduct.description}</p>

          <div className="pricing">
            <p className="selling_price">{singleProduct.selling_price}</p>
            <div className="price_discount">
              <s className="price">{singleProduct.price}</s>
              <span>({singleProduct.discount})</span>
            </div>
          </div>

          {<div className="size"></div>}

          <div className="add_to_cart" onClick={addToCart}>
            <p>Add To Cart</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
