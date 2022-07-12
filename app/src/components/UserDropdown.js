import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { logout } from '../features/userSlice'
import { MdClose } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const UserDropdown = ({ user, toggleUserDropdown, showUser }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    return (
        <Wrapper show={showUser ? true : false}>
            <div className='border-container'>
            
          <div className='close-button-container'>
              <MdClose className='close-btn' onClick={toggleUserDropdown} />
          </div>
          <div className='user-info'>
              <span>
              {user.token ?
                  `Hi ${user.name}` :
                  `Not logged in.`
                  }
                </span>
          </div>
          {user.token? 
              <div className='user-links'>
                  {/* User Profile */}
                  <Link className='side-nav-link' to="/user_profile" onClick={toggleUserDropdown}>
                    <span>User Profile</span>
                  </Link>
                  {/* Logout */}
                        <button className='side-nav-link logout' onClick={() => {
                            toggleUserDropdown()
                            dispatch(logout())
                            toast.success("Successfully logged out.")
                            navigate('/restaurants')
                        }}>
                      <span>Logout</span>
                  </button>


              </div> :
              <div className='user-links'>
                  {/* Log in */}
                  <Link className='side-nav-link' to="/login" onClick={toggleUserDropdown}>
                      <span>Login</span>
                  </Link>
                  {/* Register */}
                  <Link className='side-nav-link' to="/register" onClick={toggleUserDropdown}>
                      <span>Register</span>
                  </Link>
              </div>
            }
            </div>
          
    </Wrapper>
  )
}

const Wrapper = styled.section`
    position: absolute;
    top: var(--nav-height);
    right: 0;
    width: 300px;
    box-sizing: border-box;
    max-height: ${props=> props.show? "300px":"0px"};
    background-color: var(--white);
    z-index: 5;
    display: flex;
    flex-direction: column;
    transition: max-height 0.5s;
    overflow-y: hidden;
    .border-container{
        border: 2px solid var(--grey-5);
    border-right: none;
    }
    .close-btn{
        font-size: 2rem;
        color: var(--red-dark);
        transition: all 0.4s;
        :hover{
            cursor:pointer;
            color: var(--red-light)
        }
    }
    .close-button-container{
        display:flex;
        justify-content: flex-end;
        background-color: var(--white);
    }
    .user-info{
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 5px;
    }
    .user-links{
        display:flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 10px;
    }
    .side-nav-link{
        color: var(--primary-7);
      font-weight: 600;
      font-size: 1rem;
      transition: background-color 0.3s;
      height:2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      background-color: var(--white);
      margin-bottom: 5px;
        width: 80%;
        border-radius: 10px;
        border: 2px solid var(--grey-3);
      span{
        transition:0.2s;
      }
      :hover{
        background-color: var(--tertiary-1);
        color: white;
      }
    }
    .logout{
        height: 2.4rem;
        background-color: var(--red-dark);
        color: white;
        :hover{
            background-color: var(--red-light);
        }
    }
`

export default UserDropdown