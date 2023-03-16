import React from "react";
import { Link } from "react-router-dom";

const HomeBannerVideoAndImg = (props) => {
  return (
    <div>
      {props.title && <p className="title">{props.title}</p>}

      {props.video && (
        <div className="videoContainer">
          <video
            muted="muted"
            loop="loop"
            name="media"
            controls="controls"
            poster="/images/videoPoster1.jpg"
          >
            <source src={props.video} type="video/mp4" />
          </video>
        </div>
      )}

      {props.homeSeconBanner && (
        <div className="homeSeconBanner">
          <Link to={"/products/" + props.homeSeconBanner.url_key}>
            <img
              src={props.homeSeconBanner.image}
              alt={props.homeSeconBanner.image}
            />
          </Link>
        </div>
      )}
    </div>
  );
};

export default HomeBannerVideoAndImg;
