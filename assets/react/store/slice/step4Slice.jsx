import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getAllDBInformations } from "../../request/orderRequest"

export const getIntentKey = createAsyncThunk('step4/getIntentKey',(price)=>{
    return fetch('/paymentIntent-key',
    {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "price": price }),
    })
    .then( res => res.json())
})

export const getAllInformation = createAsyncThunk('step4/getAllInformation',()=>{
    return getAllDBInformations()
})



export const step4Slice = createSlice({
    name: 'step4',
    initialState: {
        loadInformation:false,
        name:"",
        informations: {},
        secretKey:"",
        secretKeyLoad:false,
        today:"",
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

        builder.addCase(getAllInformation.fulfilled, (state, action) => {
            const d = new Date()
            state.today=d.toLocaleDateString()

            state.informations = action.payload
            state.loadInformation = true
        })
        

    },
})


export const { setName } = step4Slice.actions




export default step4Slice.reducer