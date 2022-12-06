import Carousel from "nuka-carousel";
import { ImgSliderWrapper } from "../styles/card.styles";

const ImgSlider = ({ images }) => {
  return (
    <ImgSliderWrapper>
      <Carousel
        renderCenterLeftControls={({ previousSlide }) => (
          <button
            onClick={previousSlide}
            disabled={true}
            style={{ display: "none" }}
          >
            Previous
          </button>
        )}
        renderCenterRightControls={({ nextSlide }) => (
          <button
            onClick={nextSlide}
            disabled={true}
            style={{ display: "none" }}
          >
            Next
          </button>
        )}
      >
        {images?.map((image, idx) => {
          return (
            <figure key={idx}>
              <img src={image.url} alt="car_img" width="100%" height="100%" />
            </figure>
          );
        })}
      </Carousel>
    </ImgSliderWrapper>
  );
};

export default ImgSlider;
