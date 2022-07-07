import React from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'

const Restaurant = ({ restaurant: { r_id, r_name, image, location, cuisine } }) => {
    const navigate = useNavigate();
    const onClick = () => {
      navigate(`/restaurants/${r_id}`)
  }
  
    return (
      <Wrapper>
          <div className='img-container'>
            <img src={image} />
          </div>

          <div className='info-container'>
              <div className='name-container' onClick={onClick}>
                  <h3>{r_name}</h3>
                  <FiArrowRight className='arrow'/>
                </div>

                <div className="info">
                <div>
                    Ratings (X Reviews) 
                </div>
                <p>
                    {location}
                </p>              
                <p>
                        {
                            cuisine.map((c, i) => { 
                                if (i < (cuisine.length-1)) { return `${c}, ` }
                                else return c
                        })
                        }
                </p>
                </div>
          </div>
          
          
      </Wrapper>
    
  )
}

const Wrapper = styled.article`

    border: 2px solid var(--primary-5);
    margin: 5px 5px 0 5px;
    border-radius: 20px;
    display: flex;
    overflow: hidden;
    *{
        text-decoration: none;
    }
    .img-container{
        width: 40%;
        height: 150px;
        img{
            height:100%;
            width: 100%;
            object-fit:cover;
        }
    }
    .info-container{
        background-color: var(--white);
        border-left: 2px solid var(--primary-5);
        width: auto;
        flex-grow:1;
    }
    .name-container{
        background-color: var(--primary-3);
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        transition: 0.1s;
        * {
            color: var(--white);
            margin:0;
        }
        .arrow{
            font-size: 1.4rem;
        }
        :hover{
            cursor:pointer;
            background-color: var(--tertiary-1);
        }
    }
    .info{
        display: flex;
        flex-direction: column;
        padding: 10px;
        p {
            margin: 5px 0 0 0;
        }
    }
`

export default Restaurant