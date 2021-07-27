// @flow strict

import * as React from 'react';
//import * as React from 'react';
import { Col,Form,Button } from "react-bootstrap";
import {useSelector, useDispatch} from 'react-redux'
import { savePaymentMethod } from '../actions/cartActions';
import FormContainer from '../components/FormContainer';

import CheckoutSteps from '../components/CheckoutSteps';

function PaymentScreen({history}) {
   

    const cart = useSelector(state=>state.cart)
    const {shippingAddress} = cart
    const [paymentMethod, setPaymentMthod] = React.useState('PayPal')

    const dispatch = useDispatch()
    if(!shippingAddress.address){
        history.push('/shipping')
    }

    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
        console.log('order')
    }
    return (

        
        <FormContainer>
            <CheckoutSteps step1 step2 step3/>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as="legend">Select Payment Method</Form.Label>
                    <Col>
                        <Form.Check type="radio"
                        label='PayPal or Credit Card'
                        id='paypal'
                        name="paymentMethod"
                        checked
                        onChange={(e)=> setPaymentMthod(e.target.value)}>

                        </Form.Check>
                    </Col>

                </Form.Group>
                <Button type="submit" variant="primary">Continue</Button>
            </Form>
        </FormContainer>
    );
};

export default PaymentScreen;