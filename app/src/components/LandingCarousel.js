import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import styled from 'styled-components'

const LandingCarousel = () => {

    const images = [
        "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80&",
        "https://images.unsplash.com/photo-1585144570594-103ef55590b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1252&q=80",
        "https://images.unsplash.com/photo-1593189229346-9b7365e09777?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "https://images.unsplash.com/photo-1590947132387-155cc02f3212?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"

    ]

    return (
        <Wrapper>
            <Carousel
            autoPlay={true} dynamicHeight={false} infiniteLoop={true}
            showIndicators={false} showArrows={false} showThumbs={false}
            showStatus={false}
        >
            {images.map((link, i) => {
                return <div key={i} className='img-container'>
                    <img src={link}/>
                </div>
            })}
            
            </Carousel>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    .carousel-root {
        height:100%;
    }
    .carousel-slider{
        height:100%;
    }
    .slider-wrapper{
        height:100%;
    }
    .img-container{
        height:100% !important;
        img {
        object-fit: cover;
        height: 100%;
        width:100%;
        
    }
    }
    
`


export default LandingCarousel;

