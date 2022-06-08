import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateForm, loginUser, emptyForm } from '../features/userSlice'

const Login = () => {
  const {user,form: {email, password}} = useSelector(state=>state.user)

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(loginUser())
  }
  
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    dispatch(updateForm({ name, value }))
  }
  
  useEffect(() => {
    dispatch(emptyForm())
  },[])

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

              <button>Submit</button>
          </form>
      </div>
</main>
)
}

export default Login