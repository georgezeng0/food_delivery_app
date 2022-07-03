import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
      <div>
          <button disabled={isLoading} onClick={()=>handleFilter("all")}>All</button>
          <button disabled={isLoading} onClick={()=>handleFilter("starred")}>Popular</button>
          <button disabled={isLoading} onClick={()=>handleFilter("starter")}>Starters</button>
          <button disabled={isLoading} onClick={()=>handleFilter("main")}>Main Courses</button>
          <button disabled={isLoading} onClick={()=>handleFilter("side")}>Sides</button>
          <button disabled={isLoading} onClick={()=>handleFilter("dessert")}>Desserts</button>
          <button disabled={isLoading} onClick={()=>handleFilter("drink")}>Drinks</button>          
    </div>
  )
}

export default DishFilter