import React, { useEffect } from "react";
import Banner from "../../components/Banner/Banner";
import HomeBannerVideoAndImg from "../../components/HomeBannerVideoAndImg/HomeBannerVideoAndImg";
import HomeSectionCategories from "../../components/HomeSectionCategories/HomeSectionCategories";
import requests from "../../Api/Requests/request";
import "./Home.css";
const videos =
  "https://kxadmin.sabhyataclothing.com/video/sabhyata_2022_diwali_video.mp4";
const videotitle = "Redefine Celebrations";

const homeSeconBanner = {
  id: 1,
  image:
    "https://kxadmin.sabhyataclothing.com/banner/16723152261669106633utsav%20banner%20resized.webp",
  url_key: "utsavcollection",
};

const Home = () => {
  useEffect(() => {
    {
      console.log("abhishek", requests.fetchTrending);
    }
  }, []);

  return (
    <div>
      <Banner banner={requests.fetchBanners} />
      <HomeSectionCategories
        title="Explore Categories"
        categories={requests.fetchTrending}
      />

      <HomeBannerVideoAndImg video={videos} title={videotitle} />
      <HomeSectionCategories
        title="New Arrivals"
        new_arrivals={requests.fetchTrending}
      />
      <HomeBannerVideoAndImg homeSeconBanner={homeSeconBanner} />

      <HomeSectionCategories
        title="Collection"
        Collection={requests.fetchTrending}
      />
      {/* <HomeSectionCategories title="Trending" />  */}
    </div>
  );
};

export default Home;
