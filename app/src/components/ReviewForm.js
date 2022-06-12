import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { createReview, updateForm,editReview,clearForm,getReviews,resetSuccess, populateForm } from '../features/reviewSlice'
import { getRestaurants } from '../features/restaurantSlice';
import Loading from './Loading';

const ReviewForm = ({r_id}) => {
    const dispatch = useDispatch();
    const {
        isLoading, error: { isError, message },
        success: { APIsuccess, successType },
        reviews,
        edit: {
            isEdit, edit_id },
        form: {
            title,rating,body
        }
    } = useSelector(state => state.review)
    
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!isEdit) {
            dispatch(createReview(r_id))
        } else {
            dispatch(editReview(edit_id))
        }
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        dispatch(updateForm({name,value}))
    }

    // Success actions
    useEffect(() => {
        if (APIsuccess) {
            if (successType === "CREATE_REVIEW") {
                dispatch(clearForm());
                dispatch(getReviews(r_id));
                dispatch(getRestaurants());
                toast.success('Thanks for reviewing!');
                dispatch(resetSuccess())
            }
            if (successType === "EDIT_REVIEW") {
                dispatch(clearForm());
                dispatch(getReviews(r_id));
                dispatch(getRestaurants());
                toast.success('Review updated.');
                dispatch(resetSuccess())
            }
        } 
    },[APIsuccess])

    // Error actions
    useEffect(() => {
        if (isError) {
          toast.error(`ERROR - ${message}`)
      }
    }, [isError])
    

  return (
      <section>
          <h3>{isEdit? 'Editing review':'Leave a Review'}</h3>
          <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Review Title</label>
                    <input type="text" id="title" name="title"
                          value={title}
                          onChange={handleChange} />
              </div>
              <div>
                    <label htmlFor="body">Review Body</label>
                    <textarea type="text" id="body" name="body"
                        value={body}
                        onChange={handleChange}>
                    </textarea>
              </div>
              <div>
                    <label htmlFor="rating">Rating</label>
                    <input type="range" id="rating" name="rating"
                          value={rating} min="0" max="5"
                          onChange={handleChange} />
              </div>
              {isLoading ? <Loading /> :
                  <button>Submit</button>}
          </form>
    </section>
  )
}

export default ReviewForm