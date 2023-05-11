import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import "swiper/css";
import { Paper, IconButton } from "@mui/material";
import { ArrowForwardIos } from "@mui/icons-material";
import "../../assets/styles/carousel.css"


SwiperCore.use([Navigation]);

export default function Carousel({ children }) {

    return (
        <div className="carousel-container" >
            <div className="carousel-box">
                <div className="carousel">
                    <Swiper
                        spaceBetween={30}
                        slidesPerView={1}
                        centeredSlides={true}
                        loop={true}
                        speed={1600}
                        navigation={{
                            prevEl: ".swiper-button-prev",
                            nextEl: ".swiper-button-next",
                        }}
                        className="mySwiper"
                    >
                        {children.map((component, index) => (
                            <SwiperSlide key={index}>
                                <Paper>{component}</Paper>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <IconButton
                        className="swiper-button-prev"
                        style={{
                            position: "absolute",
                            left: "-40px",
                            top: "50%",
                            transform: "translateY(-50%) rotate(-180deg)",
                            zIndex: 1,
                            color: "white",
                            fontSize: "xxx-large"
                        }}
                    >
                        <ArrowForwardIos fontSize={"inherit"}/>
                    </IconButton>
                    <IconButton
                        className="swiper-button-next"
                        style={{
                            position: "absolute",
                            right: "-40px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            zIndex: 1,
                            color: "white",
                            fontSize: "xxx-large"
                        }}
                    >
                        <ArrowForwardIos fontSize={"inherit"}/>
                    </IconButton>
                </div>
            </div>
        </div>
    );
}
