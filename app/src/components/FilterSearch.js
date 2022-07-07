import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getCuisines,updateSort } from '../features/restaurantSlice';
import {FiSearch} from 'react-icons/fi'

const FilterSearch = () => {
    const dispatch = useDispatch()
    const { restaurants, isLoading, form: { cuisineList },
    sort:{search,cuisine,sort,sortList}} = useSelector(state => state.restaurant);
    const [scrollY, setScrollY] = useState('')

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
    
    const handleScroll = (e) => {
        setScrollY(window.scrollY);
    }
    
    useEffect(() => {    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);

    return (
        <Wrapper scrollY={scrollY}>
            <div>
                <h3>Craving something specific?</h3>
            </div>
            <div className='form-element searchbar'>
                <label htmlFor="search"><FiSearch/> </label>
                <input type="text" id="search" name="search"
                    disabled={isLoading && true}
                    value={search}
                    onChange={handleChange}
                    placeholder='Search by name'
                />
            </div>

            <div className='form-element cuisine-dropdown'>
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

            <div className='form-element sort-dropdown'>
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
    </Wrapper>
  )
}

const Wrapper = styled.section`
    display: flex; 
    flex-direction: column;
    align-items: center;
    padding-top:10px;
    width: 300px;
    height: 500px;
    position: ${props => props.scrollY > 300 && `fixed`};
    top: ${props => props.scrollY > 300 && `var(--nav-height)`};
    background: linear-gradient(var(--tertiary-1) 40%,white 75%);
    .form-element{
        display: flex;
        align-items: center;
        margin: 5px 0px;
    }
    .searchbar{
        label{
            margin-right: 5px;
        }
    }
    .cuisine-dropdown{
        flex-direction: column;
        label{
            margin-bottom: 5px;
        }
    }
    .sort-dropdown{
        flex-direction: column;
        label{
            margin-bottom: 5px;
        }
    }
`

export default FilterSearch