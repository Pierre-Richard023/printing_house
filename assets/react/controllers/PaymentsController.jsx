import React from 'react'
import { Provider } from 'react-redux'
import store from '../store/store'
import PaymentsPage from '../pages/payments/paymentsPage'

const PaymentsController = (props) => {

    return (
        <Provider store={store} >
            <PaymentsPage name={props.name} />
        </Provider>
    )

}

export default PaymentsController