import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getAllOptions } from "../../request/OptionsAPI"
import { getOptionsDBInformations } from "../../request/orderRequest"


export const getOptions = createAsyncThunk('step3/getOptions', () => {
    return getAllOptions()
})


export const getOptionsChoose = createAsyncThunk('step3/getOptionsChoose', ()=>{
    return getOptionsDBInformations()
})



export const step3Slice = createSlice({
    name: 'step3',
    initialState: {
        price:0,
        orderPrice:0,
        hasChoose:false,
        loadOption:false,
        options:[],
        optionChoose:"",
        priceChoose:0
    },
    reducers: {

        chooseOption: (state,action) => {
            state.optionChoose=action.payload.id
            state.priceChoose=action.payload.price
            state.price = state.orderPrice + action.payload.price
            state.hasChoose=true
        },


    },

    extraReducers: (builder) => {

        builder.addCase(getOptions.fulfilled, (state, action) => {
            state.options = action.payload['hydra:member']
            state.loadOption = false
        })

        builder.addCase(getOptionsChoose.fulfilled, (state, action) => {

            if(state.optionChoose.length > 0 ){
                state.optionChoose = action.payload.optionChoose
                state.priceChoose = action.payload.priceChoose
            }
            state.orderPrice = action.payload.price
            state.price = state.orderPrice + state.priceChoose

            if(action.payload.optionChoose.length > 0)
                state.hasChoose=true

        })
    },


})


export const { chooseOption } = step3Slice.actions

export default step3Slice.reducer