import { createSlice } from '@reduxjs/toolkit';

const getLocalBasket = () => {
  const localBasket = localStorage.getItem('basket')
  if (localBasket) {
    return JSON.parse(localBasket)
  } else {
    return []
  }
}

const initialState = {
  basket: getLocalBasket(),
  total_items: 0,
  total_price: 0,
  service_charge: 199,
  restaurant: '',
  error: {
    isError: false,
    type: ''
  },
  isAddedToBasket: false
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = { isError: false, type: '' }
    },
    resetAddToBasket: (state) => {
      state.isAddedToBasket = false;
    },
    addItem: (state, { payload: dish }) => {
      if (state.basket.length < 1) {
        state.restaurant=dish.restaurant
      }
      if (state.restaurant != dish.restaurant) {
        state.error = { isError: true, type: 'DIFF_RESTAURANT' }
        return
      }
      const index = state.basket.map(item=>item.d_id).indexOf(dish.d_id)
      if (index > -1) {
        // If dish already in basket, add 1 to its amount
        state.basket[index].amount += 1
      } else {
        // Add new unique dish to basket
        state.basket.push({
          ...dish,
          amount: 1
        })
      }
      // Toggle success actions (e.g. animate counter in navbar)
      state.isAddedToBasket = true;
    },
    minusItemAmount: (state, { payload: d_id }) => {
      const index = state.basket.map(item=>item.d_id).indexOf(d_id)
      const amount = state.basket[index].amount
      if (amount > 1) {
        state.basket[index].amount-=1
      } else {
        state.basket.splice(index, 1)
      }
    },
    addItemAmount: (state, { payload: d_id }) => {
      const index = state.basket.map(item=>item.d_id).indexOf(d_id)
      state.basket[index].amount+=1
    },
    deleteItem: (state, { payload: d_id }) => {
      const index = state.basket.map(item=>item.d_id).indexOf(d_id)
      if (index > -1) {
        state.basket.splice(index, 1)
      }
    },
    updateTotals: (state) => {
      const { price, amount } = state.basket.reduce(
        (totals,item) => {
          totals.price += item.price * item.amount;
          totals.amount += item.amount;
          return totals
        },
        {price:0,amount:0}
      )
      state.total_items = amount;
      state.total_price = price;
    },
    emptyBasket: (state) => {
      state.basket = []
    }
  },
  extraReducers: {}
});

export const { resetAddToBasket,resetError,addItem,updateTotals,deleteItem,addItemAmount,minusItemAmount,emptyBasket } = basketSlice.actions;
export default basketSlice.reducer;
