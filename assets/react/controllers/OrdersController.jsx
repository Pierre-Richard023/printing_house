import React from "react"
import { Provider } from 'react-redux'
import { HashRouter, Route, Routes } from "react-router-dom"
import Step1Page from "../pages/step1/Step1Page"
import Step2Page from "../pages/step2/Step2Page"
import Step3Page from "../pages/step3/Step3Page"
import Step4Page from "../pages/step4/Step4Page"
import Step5Page from "../pages/step5/Step5Page"

import store from '../store/store'

const OrdersController = () => {



    return (
        <Provider store={store} >
            <HashRouter>
                    <Routes>
                        <Route index path='/' element={<Step1Page />} />
                        <Route path='/step-2' element={<Step2Page />} />
                        <Route path='/step-3' element={<Step3Page />} />
                        <Route path='/step-4' element={<Step4Page /> } />
                        <Route path='/step-5' element={<Step5Page />} />
                    </Routes>
            </HashRouter>
        </Provider>
    )
}

export default OrdersController