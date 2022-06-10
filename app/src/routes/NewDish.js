import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { updateForm,createDish,populateForm,editDish,getDishes, emptyForm, resetSuccess } from '../features/dishSlice'


const NewDish = () => {
    const {
        dishes,
        success: {APIsuccess,successType},
        form: { name, price, image, available, starred,category, restaurant }
        } = useSelector(state => state.dish)
    const { r_id, d_id } = useParams();

    const [isEdit, setIsEdit] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isEdit) {
            dispatch(createDish(r_id));
        } else {
            dispatch(editDish(d_id));
        }
    }

    useEffect(() => {
        dispatch(emptyForm())
        if (dishes.length === 0) {
            dispatch(getDishes('ALL'))
        }
    },[])

    useEffect(() => {
        if (d_id) {
            setIsEdit(true)
            dispatch(populateForm(d_id))
        }
    }, [dishes])

    // Success actions
    useEffect(() => {
        if (APIsuccess) {
            if (successType === 'CREATE_DISH') {
                dispatch(resetSuccess())
                navigate(`/restaurants/${r_id}`)
            }
            if (successType === 'EDIT_DISH') {
                dispatch(resetSuccess())
                navigate(`/restaurants/${restaurant}`)
            }
        }
    },[APIsuccess])

    // Error actions

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const checked = e.target.checked;
        dispatch(updateForm({name,value,checked}))
    }

    const checkSelect = (option = '') => {
        return option===category
    }

  return (
      <main>
          <h1>{`${isEdit ? "Edit" : "New"} Dish`}</h1>
          <div>
              <form onSubmit={handleSubmit}>
                {/* Name text form */}
                <div>
                      <label htmlFor="name">Name</label>
                      <input type="text" id="name" name="name"
                          value={name}
                          onChange={handleChange} />
                  </div>
                  {/* Price form*/}
                  <div>
                      <label htmlFor="price">Price</label>
                      <input type="number" id="price" name="price"
                          value={price/100} min="0.01" max="99.99" step="0.01"
                          onChange={handleChange} />
                  </div>
                  {/* Image form - consider changing to image upload w/ cloudinary*/}
                  <div>
                      <label htmlFor="image">Image Url</label>
                      <input type="text" id="image" name="image"
                          value={image}
                          onChange={handleChange} />
                  </div>
                  {/* Available  */}
                  <div>
                      <label htmlFor="available">Available</label>
                      <input type="checkbox" id="available" name="available"
                          value={available} checked={available}
                          onChange={handleChange} />
                  </div>
                  {/* Starred Dish */}
                  <div>
                      <label htmlFor="starred">Starred dish</label>
                      <input type="checkbox" id="starred" name="starred"
                          value={starred} checked={starred}
                          onChange={handleChange} />
                  </div>
                  {/* Category form */}
                  <div>
                      <label htmlFor="category">Category</label>
                      <select id="category" name="category" value={category} onChange={handleChange} >
                          <option value="" >--Select One--</option>
                          <option value="starter" >Starter</option>
                          <option value="main" >Main Course</option>
                          <option value="side" >Side</option>
                          <option value="dessert" >Dessert</option>
                          <option value="drink" >Drink</option>
                          </select>
                  </div>
                  <button>Submit</button>
              </form>
          </div>
    </main>
  )
}

export default NewDish