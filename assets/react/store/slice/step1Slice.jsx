import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getPricePdfFile , setFilesPriceDBInformations, updatePdfFile } from "../../request/orderRequest"

export const getPriceFiles = createAsyncThunk('step1/getPriceFiles', async () => {
    return await getPricePdfFile()
})

export const updateFile = createAsyncThunk('step1/updateFile', async (data) => {

    return await updatePdfFile(data.id,data.champ,data.value,data.price)

})

export const step1Slice = createSlice({
    name: 'step1',
    initialState: {
        price: 0,
        isEmpty: true,
        isLoadingFile:false,
        isUploadFile: false,
        keyFileUpload: ""
    },
    reducers: {
        uploadFile: (state, action) => {
            state.keyFileUpload = action.payload
            state.isUploadFile = true
        },
        isUpload: (state) => {
            state.keyFileUpload = ""
            state.isUploadFile = false            
        },
        isLoading: (state, action) => {
            state.isLoadingFile = action.payload
        }
        ,
        hasFiles: (state, action) => {
            state.isEmpty = action.payload
        },
        saveFilePrice: (state) => {
            setFilesPriceDBInformations(state.price)
        },

    },
    extraReducers: (builder) => {

        builder.addCase(getPriceFiles.fulfilled, (state, action) => {
            state.price = action.payload
        })

        builder.addCase(updateFile.fulfilled, (state, action) => {
            state.price = action.payload
        })

    },
})


export const { uploadFile, isUpload,isLoading, hasFiles, saveFilePrice } = step1Slice.actions


export default step1Slice.reducer