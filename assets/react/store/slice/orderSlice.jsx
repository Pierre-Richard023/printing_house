import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { updatePdfFile, getPricePdfFile, setStepInformations, setStatus } from "../../services/orders"
import { getAllOptions } from "../../services/OptionsAPI"
import { getAllMailTypes } from "../../services/mailTypesAPI"
import { getAllBookbinding } from "../../services/bookbindingAPI"


export const setStepData = createAsyncThunk('order/setStepData', async (data) => {
    return await setStepInformations(data.name, data.informations)
})

export const setOrderStatus = createAsyncThunk('order/setOrderStatus', async (data) => {
    return await setStatus(data)
})


//step1
export const getPriceFiles = createAsyncThunk('order/getPriceFiles', async () => {
    return await getPricePdfFile()
})

export const updateFile = createAsyncThunk('order/updateFile', async (data) => {
    return await updatePdfFile(data.id, data.champ, data.value, data.price)
})

//step2

export const getOptions = createAsyncThunk('order/getOptions', async () => {
    return await getAllOptions()
})

//step3
export const getMailTypes = createAsyncThunk('order/getMailTypes', async () => {
    return await getAllMailTypes()
})

//step 4

export const getBookbinding = createAsyncThunk('order/getBookbinding', async () => {
    return await getAllBookbinding()
})

export const orderSlice = createSlice({
    name: 'order',
    initialState: {
        price: 0,
        load:true,
        isDataSet: false,
        step: 0,
        stepValid: false,
        files: {
            price: 0,
            isEmpty: true,
            isLoadingFile: false,
            isUploadFile: false,
            keyFileUpload: ""
        },
        informations: {
            loadForm: false,
            price: 0,
            prevStepPrice: 0,
            address: "",
            city: "",
            zip: "",
            phone: "",
        },
        options: {
            price: 0,
            prevStepPrice: 0,
            hasChoose: false,
            loadOptions: false,
            options: [],
            optionChoose: "",
            priceChoose: 0
        },
        types: {
            load: false,
            price: 0,
            prevStepPrice: 0,
            hasChoose: false,
            types: [],
            typeChoose: "",
            priceChoose: 0
        },
        bookbinding: {
            load: false,
            price: 0,
            prevStepPrice: 0,
            hasChoose: false,
            bookbinding: [],
            bookbindingChoose: "",
            priceChoose: 0
        }
    },
    reducers: {

        upStep: (state) => {
            if (state.step < 5)
                state.step = state.step + 1
            state.stepValid = false
        },

        downStep: (state) => {
            if (state.step > 1)
                state.step = state.step - 1
            state.stepValid = false
        },
        uploadStatus : (state,action) =>{
            state.step=action.payload.step
            state.load=false
        },
        //Step1
        uploadFile: (state, action) => {
            state.files.keyFileUpload = action.payload
            state.files.isUploadFile = true
        },
        isUpload: (state) => {
            state.files.keyFileUpload = ""
            state.files.isUploadFile = false
        },
        isLoading: (state, action) => {
            state.files.isLoadingFile = action.payload
        }
        ,
        hasFiles: (state, action) => {
            state.files.isEmpty = action.payload
            state.stepValid = action.payload
        },

        savePriceFiles: (state) => {
            state.informations.prevStepPrice = state.files.price
        },
        //Step 2

        initInformationsStep5: (state, action) => {
            state.informations.price = action.payload.prevStepPrice
            state.price = action.payload.prevStepPrice
            state.informations.prevStepPrice = action.payload.prevStepPrice
            state.informations.address = action.payload.address ? action.payload.address : ""
            state.informations.city = action.payload.city ? action.payload.city : ""
            state.informations.zip = action.payload.zip ? action.payload.zip : ""
            state.informations.phone = action.payload.phone ? action.payload.phone : ""
        },
        saveZip: (state, action) => {
            state.informations.zip = action.payload
        },
        saveCity: (state, action) => {
            state.informations.city = action.payload
        },
        saveAddress: (state, action) => {
            state.informations.address = action.payload
        },
        savePhone: (state, action) => {
            state.informations.phone = action.payload
        },

        //Step 2
        initInformationsStep2: (state, action) => {
            state.options.prevStepPrice = action.payload.prevStepPrice
            state.options.hasChoose = action.payload.hasChoose ? action.payload.hasChoose : state.options.hasChoose
            state.stepValid = action.payload.hasChoose ? action.payload.hasChoose : state.options.hasChoose
            state.options.optionChoose = action.payload.optionChoose ? action.payload.optionChoose : state.options.optionChoose
            state.options.priceChoose = action.payload.priceChoose ? action.payload.priceChoose : state.options.priceChoose
            state.options.price = (action.payload.priceChoose ? action.payload.priceChoose : state.options.priceChoose) + action.payload.prevStepPrice
            state.price = (action.payload.priceChoose ? action.payload.priceChoose : state.options.priceChoose) + action.payload.prevStepPrice
        },

        chooseOption: (state, action) => {
            state.options.optionChoose = action.payload.id
            state.options.priceChoose = action.payload.price
            state.options.price = state.options.prevStepPrice + action.payload.price
            state.price = state.options.prevStepPrice + action.payload.price
            if (!state.options.hasChoose) {
                state.options.hasChoose = true
                state.stepValid = true
            }


        },

        //step 3
        initInformationsStep3: (state, action) => {
            state.types.prevStepPrice = action.payload.prevStepPrice
            state.types.hasChoose = action.payload.hasChoose ? action.payload.hasChoose : state.types.hasChoose
            state.stepValid = action.payload.hasChoose ? action.payload.hasChoose : state.types.hasChoose
            state.types.typeChoose = action.payload.typeChoose ? action.payload.typeChoose : state.types.typeChoose
            state.types.priceChoose = action.payload.priceChoose ? action.payload.priceChoose : state.types.priceChoose
            state.types.price = (action.payload.priceChoose ? action.payload.priceChoose : state.types.priceChoose) + action.payload.prevStepPrice
            state.price = (action.payload.priceChoose ? action.payload.priceChoose : state.types.priceChoose) + action.payload.prevStepPrice
        },

        chooseType: (state, action) => {
            state.types.typeChoose = action.payload.id
            state.types.priceChoose = action.payload.price
            state.types.price = state.types.prevStepPrice + action.payload.price
            state.price = state.types.prevStepPrice + action.payload.price

            if (!state.types.hasChoose) {
                state.types.hasChoose = true
                state.stepValid = true
            }
        },


        //step4
        initInformationsStep4: (state, action) => {
            state.bookbinding.prevStepPrice = action.payload.prevStepPrice
            state.bookbinding.hasChoose = action.payload.hasChoose ? action.payload.hasChoose : state.bookbinding.hasChoose
            state.stepValid = action.payload.hasChoose ? action.payload.hasChoose : state.bookbinding.hasChoose
            state.bookbinding.bookbindingChoose = action.payload.bookbindingChoose ? action.payload.bookbindingChoose : state.bookbinding.bookbindingChoose
            state.bookbinding.priceChoose = action.payload.priceChoose ? action.payload.priceChoose : state.bookbinding.priceChoose
            state.bookbinding.price = (action.payload.priceChoose ? action.payload.priceChoose : state.bookbinding.priceChoose) + action.payload.prevStepPrice
            state.price = (action.payload.priceChoose ? action.payload.priceChoose : state.bookbinding.priceChoose) + action.payload.prevStepPrice

        },

        chooseBookbinding: (state, action) => {
            state.bookbinding.bookbindingChoose = action.payload.id
            state.bookbinding.priceChoose = action.payload.price
            state.bookbinding.price = state.bookbinding.prevStepPrice + action.payload.price
            state.price = state.bookbinding.prevStepPrice + action.payload.price

            if (!state.bookbinding.hasChoose) {
                state.bookbinding.hasChoose = true
                state.stepValid = true
            }
        },

        validInformations: (state,action) => {
            state.stepValid=action.payload
        },

    },
    extraReducers: (builder) => {

        builder.addCase(setStepData.pending, (state, action) => {
            state.isDataSet = true
        })

        builder.addCase(setStepData.fulfilled, (state, action) => {
            state.isDataSet = false
        })

        builder.addCase(setOrderStatus.fulfilled, (state, action) => {
            
        })

        //Step1
        builder.addCase(getPriceFiles.fulfilled, (state, action) => {
            state.files.price = action.payload
            state.price = action.payload
        })

        builder.addCase(updateFile.fulfilled, (state, action) => {
            state.files.price = action.payload
            state.price = action.payload

        })

        //Step2
        builder.addCase(getOptions.pending, (state, action) => {
            state.options.loadOptions = true
        })

        builder.addCase(getOptions.fulfilled, (state, action) => {
            state.options.options = action.payload['hydra:member']
            state.options.loadOptions = false
        })

        //Step3
        builder.addCase(getMailTypes.pending, (state, action) => {
            state.types.load = true

        })

        builder.addCase(getMailTypes.fulfilled, (state, action) => {
            state.types.types = action.payload['hydra:member']
            state.types.load = false
        })


        //Step4
        builder.addCase(getBookbinding.pending, (state, action) => {
            state.bookbinding.load = true

        })

        builder.addCase(getBookbinding.fulfilled, (state, action) => {
            state.bookbinding.bookbinding = action.payload['hydra:member']
            state.bookbinding.load = false
        })

    },
})

export const {
    upStep, downStep,uploadStatus,
    uploadFile, isUpload, isLoading, hasFiles, savePriceFiles,
    saveCity, saveAddress, saveZip, savePhone,validInformations,
    chooseOption, chooseType, chooseBookbinding,
    initInformationsStep2, initInformationsStep3,
    initInformationsStep4, initInformationsStep5
} = orderSlice.actions


export default orderSlice.reducer




