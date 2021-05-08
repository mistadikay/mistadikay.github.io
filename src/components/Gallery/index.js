import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const GalleryComposition = (props) => (
  <Carousel showArrows={true}>
    {props.images.map(({ caption, image }) => (
      <div key={caption}>
        <img {...image.childImageSharp.fluid} alt={caption} />
        <p className="legend">{caption}</p>
      </div>
    ))}
  </Carousel>
);

export default GalleryComposition;
