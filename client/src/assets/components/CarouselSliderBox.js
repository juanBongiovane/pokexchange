import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import "swiper/css";
import { Paper, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

SwiperCore.use([Navigation]);

export default function Carousel({ components }) {
    return (
        <div style={{ position: "relative", width: "25%", margin: "0 auto" }}>
            <Swiper
                spaceBetween={30}
                slidesPerView={1.2}
                centeredSlides={true}
                loop={true}
                navigation={{
                    prevEl: ".swiper-button-prev",
                    nextEl: ".swiper-button-next",
                }}
                className="mySwiper"
            >
                {components.map((component, index) => (
                    <SwiperSlide key={index}>
                        <Paper>{component}</Paper>
                    </SwiperSlide>
                ))}
            </Swiper>
            <IconButton
                className="swiper-button-prev"
                style={{
                    position: "absolute",
                    left: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 1,
                }}
            >
                <ArrowBackIos />
            </IconButton>
            <IconButton
                className="swiper-button-next"
                style={{
                    position: "absolute",
                    right: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 1,
                }}
            >
                <ArrowForwardIos />
            </IconButton>
        </div>
    );
}
