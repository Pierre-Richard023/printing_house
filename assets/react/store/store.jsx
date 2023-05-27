import { configureStore } from '@reduxjs/toolkit'
import orderReducer  from './slice/orderSlice'
import paymentReducer from './slice/paymentSlice'

export default configureStore({
    reducer: {
        order: orderReducer,
        payment: paymentReducer,
    }
})