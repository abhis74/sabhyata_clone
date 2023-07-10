import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import axios from "../../Api/Axios/axios.js";
import requests from "../../Api/Requests/request";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { incriment, decriment } from "../../actions/index";
import "./Product.css";
import { useSelector } from "react-redux";

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

  const cartQuantity = useSelector((state) => state.changeProduct);

  const [singleProduct, setSingleProduct] = useState([]);
  const [selectedSize, setselectedSize] = useState("");
  const [product_id, setproduct_id] = useState(null);
  const [product_parent_id, setproduct_parent_id] = useState(null);
  const [name, setname] = useState(null);
  const [group_id, setgroup_id] = useState(null);
  const [sku, setsku] = useState(null);
  const [master_sku, setmaster_sku] = useState(null);
  const [price, setprice] = useState(null);
  const [qty_ordered, setqty_ordered] = useState(null);
  const [final_price, setfinal_price] = useState(null);
  const [cart_session, setcart_session] = useCookies(["cart_session"]);
  const [cart_id, setcart_id] = useCookies(["cart_id"]);
  const dispatch = useDispatch();
  function cart_id_cookies(id) {
    setcart_id("cart_id", id);
  }
  function cart_session_cookies(id) {
    setcart_session("cart_session", id);
  }

  console.log("cart_id", cart_id);
  console.log("cart_session", cart_session);
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
      setproduct_id(request.data.result.id_product);
      setproduct_parent_id(request.data.result.source_product_id);
      setname(request.data.result.name);
      setgroup_id(request.data.result.group_id);
      setsku(request.data.result.sku);
      setmaster_sku(request.data.result.master_sku);
      setprice(request.data.result.price);
      setfinal_price(request.data.result.selling_price);
      console.log("setSingleProduct", request.data.result);
      console.log("setSingleProduct variation", request.data.result.variation);
      return request;
    }
    fetchData();
  }, [param.singleproduct]);

  // useEffect(() => {
  //   add_to_cart();
  // }, []);

  async function add_to_cart() {
    var form = new FormData();
    form.append("product_id", product_id);
    form.append("product_parent_id", product_parent_id);
    form.append("product_options", selectedSize);
    form.append("name", name);
    form.append("group_id", group_id);
    form.append("sku", sku);
    form.append("master_sku", master_sku ? setmaster_sku : sku);
    form.append("price", price);
    form.append("qty_ordered", "1");
    form.append("final_price", final_price);
    form.append("store", "1");
    form.append("curr_type", "inr");
    if (cart_id != null && cart_id != "" && Object.keys(cart_id).length > 0) {
      console.log("cart_id2", cart_id);
      form.append("cart_id", cart_id.cart_id);
    }
    if (cart_id != null && cart_id != "" && Object.keys(cart_id).length > 0) {
      console.log("cart_session33333", cart_session);
      form.append("cart_session", cart_session.cart_session);
    }

    const request = await axios
      .post(requests.cartApi, form)
      .then(function(response) {
        if (response.data.success === true) {
          console.log(response.data.data, "response");
          cart_id_cookies(response.data.data.cart_id);

          if (response.data.data.cart_session) {
            cart_session_cookies(response.data.data.cart_session);
          }
        }
      });
    dispatch(incriment(1));

    console.log("response cartQuantity", cartQuantity);
    return request;
  }

  const selectSize = (e) => {
    setselectedSize(e.target.value);
    console.log("select size", e.target.value);
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

          {
            <div className="size">
              <div className="variations">
                {singleProduct.variation &&
                  Object.keys(singleProduct.variation).map((val, index) => (
                    <label
                      htmlFor={singleProduct.variation[val].group_id}
                      className="variationsSize"
                    >
                      <input
                        type="radio"
                        name="selectSize"
                        value={
                          singleProduct.variation[val]
                            .configrable_atribute_value
                        }
                        id={singleProduct.variation[val].group_id}
                        onChange={(e) => selectSize(e)}
                      />
                      {singleProduct.variation[val].configrable_atribute_value}
                    </label>
                  ))}
              </div>
            </div>
          }

          <div className="add_to_cart" onClick={add_to_cart}>
            <p>Add To Cart</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
