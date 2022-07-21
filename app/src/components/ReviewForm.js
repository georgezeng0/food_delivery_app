import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { createReview, updateForm,editReview,clearForm,getReviews,resetSuccess, populateForm } from '../features/reviewSlice'
import { getRestaurants } from '../features/restaurantSlice';
import Loading from './Loading';
import styled from 'styled-components';
import StarRatings from 'react-star-ratings';
import { useNavigate } from 'react-router-dom'

const ReviewForm = ({r_id}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
    const { user: { email } } = useSelector(state=>state.user)
    
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!email) {
            navigate('/login')
            return
        }
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

    const handleRating = (rating) => {
        dispatch(updateForm({name:'rating',value: rating}))
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
      <Wrapper>
          <h3>{isEdit? 'Editing review':'Leave a Review'}</h3>
          <form onSubmit={handleSubmit} className='form'>
          <div className='input-container'>
                  <label htmlFor="rating">Select Rating</label>
                  <StarRatings
                            className="rating"
                      rating={rating}
                      changeRating={handleRating}
                            isAggregateRating
                      starRatedColor="gold"
                      starHoverColor="gold"
                            numberOfStars={5}
                      starDimension='15px'
                      name='rating'
                              />
              </div>
                <div className='input-container'>
                    <label htmlFor="title">Review Title</label>
                    <input type="text" id="title" name="title"
                          value={title}
                          onChange={handleChange} />
              </div>
              <div className='input-container'>
                    <label htmlFor="body">Review Text</label>
                    <textarea type="text" id="body" name="body"
                        value={body}
                      onChange={handleChange}
                      rows="5"
                  >
                      
                    </textarea>
              </div>
              
              {isLoading ? <Loading /> :
                  <button>Submit</button>}
          </form>
    </Wrapper>
  )
}

const Wrapper = styled.section`
border-radius: 15px;
padding: 10px;
margin-top: 25px;
box-shadow: 0px 0px 5px 5px var(--grey-2);
background-color: var(--tertiary-6);
width: 90%;
display: flex;
flex-direction: column;
align-items: center;
.form{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.input-container{
    display: flex;
    flex-direction: column;
    width: 75%;
    align-items: center;
    margin-top: 5px;
    input, textarea{
        width: 100%;
    }
    label{
        margin-bottom: 5px;
    }
}
button {
    margin-top: 10px;
    font-weight: 600;
    border: none;
    background-color:  var(--tertiary-6);
    color: var(--tertiary-5);
    :hover{
        cursor: pointer;
    }
}
`

export default ReviewForm