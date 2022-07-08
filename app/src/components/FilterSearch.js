import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getCuisines,updateSort } from '../features/restaurantSlice';
import { FiSearch } from 'react-icons/fi'
import ScreenSizes from '../utils/mediaVariables';

const FilterSearch = ({horizontal}) => {
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
    
    
    if (horizontal) {
        return (
            <WrapperHorizontal>
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
                    <option value="none">-Sort-</option>
                    {sortList.map((x, i) => {
                        return <option key={i} value={x}>
                            {x}
                        </option>
                    })}
                </select>
            </div>
    </WrapperHorizontal>
        )
    }

    return (
        <Wrapper>
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
                    <option value="none">-Sort-</option>
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
    width: 250px;
    height: 500px;
    transition: 0.3s linear 0.5s;
    overflow: hidden;
    background: linear-gradient(var(--tertiary-1) 40%,white 75%);
    h3 {
        text-align: center;
    }
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
    @media (max-width: ${ScreenSizes.breakpoint_md}){
        position: static;
        padding:0;
        height:0px;
        transition: height 0.3s;
    }
    
`

const WrapperHorizontal = styled.section`
    display: flex; 
    margin-top: -1px;
    justify-content: space-evenly;
    align-items: center;
    padding-top:10px;
    width: 100%;
    height: 100%;
    background: var(--tertiary-1);
    position: relative;
    .form-element{
        display: flex;
        align-items: center;
        margin: 5px 0px;
    }
    .searchbar{
        align-items: center;
        label{
            margin-right: 5px;
        }
    }
    .cuisine-dropdown{
        align-items: center;
        label{
            margin-right: 5px;
        }
    }
    .sort-dropdown{
        align-items: center;
        label{
            margin-right: 5px;
        }
    }
    @media (max-width: 600px){
        flex-direction: column;
        justify-content: center;
        padding-bottom: 15px;
}

`

export default FilterSearch