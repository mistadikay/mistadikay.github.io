import React, { Component } from "react";
import Lightbox from "react-images";

class GalleryComposition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImage: 0,
      images: props.images.map(({ caption, image }) => ({
        ...image.childImageSharp.fluid,
        caption,
      })),
    };
  }

  render() {
    const { images, currentImage } = this.state;

    // https://github.com/jossmac/react-images/issues/247
    if (typeof document === "undefined") {
      return null;
    }

    return (
      <Lightbox
        backdropClosesModal
        enableKeyboardInput
        showImageCount
        showThumbnails
        imageCountSeparator="/"
        images={images}
        preloadNextImage
        currentImage={currentImage}
        isOpen
        onClickThumbnail={(imageIndex) =>
          this.setState({ currentImage: imageIndex })
        }
        onClickPrev={() => this.setState({ currentImage: currentImage - 1 })}
        onClickNext={() => this.setState({ currentImage: currentImage + 1 })}
        onClose={this.props.onClose}
      />
    );
  }
}

export default GalleryComposition;
