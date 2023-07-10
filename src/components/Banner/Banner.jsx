import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import axios from "../../Api/Axios/axios.js";

const Banner = (props) => {
  const [bannerData, setBannerData] = useState([]);
  // console.log(props);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrow: true,
    fade: true,
  };
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(props.banner);
      console.log(request.data.result, "request");
      setBannerData(request.data.result);
      return request;
    }
    fetchData();
  }, [props.banner]);

  console.log("bannerData", bannerData);
  return (
    <div>
      <Slider {...settings}>
        {bannerData
          .filter(
            (bannerData) =>
              bannerData.device === "desktop" &&
              bannerData.is_multicurrency === "no"
          )
          .map((item) => (
            <Link
              to={item.url.replace("category", "products")}
              key={item.id_banner}
            >
              <img src={item.image} alt={item.image} />
            </Link>
          ))}
      </Slider>
    </div>
  );
};

export default Banner;
