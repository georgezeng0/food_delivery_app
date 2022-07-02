import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getCuisines,updateSort } from '../features/restaurantSlice';

const FilterSearch = () => {
    const dispatch = useDispatch()
    const { restaurants, isLoading, form: { cuisineList },
    sort:{search,cuisine,sort,sortList}} = useSelector(state => state.restaurant);
    
    useEffect(() => {
        if (restaurants) {
            dispatch(getCuisines())
        }
    }, [restaurants])

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        dispatch(updateSort({name,value}))
      }
    

    return (
        <section>
            <div>
                <label htmlFor="search">Search by Name: </label>
                <input type="text" id="search" name="search"
                    disabled={isLoading && true}
                    value={search}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="cuisine">Cuisine: </label>
                <select name="cuisine" id="cuisine"
                    disabled={isLoading && true}
                    value={cuisine}
                    onChange={handleChange}
                >
                    <option value="all">All cuisines</option>
                    {cuisineList.map((c, i) => {
                        return <option key={i} value={c}>
                            {c}
                        </option>
                    })}

                </select>
            </div>

            <div>
                <label htmlFor="sort">Sort by: </label>
                <select name="sort" id="sort"
                    disabled={isLoading && true}
                    value={sort}
                    onChange={handleChange}
                >
                    <option value="none">----</option>
                    {sortList.map((x, i) => {
                        return <option key={i} value={x}>
                            {x}
                        </option>
                    })}
                </select>
            </div>
    </section>
  )
}

export default FilterSearch