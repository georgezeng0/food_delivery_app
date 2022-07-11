import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { updateFilter, resetFilter } from '../features/dishSlice'
import ScreenSizes from '../utils/mediaVariables'

const DishFilter = () => {
    const { isLoading, filter } = useSelector(state => state.dish)
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
          <button
              disabled={isLoading} onClick={() => handleFilter("all")}
              className={`${filter==='' && 'selected'}`}
          >
              All</button>
          <button disabled={isLoading} onClick={() => handleFilter("starred")}
          className={`${filter==='starred' && 'selected'}`}
          >
              Popular</button>
          <button disabled={isLoading} onClick={() => handleFilter("starter")}
          className={`${filter==='starter' && 'selected'}`}
          >
              Starters</button>
          <button disabled={isLoading} onClick={() => handleFilter("main")}
          className={`${filter==='main' && 'selected'}`}
          >
              Main Courses</button>
          <button disabled={isLoading} onClick={() => handleFilter("side")}
          className={`${filter==='side' && 'selected'}`}
          >
              Sides</button>
          <button disabled={isLoading} onClick={() => handleFilter("dessert")}
          className={`${filter==='dessert' && 'selected'}`}
          >
              Desserts</button>
          <button disabled={isLoading} onClick={() => handleFilter("drink")}
          className={`${filter==='drink' && 'selected'}`}
          >
              Drinks</button>          
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
    background-color: var(--primary-3);
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
    width: fit-content;

}
button:first-child{
    border-left: 3px solid var(--primary-5);
}
.selected{
    background-color: var(--tertiary-1);
}
@media (max-width: ${ScreenSizes.breakpoint_md}){
button{
    font-size: 0.7rem;
}
}
@media (max-width: 560px){
    flex-wrap: wrap;
    button{
        border: none;
    }
    button:first-child{
    border-left: none;
}
}
`

export default DishFilter