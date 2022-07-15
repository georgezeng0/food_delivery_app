import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Loading } from '../components'
import { updateForm, editUser,populateForm, setLocalUser, emptyForm } from '../features/userSlice'
import Wrapper from '../utils/wrappers/loginWrapper'

const UserProfile = () => {
    const { user,isLoading, error:{isError, message}, success,
        form: { email, name, password, location } } = useSelector(state => state.user)

    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (email && name && location) {
            dispatch(editUser())
        } else {
            toast.error('Please fill out required fields.')
        }
    }

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        dispatch(updateForm({ name, value }))
    }

    useEffect(() => {
        dispatch(populateForm())
        dispatch(setLocalUser())
    }, [user])
    
    useEffect(() => {
        if (success) {
            toast.success('Profile updated.')
        }
    }, [success])
    
    useEffect(() => {
        if (isError) {
            toast.error(`ERROR - ${message}`)
        }
    },[isError])

    return (
      <Wrapper>
            <img src="https://res.cloudinary.com/dvaeeygzx/image/upload/v1657557621/food_delivery_app/brooke-lark-wMzx2nBdeng-unsplash_yp4l3m.jpg" alt="" />
            <div className="central-container">
            <h1>Your Profile</h1>
            <div className='form-container'> 
              <form onSubmit={handleSubmit} className='form'>
                  <div className='form-row'>
                    <label htmlFor="email">E-mail</label>
                      <input type="email" id="email"
                          name="email" value={email}
                          onChange={handleChange}
                      />
                  </div>

                  <div className='form-row'>
                    <label htmlFor="name">Name</label>
                      <input type="text" id="name"
                          name="name" value={name}
                          onChange={handleChange}
                      />
                  </div>

                  <div className='form-row'>
                    <label htmlFor="password">New Password</label>
                      <input type="password" id="password"
                          name="password" value={password}
                          onChange={handleChange}
                      />
                  </div>

                  <div className='form-row'>
                    <label htmlFor="location">Postcode</label>
                      <input type="text" id="location"
                          name="location" value={location}
                          onChange={handleChange}
                      />
                  </div>

                  {isLoading ? <Loading /> :
                      <button className='global-button'>Edit Profile</button>}
              </form>
            </div>
            </div>

     </Wrapper>
  )
}

export default UserProfile