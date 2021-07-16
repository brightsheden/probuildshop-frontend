// @flow strict

import * as React from 'react';
import { Link } from "react-router-dom";
import { Row,Col,Form,Button } from "react-bootstrap";
import {useSelector, useDispatch} from 'react-redux'
import {login} from '../actions/userAction'
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import Loader from '../components/Loader';


function LoginScreen({history,location}) {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const redirect = location.search ? location.search.split('m')[1] : '/'
    const userLogin = useSelector(state=> state.userLogin)
    const {loading,error,userInfo} = userLogin
    
    const dispatch = useDispatch()
    React.useEffect(()=>{
        if(userInfo){
            history.push(redirect)
        }
    }, [history,userInfo,redirect])
    
    const submitHandler = (e)=>{
        e.preventDefault()
        dispatch(login(email,password))
    }

    return (
        <FormContainer>

           
            <h1>Sign In</h1>
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader/>}
            

            <Form onSubmit={submitHandler}>
                <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                    type="email"
                    placeholder="Enter your Email here"
                    value={email} 
                    onChange={(e)=>setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>


                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                    type="password"
                    placeholder="Enter your Password here"
                    value={password} 
                    onChange={(e)=>setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary">Sign In</Button>

            </Form>
            <Row className="py-3">
                <Col>
                    New Customer? <Link  to={redirect? `/register?redirect=${redirect}`: '/register'}>Register</Link>
                </Col>
            </Row>
        </FormContainer>
    )
};

export default LoginScreen;