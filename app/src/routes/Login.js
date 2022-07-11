import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { updateForm, loginUser, emptyForm, setLocalUser } from '../features/userSlice'
import { Loading } from '../components'
import Wrapper from '../utils/wrappers/loginWrapper'

const Login = () => {
  const { user, isLoading, error:{isError, message},
    form: { email, password } } = useSelector(state => state.user)

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // to get the location state from a redirect

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email && password) {
      dispatch(loginUser())
    } else {
      toast.error('Please fill out all fields.')
    }
  }
  
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    dispatch(updateForm({ name, value }))
  }
  
  useEffect(() => {
    dispatch(emptyForm())
  }, [])
  
  useEffect(() => {
    if (user.token) {
      dispatch(setLocalUser())
      dispatch(emptyForm())
      toast.success(`Welcome back ${user.name}`)
      if (location.state?.from) {
        navigate(location.state.from) // If location.state.from exists (from protected route) > go back on login
      } else {
        navigate('/restaurants')
      }
    }
}, [user])

  useEffect(() => {
    if (isError) {
      toast.error(`ERROR - ${message}`)
    }
  },[isError])
  
return (
  <Wrapper>
    <img src="https://res.cloudinary.com/dvaeeygzx/image/upload/v1657557621/food_delivery_app/brooke-lark-wMzx2nBdeng-unsplash_yp4l3m.jpg" alt="" />
    <div className="central-container">
      <h1>Welcome Back</h1>
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
                <label htmlFor="password">Password</label>
                <input type="password" id="password"
                          name="password" value={password}
                          onChange={handleChange}
                      />
              </div>

              {isLoading ? <Loading /> :
                      <button className='global-button'>Login</button>}
        </form>
        <p>
          Not a member? <Link to='/register'>Register Here</Link>
        </p>
      </div>
      </div>
</Wrapper>
)
}



export default Login