import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import foods from '../resources/landing_foods.bmp'
import ScreenSizes from '../utils/mediaVariables'
import LandingCarousel from '../components/LandingCarousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Landing = () => {

  return (
    <Wrapper>
      <div className='container'>
        <div className='content-container'>
          <div className='top-container'>
            <div className='title-container'>
              <h1 className='title'>Food Delivery App</h1>
              <h4 className='title'>Probably need a less generic name...</h4>
              <div className='btn-container'>
              <Link to='/restaurants' className='button-66'>I'm Hungry</Link>
              </div>
              </div>
            <div className='hero-container'>
              <img src={foods} alt="" />
            </div>
          </div>
          <div className='bottom-container'>
            <div className='carousel'>
              <LandingCarousel/>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.main`
  height: calc(100vh - var(--nav-height));
  min-height: 800px;
  padding: 2% 2% 2%;
  box-sizing: border-box;
  background-color: var(--white);
  display:flex;
  justify-content: center;
  h1 {
    margin: 0;
  }
  h3 {
    margin: 0;
  }
  .container {
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    max-width: var(--max-width);
    background-color: var(--primary-3);
    border-radius: 1rem
  }
  .content-container {
    height:100%;
    display: flex;
    flex-direction: column;
  }
  .top-container {
    display: flex;
    height:60%;
  }
  .title-container {
    font-size: 2rem;
    color: var(--white);
    width:60%;
    flex-grow: 1;
    padding-top: 1rem;
    padding-left: 0.5rem;
    text-align: center;
    transition: all 1s;
    display: flex;
    flex-direction: column;
    justify-content: center;

  }
  .hero-container {
    width:40%;
    overflow:hidden;
    transition: all .5s ease;
    img {
      max-height: 90%;
    }
  }
  .bottom-container {
    border-radius: 1rem;
    height: 40%;
  }
  .btn-container {
    display:flex;
    justify-content: center;
  }
  .carousel{
    border-bottom-right-radius: 1rem;
    border-bottom-left-radius: 1rem;
    height: 100%;
    background-color: var(--primary-5);
  }
  
  @media (max-width: 1174px) {
    .hero-container {
      overflow:hidden;
    height:0;
    width:0px;
    transition: all .5s ease;
    }
  }

  @media (max-width: ${ScreenSizes.breakpoint_md}) {
    padding: 0;
    padding-top: 1rem;
    .title-container {
    font-size: 1.5rem;
    }
  }
  /* Taken from https://getcssscan.com/css-buttons-examples */
  .button-66 {
    background-color: #0a6bff;
    border-radius: 4px;
    border: 0;
    box-shadow: rgba(1,60,136,.5) 0 -1px 3px 0 inset,rgba(0,44,97,.1) 0 3px 6px 0;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    display: inherit;
    font-family: "Space Grotesk",-apple-system,system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
    font-size: 18px;
    font-weight: 700;
    line-height: 24px;
    margin: 0;
    min-height: 56px;
    min-width: 120px;
    padding: 16px 20px;
    position: relative;
    text-align: center;
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    vertical-align: baseline;
    transition: all .2s cubic-bezier(.22, .61, .36, 1);
  }

  .button-66:hover {
    background-color: #065dd8;
    transform: translateY(-2px);
  }

  @media (min-width: 768px) {
    .button-66 {
      padding: 16px 44px;
      min-width: 150px;
    }
  }
`;

export default Landing