import styled from "styled-components"
import ScreenSizes from '../mediaVariables'

export default styled.main`
padding-top: calc(var(--nav-height) + 20px);
display: flex;
justify-content: center;
.form-container{
    width: 70%;
    min-width: 300px;
    max-width: var(--max-width);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px;
    border-radius: 40px;
    overflow: hidden;
    box-shadow: 0px 0px 5px 5px var(--grey-3);
}
.form-container-dish{
    max-width: 500px;
}
h1{
    margin-top: 5px;
}
.form{
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.form-row{
    display: flex;
    flex-direction: column;
    align-items: center;
    input{
        text-align: center;
        width: 80%;
        margin-top: 5px;
    }
    margin-top: 10px;
}
fieldset{
    display: flex;
    flex-wrap: wrap;
    width: 75%;
    justify-content: space-around;
}
.cuisine-input{
    margin-top: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
#name{
    width: 100%
}
#pricepoint{
    width: 100%;
}
#location{
    width: 200px;
}
#open, #close {
    width: 180px;
}
#image{
    width: 75%;
    padding: 10px;
    border: 2px solid var(--secondary-2);
}
.preview-container{
    position: relative;
}
#preview-text{
    position: absolute;
    top: 40%;
    width: 100%;
    text-align: center;
    font-size: 1.2rem;
    color: white;
    text-shadow: 0px 0px 5px black;
}
.preview-img{
    width: 250px;
    margin: 5px
}
button {
    margin: 20px 20px 50px;
}
.old-image-container{
    width: 90%;
    height: 100%;
    img{
        width: 100%;
        height: 100%;
        object-fit: contain;
        margin: 10px 0px;
        border: 3px solid grey;
        box-sizing: border-box;
    }
}
#category{
    margin-top: 5px;
}
@media (max-width: 500px) {
.form-container{
    width: 100%;
    box-shadow: none;
    border-radius: none;
    transition: 0.4s;
}
}
`