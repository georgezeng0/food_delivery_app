import React from 'react'
import styled from 'styled-components'
import { useNavigate,Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import StarRatings from 'react-star-ratings';

const Restaurant = ({ restaurant: { r_id, r_name, image, location, cuisine, rating } }) => {
    const navigate = useNavigate();
  
    return (
      <Wrapper>
          <div className='img-container'>
            <img src={image} />
          </div>

          <div className='info-container'>
              <Link to={`/restaurants/${r_id}`}><div className='name-container'>
                  <h3>{r_name}</h3>
                  <FiArrowRight className='arrow'/>
                </div>
                </Link>

                <div className="info">
                <div className='rating-container'>
                        <StarRatings
                            className="rating"
                            rating={rating}
                            isAggregateRating
                            starRatedColor="gold"
                            numberOfStars={5}
                            starDimension='15px'
                        />
                </div>
                <p>
                    {location}
                </p>              
                <p>
                        {
                            cuisine && cuisine.map((c, i) => { 
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
    background-color: white;
    border: 2px solid var(--primary-5);
    margin: 5px 5px 0 5px;
    border-radius: 20px;
    display: flex;
    overflow: hidden;
    *{
        text-decoration: none;
    }
    .img-container{
        flex-shrink:0;
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
    .rating{

    }
    .rating-container{
        height: auto;
    }
`

export default Restaurant