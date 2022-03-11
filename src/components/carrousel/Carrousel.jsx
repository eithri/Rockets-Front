import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Controller, Thumbs } from 'swiper';
import 'swiper/swiper-bundle.css';
import './Carrousel.css';

SwiperCore.use([Navigation, Pagination, Controller, Thumbs]);

export default function Carrousel() {

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [controlledSwiper, setControlledSwiper] = useState(null);

  const slides = [];
  for (let i = 0; i < 5; i += 1) {
    slides.push(
      <SwiperSlide key={`slide-${i}`} tag="li">

        <img
          src={`https://picsum.photos/id/${i + 1}/1440/640`}
          style={{ listStyle: 'none' }}
          alt={`Slide ${i}`}
        />
      </SwiperSlide>
    );
  }

  return (
    <Swiper
      thumbs={{ swiper: thumbsSwiper }}
      controller={{ control: controlledSwiper }}
      tag="section"
      wrapperTag="ul"
      navigation
      pagination
      slidesPerView={1}
      breakpoints={{
        // when window width is >= 640px
        640: {
          width: 640,
          slidesPerView: 1,
        },
        // when window width is >= 768px
        768: {
          width: 768,
          slidesPerView: 1,
        },
        1024: {
          width: 1024,
          slidesPerView: 1,
        },
        1366: {
          width: 1366,
          slidesPerView: 1,
        },
      }}
      centeredSlides={true}
    >
      {slides}
    </Swiper >
  );
}