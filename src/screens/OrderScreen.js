// @flow strict

import * as React from 'react';
import { Col,Row,Card,Image,ListGroup } from "react-bootstrap";
import {useSelector, useDispatch} from 'react-redux'
import { PayPalButton } from "react-paypal-button-v2";

import { Link } from 'react-router-dom';
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getOrderDetails , payOrder} from '../actions/orderAction';
import { ORDER_PAY_RESET } from '../constants/orderConstants';

function OrderScreen({match}) {
    const orderId = match.params.id

    const orderDetails = useSelector(state=> state.orderDetails)
    const {order,loading,error} = orderDetails
    console.log(order)
    
    const orderPay = useSelector(state=> state.orderPay)
    const {loading:loadingPay,success:successPay} = orderPay



    const dispatch= useDispatch()

    const [sdkReady, setSdkReady]= React.useState(false)


  
   
    if (!loading && !error) {
        order.itemsPrice =[]; 
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    }

   
    const addPayPalScript = ( )=>{
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://www.paypal.com/sdk/js?client-id=AfuvLDsUDsuLhf46yjd13jvmPFUNVz0MQWHbdE7n75u-EvWXqc4TVzO5jR2BoBOh0ndywnYZfgg0fUay'
        script.async = true
        script.onload = ()=>{
            setSdkReady(true)
        }
        document.body.appendChild(script)
    }

    React.useEffect(()=>{
       if(!order || successPay | order._id !==   Number(orderId)){
           dispatch({type:ORDER_PAY_RESET})
           dispatch(getOrderDetails(orderId))
       }else if (!order.isPaid){
           if(!window.paypal){
               addPayPalScript()
           }else{
               setSdkReady(true)
           }
       }
    },[dispatch,order,orderId,successPay])

    const paymentSuccessHandler=(paymentResult)=>{
        dispatch(payOrder(orderId,paymentResult))
    }

    
    return loading ? <Loader/> : error ? <Message variant="danger">{error}</Message>
        : (
        <div>
            <h1>Order: {order._id}</h1>
             <Row>
                 <Col md={8}>
                     <ListGroup variant='flush'>
                         <ListGroup.Item>
                             <h2>shipping</h2>
                             <p><strong>Name:</strong>{order.user.name}</p>
                             <p><strong>Email:</strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                             <p>
                                 <strong>Shipping: </strong>
                                 {order.shippingAddress.address}, {order.shippingAddress.city}
                                 {' '}
                                 {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                             </p>

                             {order.isDeliverd? (
                                 <Message variant="success">Deliverd on {order.paidAt}</Message>
                             ): <Message variant='warning'>Not Deliverd</Message>}
                         </ListGroup.Item>

                         <ListGroup.Item>
                             <h2>Payment Method</h2>
                             <p>
                                 <strong>Method: </strong>
                                 {order.paymentMethod} 
                             </p>
                             {order.isPaid? (
                                 <Message variant="success">Paid on {order.paidAt}</Message>
                             ): <Message variant='warning'>Not Paid</Message>}
                         </ListGroup.Item>

                         <ListGroup.Item>
                             <h2>Order Items</h2>
                             {order.orderItems.length === 0 ? <Message variant="info">Your order Is Empty</Message>:
                             (
                                <ListGroup variant="flush">
                                    {order.orderItems.map((item, index)=>(
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name}  fluid rounded/>
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup> 
                             )}
                                 
                                
                             
                         </ListGroup.Item>

                     </ListGroup>

                 </Col>
                 <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                           <ListGroup.Item>
                               <h2>order summary</h2>
                           </ListGroup.Item>

                           <ListGroup.Item>
                               <Row>
                                   <Col>Item: </Col>
                                   <Col>${order.itemPrice}</Col>
                               </Row>
                           </ListGroup.Item>


                           <ListGroup.Item>
                               <Row>
                                   <Col>shipping: </Col>
                                   <Col>${order.shippingPrice}</Col>
                               </Row>
                           </ListGroup.Item>

                           <ListGroup.Item>
                               <Row>
                                   <Col>Tax: </Col>
                                   <Col>${order.taxPrice}</Col>
                               </Row>
                           </ListGroup.Item>

                           <ListGroup.Item>
                               <Row>
                                   <Col>Total: </Col>
                                   <Col>${order.totalPrice}</Col>
                               </Row>
                           </ListGroup.Item>

                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader/>}

                                    {!sdkReady ?  (
                                        <Loader/>
                                    ): (
                                        <PayPalButton
                                        amount={order.totalPrice}
                                        onSuccess={paymentSuccessHandler}
                                        />
                                    )}

                                       
                                </ListGroup.Item>
                            )}

                        </ListGroup>
                    </Card>
                 </Col>
             </Row>
        </div>
    );
};

export default OrderScreen;