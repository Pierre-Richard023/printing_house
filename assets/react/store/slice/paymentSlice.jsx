import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getAllDBInformations } from "../../services/orders"

export const getIntentKey = createAsyncThunk('payment/getIntentKey',(price)=>{
    return fetch('/paymentIntent-key',
    {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "price": price }),
    })
    .then( res => res.json())
})


export const getOrderInformations = createAsyncThunk('payment/getOrderInformations',()=>{
    return getAllDBInformations()
})



export const paymentSlice = createSlice({
    name: 'payment',
    initialState: {
        loadInformation:false,
        name:"",
        informations: {},
        secretKey:"",
        secretKeyLoad:false,
    },
    reducers: {
        setName: (state,action) =>{
            state.name=action.payload
        }
    },
    extraReducers: (builder) =>{

        builder.addCase(getIntentKey.fulfilled, (state, action) => {
            state.secretKey = action.payload.clientSecret
            state.secretKeyLoad = true
        })

        builder.addCase(getOrderInformations.pending , (state, action) => {
            state.loadInformation = true
        })

        builder.addCase(getOrderInformations.fulfilled, (state, action) => {
            state.informations = action.payload
            state.loadInformation = false
        })
        

    },
})


export const { setName } = paymentSlice.actions




export default paymentSlice.reducer