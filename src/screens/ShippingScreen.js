// @flow strict

// @flow strict

import * as React from 'react';

import { Form,Button } from "react-bootstrap";
import {useSelector, useDispatch} from 'react-redux'
import {saveShippingAddress} from '../actions/cartActions'
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';


function ShippingScreen({history}) {

    const cart = useSelector(state=>state.cart)
    const {shippingAddress} = cart
    
    const dispatch = useDispatch()

    const [address, setAddress] = React.useState(shippingAddress.address)
    const [city, setCity] = React.useState(shippingAddress.city)
    const [country, setCountry] = React.useState(shippingAddress.country)
    const [postalCode, setPostalCode] = React.useState(shippingAddress.postalCode)

   

    const submitHandler= (e)=>{
        e.preventDefault()
        dispatch(saveShippingAddress({address,city,country,postalCode}))
        history.push('/payment')
        console.log("submited")
    }
    return (
        
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
            <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
                <Form.Control
                required
                type="text"
                placeholder="Enter address"
                value={address ? address : ''} 
                onChange={(e)=>setAddress(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId="address">

            <Form.Label>City</Form.Label>
                <Form.Control
                required
                type="text"
                placeholder="Enter City"
                value={city ? city : ''} 
                onChange={(e)=>setCity(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group>
            <Form.Label>country</Form.Label>
                <Form.Control
                required
                type="text"
                placeholder="Enter country"
                value={country ? country : ''} 
                onChange={(e)=>setCountry(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group>
            <Form.Label>Postal code</Form.Label>
                <Form.Control
                required
                type="text"
                placeholder="Enter postal code"
                value={postalCode ? postalCode : ''} 
                onChange={(e)=>setPostalCode(e.target.value)}
                ></Form.Control>
            </Form.Group>
                <Button type="submit" variant='primary'>
                    Continue
                </Button>

            </Form>
        </FormContainer>
    );
};

export default ShippingScreen;