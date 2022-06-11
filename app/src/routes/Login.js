import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { updateForm, loginUser, emptyForm, setLocalUser } from '../features/userSlice'
import { Loading } from '../components'

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
  <main>
      <h1>Login</h1>
      <div> 
          <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email">Email</label>
                <input type="email" id="email"
                          name="email" value={email}
                          onChange={handleChange}
                      />
              </div>

              <div>
                <label htmlFor="password">Password</label>
                <input type="password" id="password"
                          name="password" value={password}
                          onChange={handleChange}
                      />
              </div>

              {isLoading ? <Loading /> :
                      <button>Submit</button>}
          </form>
      </div>
</main>
)
}

export default Login