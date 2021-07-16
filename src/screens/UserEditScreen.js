import * as React from 'react';
import { Link } from "react-router-dom";
import { Form,Button } from "react-bootstrap";
import {useSelector, useDispatch} from 'react-redux'
import { getUserDetails } from '../actions/userAction';

import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import Loader from '../components/Loader';

function UserEditScreen({match,history}) {
    const userId = match.params.id
    
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [isAdmin, setIsAdmin] = React.useState(false)
   
   
 

    const userDetails = useSelector(state=> state.userDetails)
    const {loading,error,user} = userDetails
    
    const dispatch = useDispatch()
    React.useEffect(()=>{
        if (!user.name || user._id !== Number(userId)) {
            dispatch(getUserDetails(userId))
        } else {
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
           
        
       
       
    }, [user, userId])
    
    const submitHandler = (e)=>{
        e.preventDefault()
        
    }


    return (

        <div>
            <Link to='/admin/userlist'>
                Go back
            </Link>
            <FormContainer>

                <h1>Edit User</h1>
                    {loading ? <Loader/>:
                    error ? <Message variant="danger">{error}</Message>
                        : (
                            <Form onSubmit={submitHandler}>
                            <Form.Group controlId="name">
                                <Form.Label>UserName</Form.Label>
                                <Form.Control
                                
                                type="text"
                                placeholder="Enter your Username here"
                                value={name} 
                                onChange={(e)=>setName(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId="email">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                required
                                type="email"
                                placeholder="Enter your Email here"
                                value={email} 
                                onChange={(e)=>setEmail(e.target.value)}
                                ></Form.Control>

                                <Form.Group controlId="isAdmin">
                                
                                <Form.Check
                                
                                type="checkbox"
                                label="is Admin"
                                checked={isAdmin} 
                                onChange={(e)=>setIsAdmin(e.target.checked)}
                                ></Form.Check>
                            </Form.Group>


                            <Button type="submit" variant="primary">Update</Button>
                            </Form.Group>

                        </Form>
                                )}


                        
                        
            </FormContainer>
        </div>
        
            
        
    );
};

export default UserEditScreen;