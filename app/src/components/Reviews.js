import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import StarRatings from 'react-star-ratings';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { getRestaurants } from '../features/restaurantSlice';
import { clearForm, deleteReview, getReviews, resetSuccess,editMode, updateRating } from '../features/reviewSlice';
import Loading from './Loading';
import { TiUser } from 'react-icons/ti'

const Reviews = ({ r_id }) => {
    const dispatch = useDispatch();
    const {
        isLoading, error: { isLoadError, LoadMessage, isError, message },
        success: { APIsuccess, successType },
        reviews
    } = useSelector(state => state.review)
    const { user } = useSelector(state=>state.user)

    useEffect(() => {
      dispatch(getReviews(r_id))
    }, [])

    useEffect(() => {
        if (reviews.length > 0 && reviews[0].restaurant === r_id) {
            dispatch(updateRating(r_id))
        }
        else if (reviews.length === 0) {
            dispatch(updateRating(r_id))
        }
    }, [reviews])

    // Error actions
    useEffect(() => {
        if (isLoadError) {
            toast.error(`ERROR - ${LoadMessage}`)
        } 
        if (isError){
            toast.error(`ERROR - ${message}`)
            }
    }, [isLoadError])
    
    // Success actions
    useEffect(() => {
        if (APIsuccess) {
            if (successType === "DELETE_REVIEW") {
                dispatch(clearForm());
                dispatch(getReviews(r_id))
                dispatch(getRestaurants());
                toast.success('Review Deleted.');
                dispatch(resetSuccess())
            }
        }
    },[APIsuccess])
    
  return (
      <Wrapper>
          <h2 className='title'>Reviews</h2>
          {isLoading ? <Loading /> :
              (isLoadError ?
                  <h3>Error Loading Reviews</h3>
                  :
                  reviews.length === 0 ?
                          <h3>Nobody has reviewed this restaurant yet... Why don't you leave one below?</h3> :
                          reviews.map(review => {
                              const { rev_id, title, body, rating, restaurant, author } = review
                              return <article key={rev_id} className='review'>
                                  <div className="rating-container">
                                      <StarRatings
                                          className="rating"
                                          rating={rating}
                                          isAggregateRating
                                          starRatedColor="gold"
                                          numberOfStars={5}
                                          starDimension='15px'
                                      />
                                  </div>
                                  <h3>{title}</h3>
                                  <p>{body}</p>
                          
                                  <div className='btn-container'>
                                      <span><TiUser /> {author}</span>
                                      {author === user.email &&
                                          <div>
                                              <button onClick={() => dispatch(deleteReview(rev_id))}>Delete Review</button>
                                              <button onClick={() => dispatch(editMode({ rev_id, title, body, rating }))}>Edit Review</button>
                                          </div>}
                                  </div>
                          
                          
                              </article>
                          })
                )
          }
    </Wrapper>
  )
}

const Wrapper = styled.section`
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
h3{
    text-align: center;
}
.title{
    width: 100%;
    text-align: center;
    margin: 0;
    margin-top: 50px;
  padding: 10px;
  border-top: 10px solid var(--tertiary-1);
  border-bottom: 5px solid var(--tertiary-1);
  box-sizing: border-box;
}
.review{
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 5px solid var(--tertiary-1);
    border-radius: 10px;
    margin-top: 20px;
    h3 {
        margin: 2px 0px;
    }
    p {
        margin: 5px;
    }
 .btn-container{
    display: flex;
    background-color: var(--tertiary-1);
    justify-content: space-between;
    align-items: center;
    padding: 4px 2px 0px;
    height: auto;
    button{
        background-color: var(--tertiary-1)
    }
    span{
        padding-left: 10px;
        color: white;
        display: flex;
        align-items: center;
        margin-bottom: 2px;
    }
 }   
}
.rating-container{
    padding-top: 6px;
}
`

export default Reviews