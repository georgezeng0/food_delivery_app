import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateForm, registerUser,emptyForm, setLocalUser } from '../features/userSlice'

const Register = () => {
    const {user,form: {email, name, password, location}} = useSelector(state=>state.user)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        if (email && name && password && location) {
            dispatch(registerUser())
        } else {
            alert("Need to fill out all fields!")
        }
    }

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        dispatch(updateForm({ name, value }))
    }

    // Navigate if user successful via useEffect
    useEffect(() => {
        if (user.token) {
            dispatch(setLocalUser())
            dispatch(emptyForm())
            navigate('/restaurants')
        }
    }, [user])

    useEffect(() => {
        dispatch(emptyForm())
    },[])

  return (
      <main>
          <h1>Register</h1>
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
                    <label htmlFor="name">Name</label>
                      <input type="text" id="name"
                          name="name" value={name}
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

                  <div>
                    <label htmlFor="location">Postcode</label>
                      <input type="text" id="location"
                          name="location" value={location}
                          onChange={handleChange}
                      />
                  </div>

                  <button>Submit</button>
              </form>
          </div>
    </main>
  )
}

export default Register