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
              <h1 className='title'>Deliver<span>Eat</span></h1>
              <h4 className='subtitle'>Freshly made food from authentic restaurants delivered to you...</h4>
              <div className='btn-container'>
              <Link to='/restaurants' className='button-66'>I'm Hungry</Link>
              </div>
              </div>
            <div className='hero-container'>
              <img src={foods} alt="" />
            </div>
          </div>
          <div className='gradient'></div>
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
  min-width: var(--min-width);
  height: 100vh;
  min-height: 570px;
  padding: calc(var(--nav-height) + 12px) 2% 2%;
  box-sizing: border-box;
  background-color: var(--white);
  display:flex;
  justify-content: center;
  h1 {
    margin: 0;
    span{
      color: var(--tertiary-1);
    }
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
    border-radius: 1rem;
    box-shadow: 0px 0px 10px 5px var(--grey-5);
  }
  .content-container {
    height:100%;
    display: flex;
    flex-direction: column;
  }
  .top-container {
    display: flex;
    height:53%;
    flex-grow:1;
    transition: all 1s;
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
    align-items: center;

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
    background-color: var(--tertiary-1);
  }
  .gradient{
    height: 60px;
    background-image: linear-gradient(var(--primary-3),var(--tertiary-1));
    transition: all 1s;
  }
  .subtitle{
    width: 80%
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
    padding-right:0;
    padding-left:0;
    padding-bottom:0;
    .title-container {
    font-size: 1.5rem;
    }
  }
  /* Taken from https://getcssscan.com/css-buttons-examples */
  .button-66 {
    background-color: var(--secondary-4);
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
  @media (max-width: ${ScreenSizes.breakpoint_sm}){
    .content-container{
      height: 100%;
    }
    .container{
      height:90%;
    }
    .title-container{
      font-size:1rem;
    }
    .top-container{
      height: 60%;
      flex-grow: 1;
    }
    .bottom-container{
      height: 40%;
      flex-grow: 0;
      overflow: hidden;
    }
    .button-66{
      font-size: 14px;
    font-weight: 600;
    line-height: 18px;
    min-height: 40px;
    min-width: 80px;
    padding: 10px 20px;
    }
  }
`;

export default Landing