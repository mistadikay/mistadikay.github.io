import React, { useState } from "react";
import Lightbox from "react-images";

const GalleryComposition = (props) => {
  // https://github.com/jossmac/react-images/issues/247
  if (typeof document === "undefined") {
    return null;
  }

  const [currentImage, setCurrentImage] = useState(0);
  const images = props.images.map(({ caption, image }) => ({
    ...image.childImageSharp.fluid,
    caption,
  }));

  return (
    <Lightbox
      backdropClosesModal
      enableKeyboardInput
      showImageCount
      showThumbnails
      imageCountSeparator="/"
      views={images}
      preloadNextImage
      currentImage={currentImage}
      isOpen
      onClickThumbnail={(imageIndex) => setCurrentImage(imageIndex)}
      onClickPrev={() => setCurrentImage(currentImage - 1)}
      onClickNext={() => setCurrentImage(currentImage + 1)}
      onClose={props.onClose}
    />
  );
};

export default GalleryComposition;
