import React from "react"
import { Provider } from 'react-redux'
import store from '../store/store'
import Main from "../pages/main/main"

const OrderController = () => {

    return (
        <>
            <Provider store={store} >
                <div className="py-2 px-8">
                    <Main />
                </div>
            </Provider>
        </>
    )
}

export default OrderController