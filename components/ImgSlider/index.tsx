import React from 'react';
import Carousel from 'nuka-carousel';
import {ImgSliderWrapper} from "../../styles/component/card";

const imgDummy = [
    {
        no: 1,
        src: '/images/sample.jpeg'
    },
    {
        no: 2,
        src: '/images/sample.jpeg'
    },
    {
        no: 3,
        src: '/images/sample.jpeg'
    },
    {
        no: 4,
        src: '/images/sample.jpeg'
    },
    {
        no: 5,
        src: '/images/sample.jpeg'
    },
    {
        no: 6,
        src: '/images/sample.jpeg'
    }
]

const ImgSlider = () => {
    return (
        <ImgSliderWrapper>
            <Carousel
                renderCenterLeftControls={({previousSlide }) => (
                    <button onClick={previousSlide} disabled={true} style={{display:'none'}}>
                        Previous
                    </button>
                )}
                renderCenterRightControls={({ nextSlide }) => (
                    <button onClick={nextSlide} disabled={true} style={{display:'none'}}>
                        Next
                    </button>
                )}>
                {imgDummy?.map((el) => {
                    return (
                        <figure>
                            <img src={el.src} alt="car_img" key={el.no} width='100%' height='100%' />
                        </figure>
                    );
                })}
            </Carousel>
        </ImgSliderWrapper>
    )
}

export default ImgSlider;