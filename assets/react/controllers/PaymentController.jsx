import React from 'react'
import PaymentPage from '../pages/payment/paymentPage'
import { Provider } from 'react-redux'
import store from '../store/store'

const PaymentController = (props) => {

    return (
        <Provider store={store} >
            <PaymentPage name={props.name} />
        </Provider>
    )

}

export default PaymentController