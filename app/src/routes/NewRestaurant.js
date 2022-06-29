import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createRestaurant, addImageUrl, editRestaurant, getRestaurants, emptyForm,
    updateForm, getCuisines, populateForm, resetSuccess } from '../features/restaurantSlice'
import { Loading } from '../components'
import { toast } from 'react-toastify'
import axios from 'axios'

const NewRestaurant = () => {
    let {
        restaurants,
        isLoading,
        error: { isError, message },
        success: { APIsuccess, newRestaurantId, successType },
        form: { r_name, cuisine, pricepoint, location, open, close, cuisineList }
        } = useSelector(state => state.restaurant)

    const [isEdit, setIsEdit] = useState(false);
    const [image, setImage] = useState('');

    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { r_id:id } = useParams();   

    useEffect(() => {
        dispatch(resetSuccess())
        if (restaurants.length === 0) {
            dispatch(getRestaurants())
        } 
        if (id) {
            setIsEdit(true);
            dispatch(populateForm(id))
        } else {
            dispatch(emptyForm())
        }
        dispatch(getCuisines()) // Gets the list of cuisines for the form dynamically
    }, [restaurants]);

    // Uses cloudinary upload API
    const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`
    const imageUpload = async () => {
        const formData = new FormData();
        // Update formData object to send to cloudinary
        formData.append("file", image)
        formData.append("upload_preset",process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)
        formData.append("folder","food_delivery_app") // folder on cloudinary
        try {
            const res = await axios.post(url, formData,
                {
                    transformRequest: (data, headers) => {
                        headers["X-Requested-With"]="XMLHttpRequest"
                        delete headers['Authorization'];
                        return data;
                    }
                })
            return res.data.url
        } catch (error) {
            console.log(error);
            toast.error("Error uploading image")
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!r_name || cuisine.length == 0 || !location) {
            toast.error('Please fill out all fields.')
        } else { 
                if (!isEdit) {
                    if (image) {
                        const res = await imageUpload()
                        if (res) {
                            dispatch(addImageUrl(res))
                            dispatch(createRestaurant());
                        }
                    } else {
                        dispatch(createRestaurant());
                    }
                } else {
                    dispatch(editRestaurant(id));
                }
        
        }
    }

    const handleChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        const checked = e.target.checked;
        dispatch(updateForm({name,value,checked}))
    }

    // Successful restaurant creation
    useEffect(() => {
        if (newRestaurantId) {
            dispatch(resetSuccess())
            toast.success('Here is your new restaurant!')
            navigate(`/restaurants/${newRestaurantId}`)
        }
        if (successType === 'EDIT_RESTAURANT') {
            dispatch(resetSuccess()) 
            toast.success('Restaurant updated.')
            navigate(`/restaurants/${id}`)
        }
    },[APIsuccess])

    // Error 
    useEffect(() => {
        if (isError) {
            toast.error(`ERROR - ${message}`)
        }
    },[isError])

  return (
      <main>
          <h1>{`${isEdit? "Edit":"New"} Restaurant`}</h1>
          <div>
              <form onSubmit={handleSubmit}>
                  {/* Name text form */}
                  <div>
                      <label htmlFor="name">Restaurant Name</label>
                      <input type="text" id="name" name="r_name"
                          value={r_name}
                          onChange={handleChange} />
                  </div>
                  {/* Cuisines checkbox */}
                  <div>
                      <legend>Cuisine</legend>
                      <fieldset>
                  {cuisineList.map((item,i)=> {
                      return <div key={i}>
                          <label htmlFor={item}>{item}</label>
                          <input type="checkbox" name="cuisine"
                              value={item} id={item}
                              onChange={handleChange}
                              checked={cuisine.includes(item)? true:false}
                          />
                          </div>
                    })}
                          </fieldset>
                  </div>
                  {/* Pricepoint range */}
                  <div>
                      <label htmlFor="pricepoint">Pricepoint</label>
                      <input type="range" id="pricepoint" name="pricepoint"
                          value={pricepoint} min="1" max="3"
                          onChange={handleChange} />
                  </div>
                  {/* Location textform */}
                  <div>
                      <label htmlFor="location">Postcode</label>
                      <input type="text" id="location" name="location"
                            value={location}
                            onChange={handleChange}/>
                  </div>
                  {/* Open and close times */}
                  <div>
                      <label htmlFor="open">Open</label>
                      <input type="time" id="open" name="open"
                            value={open}
                            onChange={handleChange}/>
                      <label htmlFor="close">Close</label>
                      <input type="time" id="close" name="close"
                            value={close}
                            onChange={handleChange}/>
                  </div>

                  {/* Image */}
                  <div>
                      <label htmlFor="image">Select Image</label>
                      <input type="file" accept="image/*" name="image" id="image"
                            onChange={e=>setImage(e.target.files[0])}
                      />
                  </div>

                  {isLoading ?
                    <Loading/>:
                    <button>Submit</button>
                    }
                  

              </form>
          </div>
    </main>
  )
}

export default NewRestaurant