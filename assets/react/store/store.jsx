import { configureStore } from '@reduxjs/toolkit'
import step1Reducer  from './slice/step1Slice'
import step2Reducer from './slice/step2Slice'
import step3Reducer from './slice/step3Slice'
import step4Reducer from './slice/step4Slice'

export default configureStore({
    reducer: {
        step1: step1Reducer,
        step2: step2Reducer,
        step3: step3Reducer,
        step4: step4Reducer,
    }
})