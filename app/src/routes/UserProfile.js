import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Loading } from '../components'
import { updateForm, editUser,populateForm, setLocalUser, emptyForm } from '../features/userSlice'

const UserProfile = () => {
    const { user,isLoading, error:{isError, message}, success,
        form: { email, name, password, location } } = useSelector(state => state.user)

    const dispatch = useDispatch();

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
      <main>
            <h1>Your Profile</h1>
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
                    <label htmlFor="password">New Password</label>
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

                  {isLoading ? <Loading /> :
                      <button>Edit Profile</button>}
              </form>
          </div>

     </main>
  )
}

export default UserProfile