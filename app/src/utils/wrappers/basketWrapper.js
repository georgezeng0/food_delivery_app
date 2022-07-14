import styled from "styled-components";
import ScreenSizes from '../../utils/mediaVariables'

export default styled.main`
padding-top: calc( var(--nav-height) + 30px);
padding-bottom: 3rem;
display: flex;
flex-direction: column;
align-items:center;
min-width: 300px;
#title{
  text-align: center;
  width: auto;
  background-color: var(--tertiary-1);
  color: white;
  position: relative;
  padding: 5px 25px;
  margin-bottom:0;
  box-shadow: 0px -2.5px 2.5px 2.5px var(--grey-2);
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}
.horizontal-bar{
  height: 80px;
  width: 80%;
  max-width: var(--max-width);
  position: absolute;
  background-color: var(--primary-3);
  top: 255px;
}
.content-container{
  box-shadow: 0px 0px 5px 5px var(--grey-2);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  max-width: var(--max-width);
}
.restaurant-origin{
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 50px;
  width: 100%;
  box-sizing: border-box;
  h2{
    text-decoration: underline;
    margin-top: 0px;
  }
}
.restaurant-info{
  width: 80%;
}
.basket-container{
width: 100%;
padding: 20px;
display: flex;
justify-content: center;
box-sizing: border-box;
}
.totals-container.checkout{
    width: 70%;
    align-self: auto;
}
.totals-container{
  min-width: 400px;
  align-self: flex-end;
  padding: 20px;
  box-sizing: border-box;
}
.checkout-btn-container{
  padding: 0px 20px 20px;;
  box-sizing: border-box;
  align-self: flex-end;
  button{
    padding: 10px 30px;
    border-radius: 15px;
    background-color: var(--tertiary-1);
    color: white;
    font-weight: 600;
    font-size: 1.6rem;
    transition: 0.2s;
    :hover{
      cursor: pointer;
      background-color: var(--primary-3);
    }
  }
}
.empty-btn-container{
  background-color: var(--grey-1);
  width: 100%;
  border-top: 2px solid grey;
  padding: 20px 0px 20px;
  text-align: center;
  button{
    padding: 10px 30px;
    border-radius: 15px;
    background-color: var(--red-dark);
    color: white;
    font-weight: 600;
    font-size: 1rem;
    transition: 0.2s;
    :hover{
      cursor: pointer;
      background-color: var(--red-light);
    }
  }
}
.empty{
  height: 300px;
  justify-content: center;
  padding-bottom: 20px;
}
@media (max-width: ${ScreenSizes.breakpoint_md}){
  padding-bottom: 0;
  .content-container{
    width: 100%;
  }
  .horizontal-bar{
    width: 100%;
  }
  .restaurant-info{
    width: 100%;
  }
  .restaurant-origin{
    padding: 20px 5px;
  }
}
@media (max-width: ${ScreenSizes.breakpoint_sm}){
.totals-container{
  min-width: 250px;
}
}
`