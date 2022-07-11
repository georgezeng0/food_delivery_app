import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Loading } from '../components'
import { updateForm, registerUser,emptyForm, setLocalUser, resetSuccess } from '../features/userSlice'
import Wrapper from '../utils/wrappers/loginWrapper'

const Register = () => {
    const { user, isLoading, success,
        error: { isError, message },
        form: { email, name, password, location } } = useSelector(state => state.user)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        if (email && name && password && location) {
            dispatch(registerUser())
        } else {
            toast.error('Please fill out all fields.')
        }
    }

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        dispatch(updateForm({ name, value }))
    }

    // Navigate if user successful via useEffect
    useEffect(() => {
        if (user.token && success) {
            dispatch(setLocalUser())
            dispatch(emptyForm())
            dispatch(resetSuccess())
            toast.success(`Hi ${user.name} - Thanks for signing up!`)
            navigate('/restaurants')
        }
    }, [user])

    useEffect(() => {
        if (isError) {
            toast.error(`ERROR - ${message}`)
        }
    },[isError])

    useEffect(() => {
        dispatch(emptyForm())
        if (user.token) {
        toast.success(`You are already signed up.`)
        navigate('/restaurants')
        }
    },[])

  return (
      <Wrapper>
          <img src="https://res.cloudinary.com/dvaeeygzx/image/upload/v1657557621/food_delivery_app/brooke-lark-wMzx2nBdeng-unsplash_yp4l3m.jpg" alt="" />
          <div className="central-container">
          <h1>Register</h1>
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

                  <div  className='form-row'>
                    <label htmlFor="password">Password</label>
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
                      <button className='global-button'>Register</button>}
                  </form>
                  <p>
          Already registered? <Link to='/login'>Login Here</Link>
        </p>
              </div>
             
              </div>
    </Wrapper>
  )
}

export default Register