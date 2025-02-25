import banner1 from "@/assets/images/banner1.jpg";
import banner2 from "@/assets/images/banner2.jpg";
import banner3 from "@/assets/images/banner3.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { v4 as uuidv4 } from "uuid";

import "swiper/css";
import "swiper/css/navigation";

function HomeBanner() {
  const bannerImages = [
    { img: banner1, id: uuidv4() },
    { img: banner2, id: uuidv4() },
    { img: banner3, id: uuidv4() },
  ];
  return (
    <div className="mt-3 bg-white">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={10}
        slidesPerView={1}
        navigation
        autoplay
      >
        {bannerImages.map((item) => (
          <SwiperSlide key={item.id}>
            <img
              src={item.img}
              alt={item.img}
              loading="lazy"
              className="mx-auto"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default HomeBanner;
