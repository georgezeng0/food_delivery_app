import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { updateFilter, resetFilter } from '../features/dishSlice'

const DishFilter = () => {
    const { isLoading } = useSelector(state => state.dish)
    const dispatch = useDispatch()

    const handleFilter = (category) => {
        if (category === "all") {
            dispatch(resetFilter())
        } else {
            dispatch(updateFilter(category))
        }
    }

  return (
      <Wrapper>
          <button disabled={isLoading} onClick={()=>handleFilter("all")}>All</button>
          <button disabled={isLoading} onClick={()=>handleFilter("starred")}>Popular</button>
          <button disabled={isLoading} onClick={()=>handleFilter("starter")}>Starters</button>
          <button disabled={isLoading} onClick={()=>handleFilter("main")}>Main Courses</button>
          <button disabled={isLoading} onClick={()=>handleFilter("side")}>Sides</button>
          <button disabled={isLoading} onClick={()=>handleFilter("dessert")}>Desserts</button>
          <button disabled={isLoading} onClick={()=>handleFilter("drink")}>Drinks</button>          
    </Wrapper>
  )
}

const Wrapper = styled.div`
width: 100%;
display: flex;
justify-content: center;
align-items: center;
background-color: var(--primary-3);
button{
    background-color: var(--primary-2);
    color: white;
    border: 0;
    border-right: 3px solid var(--primary-5);
    height: 2rem;
    transition: 0.2s;
    padding: 0px 20px 0px;
    :hover{
        cursor: pointer;
        background-color: var(--primary-1);
    }

}
button:first-child{
    border-left: 3px solid var(--primary-5);;
}
`

export default DishFilter