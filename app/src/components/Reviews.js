import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { getRestaurants } from '../features/restaurantSlice';
import { clearForm, deleteReview, getReviews, resetSuccess,editMode } from '../features/reviewSlice';
import Loading from './Loading';

const Reviews = ({ r_id }) => {
    const dispatch = useDispatch();
    const {
        isLoading, error: { isLoadError, LoadMessage, isError, message },
        success: { APIsuccess, successType },
        reviews
    } = useSelector(state=>state.review)

    useEffect(() => {
      dispatch(getReviews(r_id))
    }, [])

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
      <section>
          <h2>Reviews</h2>
          {isLoading ? <Loading /> :
              (isLoadError?
                  <h3>Error Loading Reviews</h3>
                  :
                  reviews.map(review => {
                      const { rev_id, title, body, rating, restaurant, author } = review
                      return <article key={rev_id}>
                          <h3>{title} - By {author}</h3>
                          <h5>Rating - {rating}</h5>
                          <p>{body}</p>
                          <button onClick={() => dispatch(deleteReview(rev_id))}>Delete Review</button>
                          <button onClick={()=>dispatch(editMode({rev_id,title,body,rating}))}>Edit Review</button>
                      </article>
                  })
                )
          }
    </section>
  )
}

export default Reviews