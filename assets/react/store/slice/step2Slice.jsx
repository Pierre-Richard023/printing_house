import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getAllCities } from "../../request/CitiesAPI";
import { getPricePdfFile , getDBInformations, setBDInformations } from "../../request/orderRequest";


export const getPriceFiles = createAsyncThunk('step2/getPriceFiles',()=>{
    return getPricePdfFile()
})

export const getInformations = createAsyncThunk('step2/getInformations',()=>{
    return getDBInformations()
})

export const getCity = createAsyncThunk('step2/getCity', () => {
    return getAllCities()
})


export const step2Slice = createSlice({
    name: 'step2',
    initialState: {
        addressValid: false,
        phoneValid:false,
        loadForm: true,
        errorLoad: "",
        price: 0,
        priceFiles:0,
        cityList: [],
        address: "",
        city: "",
        cityPrice: 0,
        zip: "",
        phone: "",
    },
    reducers: {

        cityChange: (state,action) => {
            state.city=action.payload.ct
            state.zip=action.payload.z
            state.cityPrice=action.payload.p
        },
        saveAddress: (state,action) =>{
            state.address=action.payload
        },
        savePhone: (state,action ) => {
            state.phone=action.payload
        },
        addressValid: (state,action) =>{
            state.addressValid=action.payload
        },
        phoneValid: (state,action) =>{
            state.phoneValid=action.payload
        },

        saveInformation: (state) =>{

            const data = {
                'phone': state.phone,
                'address': state.address, 
                'city': state.city,
                'zip': state.zip,
                'cityPrice': state.cityPrice,
                'filesPrice': state.priceFiles,
                'orderPrice': state.priceFiles + state.cityPrice
            }
            setBDInformations(data)
        },
    },
    extraReducers: (builder) => {

        builder.addCase(getPriceFiles.fulfilled, (state, action) => {
            console.log('à le prix')

            state.priceFiles = action.payload
        })

        builder.addCase(getCity.fulfilled, (state, action) => {
            state.cityList = action.payload['hydra:member']
            state.loadForm = false
        })

        builder.addCase(getInformations.fulfilled, (state, action) => {
            state.address = action.payload.address
            if( action.payload.zip.length != 0 || action.payload.city != 0  ){
                state.zip = action.payload.zip
                state.city = action.payload.city
                state.cityPrice = action.payload.cityPrice
            }
            state.phone = action.payload.phone
            state.priceFiles = action.payload.filesPrice
        })

    },
})


export const { initialise ,initCity, cityChange, saveAddress ,savePhone ,addressValid,phoneValid,saveInformation} = step2Slice.actions

export default step2Slice.reducer