import React,{useEffect} from 'react'
import { Provider } from 'react-redux'
import store from '../store/store'
import PaymentsPage from '../pages/payments/paymentsPage'
import { OrderFillForm } from '../services/orders'

const PaymentsController = (props) => {


    useEffect(()=>{
        OrderFillForm()
    },[])



    return (
        <Provider store={store} >
            <PaymentsPage name={props.name} />
        </Provider>
    )

}

export default PaymentsController